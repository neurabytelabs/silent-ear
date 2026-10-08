// Scenario time advances only with generated audio samples, never wall-clock timers.
export const DURATION = 90;
export function scenarioAt(time) {
  const p = Math.max(0, Math.min(1, (time - 12) / 78));
  return { fault: time < 12 ? 'none' : 'outer', severity: p ** 0.85,
    rpm: time >= DURATION ? 0 : 1797, load: 1 };
}
export function stageAt(time) {
  return time >= 90 ? 'Simulated seizure' : time < 12 ? 'Healthy / learning reference' : time < 38 ? 'Early outer race damage' : time < 65 ? 'Growing impacts' : 'Late damage / rising noise floor';
}

// Report observed crossings in either order; absence is final only at the endpoint.
export function leadTime(events, time) {
  const minutes = seconds => (seconds * 240 / DURATION).toFixed(1);
  const done = time >= DURATION;
  const rms = events.rms, kurtosis = events.kurtosis;
  if (rms !== undefined && kurtosis !== undefined) {
    const first = `Silent-Ear's rule fired ${minutes(DURATION-rms)} simulated minutes before the simulated seizure; `;
    return first + (kurtosis <= rms
      ? `kurtosis flagged the defect ${minutes(rms-kurtosis)} minutes before that.`
      : `the RMS rule fired ${minutes(kurtosis-rms)} minutes before kurtosis crossed its teaching limit.`);
  }
  if (rms !== undefined) return `Silent-Ear's rule fired ${minutes(DURATION-rms)} simulated minutes before the simulated seizure; kurtosis ${done?'never crossed':'has not yet crossed'} its teaching limit.`;
  if (kurtosis !== undefined) return `Kurtosis flagged the defect ${minutes(DURATION-kurtosis)} simulated minutes before the simulated seizure; Silent-Ear's RMS rule ${done?'never fired':'has not yet fired'}.`;
  return `Silent-Ear's RMS rule ${done?'never fired':'has not yet fired'}; kurtosis ${done?'never crossed':'has not yet crossed'} its teaching limit.`;
}
