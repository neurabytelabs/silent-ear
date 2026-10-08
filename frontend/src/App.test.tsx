import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

beforeEach(() => {
  window.history.replaceState({}, "", "/?webgl=off");
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
});

describe("Silent-Ear accessible experience", () => {
  it("renders the complete 2D path when WebGL is explicitly disabled", () => {
    render(<App />);

    expect(screen.getByTestId("webgl-fallback")).toBeInTheDocument();
    expect(screen.getByText(/3D view unavailable/)).toBeVisible();
    expect(screen.getByText("Fixed reference mean and σ")).toBeVisible();
    expect(screen.getByRole("table", { name: /Current per-window RMS values/ })).toBeVisible();
  });

  it("links back to the bearing lab, the main demo at the site root", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "← Bearing lab (main demo)" })).toHaveAttribute("href", "../");
    expect(screen.getByRole("link", { name: /Main demo: listen to a bearing fail/ })).toHaveAttribute("href", "../");
  });

  it("shows no numeric score before baseline readiness", () => {
    render(<App />);

    expect(screen.getByTestId("score-unavailable")).toHaveTextContent(
      "Score unavailable — learning demo baseline",
    );
    expect(screen.queryByTestId("score-value")).not.toBeInTheDocument();
  });

  it("selects a scenario and resets it to the controlled ready state", async () => {
    const user = userEvent.setup();
    render(<App />);

    const noisy = screen.getByRole("tab", { name: /Noisy environment/ });
    await user.click(noisy);

    expect(noisy).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Controlled demo ready" })).toBeVisible();
    expect(screen.queryByTestId("score-value")).not.toBeInTheDocument();
  });

  it("skips the guided sequence without hiding direct controls", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Skip guided journey" }));

    expect(screen.getByText("Direct inspection mode")).toBeVisible();
    expect(screen.getByRole("tab", { name: /Controlled synthetic RMS deviation/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("slider", { name: /Inspect/ })).toBeEnabled();
  });

  it("renders a post-baseline score only with its full adjacent caveat", () => {
    window.history.replaceState(
      {},
      "",
      "/?webgl=off&scenario=controlled-deviation-v1&step=0.8",
    );
    render(<App />);

    expect(screen.getByTestId("score-value")).toBeVisible();
    expect(
      screen.getByText(
        "A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life.",
      ),
    ).toBeVisible();
  });

  it("keeps automatic playback off when reduced motion is requested", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Run the controlled demo" }));

    expect(screen.getByRole("button", { name: "Playback paused" })).toBeDisabled();
    expect(screen.getByText(/Reduced motion is active/)).toBeVisible();
    expect(screen.getByRole("button", { name: "Next window" })).toBeEnabled();
  });
});
