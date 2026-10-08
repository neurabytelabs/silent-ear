export interface Settings {
  rpm: number; n: number; d: number; D: number; phi: number; load: number; variation: number;
  severity: number; fault: string; resonance: number; zeta: number;
}
export interface Frequencies { fr: number; bpfo: number; bpfi: number; ftf: number; bsf: number; ball: number }
export interface Impact { time: number; amplitude: number; shaftPhase: number; cagePhase: number; fault: string }
export interface Statistics { rms: number; peak: number; crest: number; kurtosis: number }
export interface Spectrum { frequencies: Float64Array; magnitudes: Float64Array }
export interface Verdict { name: string; frequency: number; strength: number; sidebands: { frequency: number; strength: number }[] }
export interface Record {
  ready: boolean; mean: number; sigma: number; threshold: number; event: boolean;
  score: number | null; status: string; z: number | null; count: number;
}
export const DEFAULTS: Readonly<Settings>;
export function frequencies(settings?: Partial<Settings>): Frequencies;
export class Generator {
  constructor(sampleRate?: number, seed?: number, settings?: Partial<Settings>);
  sampleRate: number; settings: Settings; seed: number; time: number; sampleIndex: number;
  rpm: number; operatingLoad: number; shaftPhase: number; cagePhase: number; spinPhase: number;
  variationSeed: number; variationPeriod: number;
  loadWalkFrom: number; loadWalkTo: number; speedWalkFrom: number; speedWalkTo: number;
  impactPhase: number; impactPeriod: number; resReal: number; resImag: number;
  spareGaussian: number | null; resCos: number; resSin: number;
  set(settings: Partial<Settings>): void;
  random(): number; variationRandom(): number; gaussian(): number; configureResonance(): void;
  generate(count: number): { samples: Float32Array; impacts: Impact[]; startTime: number; endTime: number };
}
export function stats(samples: ArrayLike<number> & Iterable<number>): Statistics;
export function fft(real: Float64Array, imag: Float64Array): void;
export function spectrum(samples: ArrayLike<number>, sampleRate: number, maximumSize?: number): Spectrum;
export function bandpass(samples: Float32Array, sampleRate: number, settings?: Partial<Settings>): Float32Array;
export function envelope(samples: Float32Array, sampleRate: number, settings?: Partial<Settings>): Float32Array;
export function demodulate(samples: Float32Array, sampleRate: number, settings?: Partial<Settings>): { samples: Float32Array; sampleRate: number };
export function lineStrength(spec: Spectrum, frequency: number, tolerance?: number): number;
export function verdict(spec: Spectrum, settings?: Partial<Settings>): Verdict;
export function analyze(samples: Float32Array, sampleRate: number, settings?: Partial<Settings>): {
  stats: Statistics; spectrum: Spectrum; envelope: Float32Array; envelopeRate: number;
  envelopeSpectrum: Spectrum; verdict: Verdict;
};
export class Reference {
  constructor(count?: number, k?: number);
  count: number; k: number; records: number[]; mean: number; sigma: number; ready: boolean;
  reset(): void; setK(k: number): void; add(rms: number): Record; evaluate(rms: number): Record;
}
export function selfTest(): Promise<{ pass: boolean; checks: string[]; failures: string[] }>;
