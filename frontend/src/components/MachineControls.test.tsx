import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConveyorSchematic } from "./ConveyorSchematic";
import { MachineControls, type MachineControlsProps } from "./MachineControls";

afterEach(cleanup);

function props(overrides: Partial<MachineControlsProps> = {}): MachineControlsProps {
  return {
    mode: "full-assembly",
    station: "B1",
    axis: "X",
    playing: false,
    measurement: {
      channelId: "B1_X",
      channelLabel: "Bearing 1 · X",
      currentRms: 0.1311,
      fixedMean: 0.11147,
      standardDeviation: 0.00467,
      upperThreshold: 0.12549,
      comparisonLabel: "Demo threshold exceeded",
      comparisonGlyph: "exceeded",
      units: "demo units",
    },
    exceededChannels: ["Bearing 1 · X"],
    onModeChange: vi.fn(),
    onStationChange: vi.fn(),
    onAxisChange: vi.fn(),
    onResetCamera: vi.fn(),
    onTogglePlayback: vi.fn(),
    ...overrides,
  };
}

describe("MachineControls", () => {
  it("exposes model mode, station, axis, reset and playback as semantic controls", async () => {
    const user = userEvent.setup();
    const inputs = props();
    render(<MachineControls {...inputs} />);

    expect(screen.getByText(/Test cell/)).toHaveTextContent("Bearing 1 / X direction");
    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /B1 Bearing 1/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "X direction" })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "Inspect station" }));
    await user.click(screen.getByRole("button", { name: /B3 Bearing 3/ }));
    await user.click(screen.getByRole("button", { name: "Y direction" }));
    await user.click(screen.getByRole("button", { name: "Reset camera" }));
    await user.click(screen.getByRole("button", { name: "Play" }));

    expect(inputs.onModeChange).toHaveBeenCalledWith("inspect-station");
    expect(inputs.onStationChange).toHaveBeenCalledWith("B3");
    expect(inputs.onAxisChange).toHaveBeenCalledWith("Y");
    expect(inputs.onResetCamera).toHaveBeenCalledOnce();
    expect(inputs.onTogglePlayback).toHaveBeenCalledOnce();
  });

  it("keeps exact selected measurement facts and global exceedance adjacent", () => {
    render(<MachineControls {...props()} />);

    expect(screen.getByRole("heading", { name: "Bearing 1 · X" })).toBeVisible();
    expect(screen.getByText("B1_X")).toBeVisible();
    expect(screen.getByText("0.13110 demo units")).toBeVisible();
    expect(screen.getByText("0.11147 demo units")).toBeVisible();
    expect(screen.getByText("0.00467 demo units")).toBeVisible();
    expect(screen.getByText("0.12549 demo units")).toBeVisible();
    expect(screen.getByText(/Above upper demo threshold/)).toHaveTextContent("Bearing 1 · X");
    expect(screen.getByText(/motion visually amplified/)).toBeVisible();
  });

  it("does not invent reference facts before readiness", () => {
    render(<MachineControls {...props({
      measurement: {
        channelId: "B1_X",
        channelLabel: "Bearing 1 · X",
        currentRms: 0.108,
        fixedMean: null,
        standardDeviation: null,
        upperThreshold: null,
        comparisonLabel: "Learning demo baseline",
        comparisonGlyph: "unavailable",
      },
      exceededChannels: [],
    })} />);

    expect(screen.getAllByText("Not ready")).toHaveLength(3);
    expect(screen.queryByText(/Above upper demo threshold/)).not.toBeInTheDocument();
  });

  it("announces discrete selection and comparison changes without making the canvas focusable", () => {
    const initial = props();
    const { rerender } = render(<MachineControls {...initial} />);

    expect(screen.queryByText(/Bearing 2, Y direction selected/)).not.toBeInTheDocument();
    rerender(<MachineControls {...props({
      station: "B2",
      axis: "Y",
      mode: "inspect-station",
      measurement: {
        ...initial.measurement,
        channelId: "B2_Y",
        channelLabel: "Bearing 2 · Y",
        comparisonLabel: "Within demo reference",
        comparisonGlyph: "within",
      },
    })} />);

    expect(screen.getByText(/Bearing 2, Y direction selected/)).toHaveTextContent(
      "Inspect station. Within demo reference.",
    );
  });
});

describe("ConveyorSchematic", () => {
  it("preserves the full four-station and eight-channel map without WebGL", async () => {
    const user = userEvent.setup();
    const onStationSelect = vi.fn();
    render(
      <ConveyorSchematic
        mode="exploded-signal"
        station="B4"
        axis="Y"
        onStationSelect={onStationSelect}
      />,
    );

    expect(screen.getByRole("img", { name: /Full conveyor test cell schematic/ })).toBeVisible();
    expect(screen.getAllByRole("button", { name: /Bearing [1-4]; channels/ })).toHaveLength(4);
    expect(screen.getByText("B1_X · B1_Y")).toBeVisible();
    expect(screen.getByText("B4_X · B4_Y")).toBeVisible();
    expect(screen.getByText(/not a service instruction/)).toBeVisible();

    await user.click(screen.getByRole("button", { name: /Bearing 2; channels/ }));
    expect(onStationSelect).toHaveBeenCalledWith("B2");
  });
});
