/** Physics and DSP operate on accelerometer samples, independent of browser audio. */
export const DEFAULTS = Object.freeze({ rpm: 1797, n: 9, d: 7.94, D: 39.04, phi: 0,
  load: 1, variation: 0.1, severity: 0.4, fault: 'none', resonance: 3000, zeta: 0.035 });
const TAU = 2 * Math.PI;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

export function frequencies(settings = {}) {
  const s = { ...DEFAULTS, ...settings };
  const fr = s.rpm / 60;
  const ratio = (s.d / s.D) * Math.cos(s.phi * Math.PI / 180);
  const bpfo = s.n * fr * (1 - ratio) / 2;
  const bpfi = s.n * fr * (1 + ratio) / 2;
  const ftf = fr * (1 - ratio) / 2;
  const bsf = s.D * fr * (1 - ratio * ratio) / (2 * s.d);
  return { fr, bpfo, bpfi, ftf, bsf, ball: 2 * bsf };
}

/** Mulberry32 and Box–Muller: chunk boundaries do not change the random sequence. */
export class Generator {
  constructor(sampleRate = 48000, seed = 215811, settings = {}) {
    this.sampleRate = sampleRate;
    this.settings = { ...DEFAULTS, ...settings };
    this.seed = seed >>> 0;
    // Operating drift has its own random stream: it cannot consume noise/jitter draws.
    this.variationSeed = (this.seed ^ 0x9E3779B9) >>> 0;
    this.variationPeriod = Math.max(1, Math.round(sampleRate * 3));
    this.loadWalkFrom = 0;
    this.speedWalkFrom = 0;
    this.loadWalkTo = 2 * this.variationRandom() - 1;
    this.speedWalkTo = 2 * this.variationRandom() - 1;
    this.time = 0;
    this.sampleIndex = 0;
    this.rpm = this.settings.rpm;
    this.operatingLoad = this.settings.load;
    this.shaftPhase = 0;
    this.cagePhase = 0;
    this.spinPhase = 0;
    this.impactPhase = 0;
    this.impactPeriod = 1;
    this.resReal = 0;
    this.resImag = 0;
    this.spareGaussian = null;
    this.configureResonance();
  }
  random() {
    this.seed = (this.seed + 0x6D2B79F5) >>> 0;
    let t = this.seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  variationRandom() {
    this.variationSeed = (this.variationSeed + 0x6D2B79F5) >>> 0;
    let t = this.variationSeed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  gaussian() {
    if (this.spareGaussian !== null) {
      const value = this.spareGaussian;
      this.spareGaussian = null;
      return value;
    }
    const radius = Math.sqrt(-2 * Math.log(Math.max(1e-12, this.random())));
    const phase = TAU * this.random();
    this.spareGaussian = radius * Math.sin(phase);
    return radius * Math.cos(phase);
  }
  configureResonance() {
    const omega = TAU * clamp(this.settings.resonance, 100, this.sampleRate * 0.4);
    const zeta = clamp(this.settings.zeta, 0.005, 0.3);
    const wd = omega * Math.sqrt(1 - zeta * zeta) / this.sampleRate;
    const decay = Math.exp(-zeta * omega / this.sampleRate);
    this.resCos = decay * Math.cos(wd);
    this.resSin = decay * Math.sin(wd);
  }
  set(settings) {
    if (settings.fault !== undefined && settings.fault !== this.settings.fault) {
      this.impactPhase = 0;
      this.impactPeriod = 1;
    }
    Object.assign(this.settings, settings);
    this.configureResonance();
  }
  generate(count) {
    const samples = new Float32Array(count);
    const impacts = [];
    const startTime = this.sampleIndex / this.sampleRate;
    const s = this.settings;
    const targetRpm = clamp(s.rpm, 0, 12000);
    const rpmSmoothing = 1 - Math.exp(-1 / (this.sampleRate * 0.04));
    const ratios = frequencies({ ...s, rpm: 60 });
    const severity = clamp(s.severity, 0, 1);
    const load = clamp(s.load, 0, 3);
    const variation = clamp(s.variation, 0, 0.25);
    const late = clamp((severity - 0.55) / 0.45, 0, 1);
    const damaged = s.fault !== 'none';
    const noise = 0.012 + (damaged ? 0.105 * late * late : 0);
    const strength = 0.8 * severity * severity * load;
    const fault = s.fault === 'outer race' ? 'outer' : s.fault === 'inner race' ? 'inner' : s.fault;
    const faultRatio = fault === 'outer' ? ratios.bpfo : fault === 'inner' ? ratios.bpfi : ratios.ball;
    for (let i = 0; i < count; i++) {
      const driftIndex = this.sampleIndex % this.variationPeriod;
      if (this.sampleIndex > 0 && driftIndex === 0) {
        this.loadWalkFrom = this.loadWalkTo;
        this.speedWalkFrom = this.speedWalkTo;
        this.loadWalkTo = clamp(this.loadWalkTo + (2 * this.variationRandom() - 1) * 0.8, -1, 1);
        this.speedWalkTo = clamp(this.speedWalkTo + (2 * this.variationRandom() - 1) * 0.8, -1, 1);
      }
      // Cosine interpolation has zero slope at each three-second walk boundary.
      const driftMix = (1 - Math.cos(Math.PI * driftIndex / this.variationPeriod)) / 2;
      const loadWalk = this.loadWalkFrom + driftMix * (this.loadWalkTo - this.loadWalkFrom);
      const speedWalk = this.speedWalkFrom + driftMix * (this.speedWalkTo - this.speedWalkFrom);
      const loadScale = 1 + variation * loadWalk;
      this.operatingLoad = load * loadScale;
      this.rpm += (targetRpm * (1 + variation * 0.1 * speedWalk) - this.rpm) * rpmSmoothing;
      const shaftStep = this.rpm / (60 * this.sampleRate);
      this.shaftPhase = (this.shaftPhase + shaftStep) % 1;
      this.cagePhase = (this.cagePhase + shaftStep * ratios.ftf) % 1;
      this.spinPhase = (this.spinPhase + shaftStep * ratios.bsf) % 1;
      if (damaged && this.rpm > 0) {
        this.impactPhase += shaftStep * faultRatio;
        if (this.impactPhase >= this.impactPeriod) {
          this.impactPhase -= this.impactPeriod;
          this.impactPeriod = 0.98 + 0.04 * this.random();
          // Hertzian/Stribeck-style radial load zone: zero outside loaded arc.
          const rotation = fault === 'inner' ? this.shaftPhase : this.cagePhase;
          const zoneOffset = 0.12 * clamp(this.operatingLoad - 1, -1, 2);
          const zone = Math.pow(Math.max(0, (Math.cos(TAU * rotation) + zoneOffset) / (1 + zoneOffset)), 1.5);
          const modulation = fault === 'outer' ? 1 : zone;
          const amplitude = strength * modulation * (1 - 0.35 * late);
          this.resImag += amplitude;
          impacts.push({ time: this.sampleIndex / this.sampleRate, amplitude: amplitude * loadScale,
            shaftPhase: this.shaftPhase, cagePhase: this.cagePhase, fault });
        }
      }
      // Distributed spalling broadens excitation; the Gaussian floor rises late.
      if (damaged && late > 0) this.resImag += this.gaussian() * late * late * 0.015 * load;
      // At the strike sample sin(0)=0; the next sample begins the ringing.
      const resonantSample = -this.resReal;
      const nextReal = this.resReal * this.resCos - this.resImag * this.resSin;
      this.resImag = this.resReal * this.resSin + this.resImag * this.resCos;
      this.resReal = nextReal;
      // Scale all acceleration once, including healthy noise, so baseline RMS captures load drift.
      samples[i] = (resonantSample + noise * this.gaussian()
        + 0.003 * Math.sin(TAU * this.shaftPhase) + 0.0015 * Math.sin(2 * TAU * this.shaftPhase)) * loadScale;
      this.sampleIndex++;
    }
    this.time = this.sampleIndex / this.sampleRate;
    return { samples, impacts, startTime, endTime: this.time };
  }
}

export function stats(samples) {
  let sum = 0, sum2 = 0, peak = 0;
  const n = samples.length;
  if (!n) return { rms: 0, peak: 0, crest: 0, kurtosis: 0 };
  for (const x of samples) { sum += x; sum2 += x * x; peak = Math.max(peak, Math.abs(x)); }
  const mean = sum / n;
  let variance = 0, fourth = 0;
  for (const x of samples) { const square = (x - mean) ** 2; variance += square; fourth += square * square; }
  variance /= n;
  const rms = Math.sqrt(sum2 / n);
  return { rms, peak, crest: rms ? peak / rms : 0, kurtosis: variance ? fourth / n / (variance * variance) : 0 };
}

/** In-place radix-2 Cooley–Tukey FFT, no browser analyser or dependencies. */
export function fft(real, imag) {
  const n = real.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [real[i], real[j]] = [real[j], real[i]]; [imag[i], imag[j]] = [imag[j], imag[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const stepReal = Math.cos(-TAU / len), stepImag = Math.sin(-TAU / len);
    for (let start = 0; start < n; start += len) {
      let wr = 1, wi = 0;
      for (let j = 0; j < len / 2; j++) {
        const a = start + j, b = a + len / 2;
        const br = real[b] * wr - imag[b] * wi, bi = real[b] * wi + imag[b] * wr;
        real[b] = real[a] - br; imag[b] = imag[a] - bi;
        real[a] += br; imag[a] += bi;
        const next = wr * stepReal - wi * stepImag;
        wi = wr * stepImag + wi * stepReal; wr = next;
      }
    }
  }
}

export function spectrum(samples, sampleRate, maximumSize = 65536) {
  const count = Math.min(samples.length, maximumSize);
  const n = 2 ** Math.ceil(Math.log2(Math.max(2, count)));
  const real = new Float64Array(n), imag = new Float64Array(n);
  let mean = 0;
  const offset = samples.length - count;
  for (let i = 0; i < count; i++) mean += samples[offset + i];
  mean /= Math.max(1, count);
  let windowSum = 0;
  for (let i = 0; i < count; i++) {
    const weight = 0.5 - 0.5 * Math.cos(TAU * i / Math.max(1, count - 1));
    real[i] = (samples[offset + i] - mean) * weight; windowSum += weight;
  }
  fft(real, imag);
  const frequencies = new Float64Array(n / 2), magnitudes = new Float64Array(n / 2);
  for (let i = 0; i < n / 2; i++) {
    frequencies[i] = i * sampleRate / n;
    magnitudes[i] = 2 * Math.hypot(real[i], imag[i]) / Math.max(1, windowSum);
  }
  return { frequencies, magnitudes };
}

function filter(samples, sampleRate, frequency, q, type) {
  const omega = TAU * clamp(frequency, 1, sampleRate * 0.45) / sampleRate;
  const c = Math.cos(omega), alpha = Math.sin(omega) / (2 * q), a0 = 1 + alpha;
  const b0 = (type === 'bandpass' ? alpha : (1 - c) / 2) / a0;
  const b1 = (type === 'bandpass' ? 0 : 1 - c) / a0;
  const b2 = type === 'bandpass' ? -b0 : b0;
  const a1 = -2 * c / a0, a2 = (1 - alpha) / a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const x = samples[i], y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    out[i] = y; x2 = x1; x1 = x; y2 = y1; y1 = y;
  }
  return out;
}

export function bandpass(samples, sampleRate, settings = {}) {
  const resonance = settings.resonance ?? DEFAULTS.resonance;
  return filter(filter(samples, sampleRate, resonance, 2.5, 'bandpass'), sampleRate, resonance, 2.5, 'bandpass');
}
export function envelope(samples, sampleRate, settings = {}) {
  const filtered = bandpass(samples, sampleRate, settings);
  for (let i = 0; i < filtered.length; i++) filtered[i] = Math.abs(filtered[i]);
  return filter(filter(filtered, sampleRate, 650, Math.SQRT1_2, 'lowpass'), sampleRate, 650, Math.SQRT1_2, 'lowpass');
}
export function demodulate(samples, sampleRate, settings = {}) {
  const full = envelope(samples, sampleRate, settings);
  const step = Math.max(1, Math.ceil(sampleRate / 2048));
  const out = new Float32Array(Math.floor(full.length / step));
  for (let i = 0; i < out.length; i++) out[i] = full[i * step];
  return { samples: out, sampleRate: sampleRate / step };
}
export function lineStrength(spec, frequency, tolerance = 1.5) {
  const resolution = spec.frequencies[1] || 1;
  const lo = Math.max(1, Math.floor((frequency - tolerance) / resolution));
  const hi = Math.min(spec.magnitudes.length - 1, Math.ceil((frequency + tolerance) / resolution));
  let strength = 0;
  for (let i = lo; i <= hi; i++) strength = Math.max(strength, spec.magnitudes[i]);
  return strength;
}
export function verdict(spec, settings = {}) {
  const f = frequencies(settings);
  const candidates = [ { name: 'BPFO', frequency: f.bpfo, modulation: 0 },
    { name: 'BPFI', frequency: f.bpfi, modulation: f.fr },
    { name: '2·BSF', frequency: f.ball, modulation: f.ftf } ];
  const tolerance = Math.max(1.5, (spec.frequencies[1] || 1) * 1.5);
  const matches = candidates.map(candidate => ({ ...candidate,
    strength: lineStrength(spec, candidate.frequency, tolerance),
    sidebands: candidate.modulation ? [-1, 1].map(sign => ({
      frequency: candidate.frequency + sign * candidate.modulation,
      strength: lineStrength(spec, candidate.frequency + sign * candidate.modulation, tolerance),
    })) : [],
  }));
  matches.sort((a, b) => b.strength - a.strength);
  const strongest = matches[0];
  // Name a signature only when a line exceeds the local spectral noise floor.
  const floor = lineStrength(spec, strongest.frequency + 6, 2);
  if (strongest.strength < floor * 2 || strongest.strength < 0.00008) return { ...strongest, name: 'none' };
  return strongest;
}
export function analyze(samples, sampleRate, settings = {}) {
  const demod = demodulate(samples, sampleRate, settings);
  const envelopeSpectrum = spectrum(demod.samples, demod.sampleRate, 32768);
  return { stats: stats(samples), spectrum: spectrum(samples, sampleRate), envelope: demod.samples,
    envelopeRate: demod.sampleRate, envelopeSpectrum, verdict: verdict(envelopeSpectrum, settings) };
}

/** Matches Rust's one-channel fixed population reference and deviation score. */
export class Reference {
  constructor(count = 20, k = 3) { this.count = count; this.k = k; this.reset(); }
  reset() { this.records = []; this.mean = 0; this.sigma = 0; this.ready = false; }
  setK(k) { this.k = k; }
  add(rms) {
    if (!this.ready) {
      if (this.records.length < this.count) {
        this.records.push(rms);
        return this.evaluate(rms);
      }
      // Rust trains on the next reading's arrival; the first N readings are never scored.
      this.mean = this.records.reduce((sum, x) => sum + x, 0) / this.records.length;
      this.sigma = Math.sqrt(this.records.reduce((sum, x) => sum + (x - this.mean) ** 2, 0) / this.records.length);
      this.ready = true;
    }
    return this.evaluate(rms);
  }
  evaluate(rms) {
    const threshold = this.mean + this.k * this.sigma;
    if (!this.ready) return { ready: false, mean: this.mean, sigma: this.sigma, threshold,
      event: false, score: null, status: 'TRAINING', z: null, count: this.records.length };
    const z = this.sigma === 0 ? 0 : Math.abs(rms - this.mean) / this.sigma;
    const score = z <= this.k ? 1 : z >= 15 ? 0 : 1 - (z - this.k) / (15 - this.k);
    return { ready: true, mean: this.mean, sigma: this.sigma, threshold, event: rms > threshold,
      score, status: score > 0.9 ? 'NORMAL' : score > 0.5 ? 'WARNING' : 'CRITICAL',
      z, count: this.records.length };
  }
}

export async function selfTest() {
  const checks = [], failures = [];
  const check = (name, condition) => { checks.push(name); if (!condition) failures.push(name); };
  const f = frequencies({ rpm: 60 });
  for (const [name, expected] of [['bpfo', 3.5848], ['bpfi', 5.4152], ['ftf', 0.39828], ['ball', 4.7135]]) {
    check(`CWRU ${name}`, Math.abs(f[name] / expected - 1) < 0.001);
  }
  const sampleRate = 48000;
  const healthy = new Generator(sampleRate, 215811).generate(sampleRate * 4).samples;
  check('Healthy Gaussian kurtosis 3 ± 0.3', Math.abs(stats(healthy).kurtosis - 3) < 0.3);
  const sine = Float32Array.from({ length: 48000 }, (_, i) => Math.sin(TAU * 1000 * i / sampleRate));
  check('Pure sine crest factor √2 ± 1%', Math.abs(stats(sine).crest / Math.SQRT2 - 1) < 0.01);
  const a = new Generator(sampleRate, 17).generate(1024).samples;
  const b = new Generator(sampleRate, 17).generate(1024).samples;
  check('Seeded repeatability', a.every((value, i) => value === b[i]));
  for (const [fault, name] of [['outer', 'BPFO'], ['inner', 'BPFI'], ['ball', '2·BSF']]) {
    await new Promise(resolve => setTimeout(resolve, 0));
    const settings = { fault, severity: 0.45 };
    const samples = new Generator(sampleRate, 215811, settings).generate(sampleRate * 4).samples;
    const result = analyze(samples, sampleRate, settings);
    check(`${fault} envelope strongest line ${name}`, result.verdict.name === name);
    if (fault === 'inner' || fault === 'ball') {
      const freq = frequencies(settings);
      const carrier = fault === 'inner' ? freq.bpfi : freq.ball;
      const modulation = fault === 'inner' ? freq.fr : freq.ftf;
      const main = lineStrength(result.envelopeSpectrum, carrier);
      check(fault === 'inner' ? 'Inner race ±shaft sidebands' : 'Ball ±cage sidebands', [-1, 1].every(sign =>
        lineStrength(result.envelopeSpectrum, carrier + sign * modulation) > main * 0.2));
    }
  }
  const rule = new Reference(3, 3);
  const training = [1, 2, 3].map(x => rule.add(x));
  check('First N records remain TRAINING without a score', training.every(record =>
    !record.ready && record.status === 'TRAINING' && record.score === null) && !rule.ready);
  rule.setK(4);
  check('Changing k does not train or score record N', rule.evaluate(3).score === null && !rule.ready);
  rule.setK(3);
  const firstScored = rule.add(2);
  check('Record N+1 trains the first N and is the first scored record',
    firstScored.ready && firstScored.score === 1 && firstScored.count === 3 && rule.records.join(',') === '1,2,3');
  check('Reference mean 2', rule.mean === 2);
  check('Population sigma √(2/3)', Math.abs(rule.sigma - Math.sqrt(2 / 3)) < 1e-12);
  const threshold = rule.mean + 3 * rule.sigma;
  check('No event at exact upper threshold', !rule.evaluate(threshold).event);
  check('Event strictly above threshold', rule.evaluate(threshold + 1e-10).event);
  check('Score 0.5 at z=9', Math.abs(rule.evaluate(rule.mean + 9 * rule.sigma).score - 0.5) < 1e-12);
  check('Score 0 at z=15', rule.evaluate(rule.mean + 15 * rule.sigma).score === 0);
  return { pass: failures.length === 0, checks, failures };
}
