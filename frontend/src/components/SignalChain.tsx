export function SignalChain() {
  const steps = [
    ["Input window", "A file-backed source supplies raw sample windows; this controlled fixture supplies versioned RMS records."],
    ["RMS summary", "Silent-Ear represents each window as eight RMS-channel values."],
    ["Fixed demo reference", "The first N demo readings establish per-channel mean and standard deviation; that reference is fixed after readiness."],
    ["Upper comparison", "Each current value is checked against its mean plus the selected sigma multiplier."],
    ["Inspectable result", "The threshold state and heuristic demo deviation score are exposed for inspection."],
  ] as const;

  return (
    <ol className="signal-chain">
      {steps.map(([title, copy], index) => (
        <li key={title}>
          <span aria-hidden="true">0{index + 1}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </li>
      ))}
    </ol>
  );
}
