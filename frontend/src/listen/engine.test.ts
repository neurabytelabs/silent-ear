import { describe, expect, it } from 'vitest'
import { analyze, frequencies, Generator, lineStrength, Reference, selfTest, stats } from '../../public/listen/engine.js'

describe('sample-driven bearing physics and Silent-Ear reference', () => {
  it('computes the CWRU rolling-element, race and cage multiples', () => {
    const f = frequencies({ rpm: 60 })
    const expected = { bpfo: 3.5848, bpfi: 5.4152, ftf: 0.39828, ball: 4.7135 }
    for (const key of ['bpfo', 'bpfi', 'ftf', 'ball'] as const) {
      expect(Math.abs(f[key] / expected[key] - 1)).toBeLessThan(0.001)
    }
    const running = frequencies({ rpm: 1797 })
    expect(running.bpfo).toBeCloseTo(107.4, 0)
    expect(running.bpfi).toBeCloseTo(162.2, 0)
    expect(running.bsf).toBeCloseTo(70.6, 0)
    expect(running.ftf).toBeCloseTo(11.9, 0)
  })

  it('uses deterministic Gaussian healthy samples and gives a sine the correct crest factor', () => {
    const a = new Generator(48000, 27).generate(192000).samples
    const b = new Generator(48000, 27).generate(192000).samples
    expect(a).toEqual(b)
    expect(stats(a).kurtosis).toBeGreaterThan(2.7)
    expect(stats(a).kurtosis).toBeLessThan(3.3)
    const sine = Float32Array.from({ length: 48000 }, (_, i) => Math.sin(2 * Math.PI * i / 48))
    expect(Math.abs(stats(sine).crest / Math.SQRT2 - 1)).toBeLessThan(0.01)
  })

  it.each([['outer', 'BPFO'], ['inner', 'BPFI'], ['ball', '2·BSF']])(
    'recovers the %s defect rhythm from four seconds of actual samples', (fault, name) => {
      const settings = { fault, severity: 0.45 }
      const sampleRate = 48000
      const samples = new Generator(sampleRate, 215811, settings).generate(sampleRate * 4).samples
      const result = analyze(samples, sampleRate, settings)
      expect(result.verdict.name).toBe(name)
      const f = frequencies(settings)
      if (fault === 'inner' || fault === 'ball') {
        const carrier = fault === 'inner' ? f.bpfi : f.ball
        const modulation = fault === 'inner' ? f.fr : f.ftf
        const main = lineStrength(result.envelopeSpectrum, carrier)
        for (const sign of [-1, 1]) {
          expect(lineStrength(result.envelopeSpectrum, carrier + sign * modulation)).toBeGreaterThan(main * 0.2)
        }
      }
    },
  )

  it('preserves sample sequence across buffer boundaries and marks impacts inside the sample loop', () => {
    const settings = { fault: 'outer', severity: 0.45, variation: 0 }
    const continuous = new Generator(48000, 91, settings).generate(48000)
    const chunked = new Generator(48000, 91, settings)
    const samples = new Float32Array(48000)
    const times: number[] = []
    for (let offset = 0; offset < samples.length; offset += 128) {
      const block = chunked.generate(Math.min(128, samples.length - offset))
      samples.set(block.samples, offset)
      times.push(...block.impacts.map(impact => impact.time))
    }
    expect(samples).toEqual(continuous.samples)
    expect(times).toEqual(continuous.impacts.map(impact => impact.time))
    const period = 1 / frequencies(settings).bpfo
    for (let i = 1; i < times.length; i++) {
      expect(Math.abs((times[i] - times[i - 1]) / period - 1)).toBeLessThan(0.023)
    }
  })

  it('preserves bounded seeded operating variation across walk boundaries and restored snapshots', () => {
    const rate = 8000
    const settings = { variation: 0.25, fault: 'outer', severity: 0.3 }
    const count = rate * 7
    const continuous = new Generator(rate, 91, settings).generate(count)
    const chunked = new Generator(rate, 91, settings)
    const samples = new Float32Array(count)
    const times: number[] = []
    let minLoad = Infinity, maxLoad = -Infinity, minRpm = Infinity, maxRpm = -Infinity
    for (let offset = 0; offset < count; offset += 128) {
      const block = chunked.generate(Math.min(128, count - offset))
      samples.set(block.samples, offset)
      times.push(...block.impacts.map(impact => impact.time))
      minLoad = Math.min(minLoad, chunked.operatingLoad)
      maxLoad = Math.max(maxLoad, chunked.operatingLoad)
      minRpm = Math.min(minRpm, chunked.rpm)
      maxRpm = Math.max(maxRpm, chunked.rpm)
    }
    expect(samples).toEqual(continuous.samples)
    expect(times).toEqual(continuous.impacts.map(impact => impact.time))
    expect(minLoad).toBeGreaterThanOrEqual(0.75)
    expect(maxLoad).toBeLessThanOrEqual(1.25)
    expect(maxLoad - minLoad).toBeGreaterThan(0.05)
    expect(minRpm).toBeGreaterThanOrEqual(1797 * 0.975)
    expect(maxRpm).toBeLessThanOrEqual(1797 * 1.025)
    const restored = Object.assign(new Generator(rate, 91, settings), structuredClone(chunked))
    expect(restored.generate(1024)).toEqual(chunked.generate(1024))
  })

  it('captures process wander in healthy RMS while normalized window statistics stay stable', () => {
    const varying = new Generator(48000, 215811)
    const fixed = new Generator(48000, 215811, { variation: 0 })
    const varyingRms: number[] = [], fixedRms: number[] = []
    let crestChange = 0
    for (let i = 0; i < 20; i++) {
      const drifted = stats(varying.generate(12000).samples)
      const stationary = stats(fixed.generate(12000).samples)
      varyingRms.push(drifted.rms)
      fixedRms.push(stationary.rms)
      expect(Math.abs(drifted.kurtosis / stationary.kurtosis - 1)).toBeLessThan(0.02)
      crestChange += drifted.crest / stationary.crest - 1
    }
    const spread = (records: number[]) => {
      const mean = records.reduce((sum, value) => sum + value, 0) / records.length
      return Math.sqrt(records.reduce((sum, value) => sum + (value - mean) ** 2, 0) / records.length) / mean
    }
    expect(spread(varyingRms)).toBeGreaterThan(spread(fixedRms) * 2)
    expect(Math.abs(crestChange / 20)).toBeLessThan(0.02)
    // Isolate amplitude scaling from the separate small shaft-speed variation.
    const noiseVarying = new Generator(48000, 215811, { rpm: 0 })
    const noiseFixed = new Generator(48000, 215811, { rpm: 0, variation: 0 })
    for (let i = 0; i < 20; i++) {
      const drifted = stats(noiseVarying.generate(12000).samples)
      const stationary = stats(noiseFixed.generate(12000).samples)
      expect(Math.abs(drifted.crest / stationary.crest - 1)).toBeLessThan(0.01)
      expect(Math.abs(drifted.kurtosis / stationary.kurtosis - 1)).toBeLessThan(0.01)
    }
    expect(noiseVarying.seed).toBe(noiseFixed.seed)
  })

  it('uses a fixed population reference, strict upper event, independent status and exact score', () => {
    const reference = new Reference(3, 3)
    expect(reference.add(1).score).toBeNull()
    expect(reference.add(2)).toMatchObject({ ready: false, status: 'TRAINING', score: null, count: 2 })
    expect(reference.add(3)).toMatchObject({ ready: false, status: 'TRAINING', score: null, count: 3 })
    reference.setK(4)
    expect(reference.evaluate(3)).toMatchObject({ ready: false, status: 'TRAINING', score: null })
    reference.setK(3)
    expect(reference.add(2)).toMatchObject({ ready: true, status: 'NORMAL', score: 1, count: 3 })
    expect(reference.records).toEqual([1, 2, 3])
    expect(reference.mean).toBe(2)
    expect(reference.sigma).toBeCloseTo(Math.sqrt(2 / 3), 12)
    const threshold = reference.mean + 3 * reference.sigma
    expect(reference.evaluate(threshold).event).toBe(false)
    expect(reference.evaluate(threshold + 1e-10).event).toBe(true)
    expect(reference.evaluate(reference.mean + 9 * reference.sigma).score).toBeCloseTo(0.5, 12)
    expect(reference.evaluate(reference.mean + 15 * reference.sigma).score).toBe(0)
    expect(reference.evaluate(reference.mean - 15 * reference.sigma)).toMatchObject({ event: false, status: 'CRITICAL' })
    expect(reference.evaluate(threshold + 1e-10)).toMatchObject({ event: true, status: 'NORMAL' })
    reference.add(100)
    reference.setK(5)
    expect(reference.mean).toBe(2)
    expect(reference.sigma).toBeCloseTo(Math.sqrt(2 / 3), 12)
    expect(reference.evaluate(2).threshold).toBeCloseTo(2 + 5 * Math.sqrt(2 / 3), 12)
    const constant = new Reference(2, 3)
    constant.add(1)
    expect(constant.add(1)).toMatchObject({ ready: false, score: null, status: 'TRAINING' })
    expect(constant.add(2)).toMatchObject({ event: true, score: 1, status: 'NORMAL' })
  })

  it('raises RMS through late spalling while kurtosis falls from its peak', () => {
    const early = stats(new Generator(48000, 1, { fault: 'outer', severity: 0.6 }).generate(192000).samples)
    const late = stats(new Generator(48000, 1, { fault: 'outer', severity: 1 }).generate(192000).samples)
    expect(late.rms).toBeGreaterThan(early.rms)
    expect(late.kurtosis).toBeLessThan(early.kurtosis)
  })

  it('passes the browser-callable acceptance self-test', async () => {
    const result = await selfTest()
    expect(result.failures).toEqual([])
    expect(result.pass).toBe(true)
  })
})
