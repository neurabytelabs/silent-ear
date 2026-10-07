import type { KeyboardEvent, RefObject } from "react";
import type { ScenarioFixture, ScenarioId } from "../fixtures/scenarios";

interface ScenarioControlsProps {
  readonly scenarios: readonly ScenarioFixture[];
  readonly selected: ScenarioId;
  readonly onSelect: (scenario: ScenarioId) => void;
  readonly headingRef: RefObject<HTMLHeadingElement>;
}

export function ScenarioControls({ scenarios, selected, onSelect, headingRef }: ScenarioControlsProps) {
  const moveSelection = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % scenarios.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + scenarios.length) % scenarios.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenarios.length - 1;
    else return;

    event.preventDefault();
    onSelect(scenarios[next].id);
    document.getElementById(`scenario-${scenarios[next].id}`)?.focus();
  };

  return (
    <section className="scenario-card" aria-labelledby="scenario-heading">
      <p className="act-label">Act III · Scenario lab</p>
      <h2 id="scenario-heading" ref={headingRef} tabIndex={-1}>Compare controlled scenarios</h2>
      <p>Each choice replays fixed local values. Scenario changes reset to a scoreless, not-started state.</p>
      <div className="scenario-tabs" role="tablist" aria-label="Controlled RMS scenarios">
        {scenarios.map((scenario, index) => {
          const isSelected = selected === scenario.id;
          return (
            <button
              key={scenario.id}
              id={`scenario-${scenario.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(scenario.id)}
              onKeyDown={(event) => moveSelection(event, index)}
            >
              <span className="scenario-index">0{index + 1}</span>
              <span>
                <strong>{scenario.title}</strong>
                <small>{scenario.description}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
