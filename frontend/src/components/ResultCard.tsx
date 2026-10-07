import type { ExperienceStage, ScenarioSnapshot } from "../domain/scenario";

const PUBLIC_LABELS: Readonly<Record<ExperienceStage, string>> = {
  "not-started": "Controlled demo ready",
  "learning-demo-baseline": "Learning demo baseline",
  "comparing-rms": "Comparing RMS values",
  "within-demo-reference": "Within demo reference",
  "approaching-demo-threshold": "Approaching demo threshold",
  "demo-threshold-exceeded": "Demo threshold exceeded",
  "scenario-complete": "Scenario complete — inspect or replay",
};

interface ResultCardProps {
  readonly snapshot: ScenarioSnapshot;
}

export function ResultCard({ snapshot }: ResultCardProps) {
  const exceeded = snapshot.thresholdExceededChannels
    .map((channel) => snapshot.channels[channel]?.label)
    .filter(Boolean);

  return (
    <article className={`result-card state-${snapshot.stage}`} aria-labelledby="result-title">
      <div className="result-heading">
        <p className="section-kicker">Current comparison</p>
        <span className="state-symbol" aria-hidden="true" />
      </div>
      <h2 id="result-title" className="result-title" aria-live="polite">
        {PUBLIC_LABELS[snapshot.stage]}
      </h2>
      <p className="result-explanation">{snapshot.explanation}</p>

      <div className="score-block">
        <p className="score-label">Demo deviation score</p>
        {snapshot.demoDeviationScore === null ? (
          <p className="score-unavailable" data-testid="score-unavailable">
            {snapshot.stage === "comparing-rms"
              ? "Score unavailable — comparison in progress"
              : "Score unavailable — learning demo baseline"}
          </p>
        ) : (
          <p className="score-value" data-testid="score-value">
            <span>{snapshot.demoDeviationScore.toFixed(1)}</span>
            <small>out of 100</small>
          </p>
        )}
        <p className="score-caveat">
          A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life.
        </p>
      </div>

      {exceeded.length > 0 && (
        <p className="exceeded-list">
          Above upper demo threshold: <strong>{exceeded.join(", ")}</strong>
        </p>
      )}
    </article>
  );
}
