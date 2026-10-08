import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.SILENT_EAR_URL ?? "http://127.0.0.1:3000";
// The 3D test cell lives at /cell/; the bearing lab is the main page at /.
const cellPath = process.env.SILENT_EAR_CELL_PATH ?? "/cell/";
const baseOrigin = new URL(baseUrl).origin;
const qaLoop = process.env.SILENT_EAR_QA_LOOP ?? "all";
const outputDirectory = resolve("docs/experience/screenshots-v2");
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = {
  baseUrl,
  qaLoop,
  chromium: chromium.executablePath(),
  captures: [],
  contexts: [],
  assertions: {},
};

function emptyEvidence(name) {
  return {
    name,
    consoleErrors: [],
    pageErrors: [],
    unhandledRejections: [],
    requestFailures: [],
    badResponses: [],
    externalRequests: [],
  };
}

async function createContext(name, options) {
  const context = await browser.newContext(options);
  await context.addInitScript(() => {
    window.__silentEarQaUnhandled = [];
    window.addEventListener("unhandledrejection", (event) => {
      const reason = event.reason;
      window.__silentEarQaUnhandled.push(
        reason instanceof Error ? `${reason.name}: ${reason.message}` : String(reason),
      );
    });
  });
  const evidence = emptyEvidence(name);
  results.contexts.push(evidence);
  return { context, evidence };
}

async function openPage(context, evidence, path = "/") {
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") evidence.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => evidence.pageErrors.push(`${error.name}: ${error.message}`));
  page.on("requestfailed", (request) => {
    evidence.requestFailures.push(`${request.failure()?.errorText ?? "failed"} ${request.url()}`);
  });
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("data:") || url.startsWith("blob:")) return;
    try {
      if (new URL(url).origin !== baseOrigin) evidence.externalRequests.push(url);
    } catch {
      evidence.externalRequests.push(url);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      evidence.badResponses.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto(`${baseUrl}${cellPath}${path.replace(/^\//, "")}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(850);
  return page;
}

async function finishPage(page, evidence) {
  const unhandled = await page.evaluate(() => window.__silentEarQaUnhandled ?? []);
  evidence.unhandledRejections.push(...unhandled);
}

async function capture(page, name, metadata, options = {}) {
  const path = resolve(outputDirectory, name);
  await page.screenshot({ path, ...options });
  results.captures.push({ name, ...metadata });
}

async function captureElement(locator, name, metadata) {
  const path = resolve(outputDirectory, name);
  await locator.screenshot({ path });
  results.captures.push({ name, ...metadata });
}

async function parseRendererMetrics(page) {
  return page.locator('[data-testid="scene-host"][data-renderer-metrics]').evaluate((element) => {
    const raw = element.getAttribute("data-renderer-metrics");
    return raw ? JSON.parse(raw) : null;
  });
}

async function captureOverview({ name, viewport, isMobile = false }) {
  const contextName = `overview-${viewport.width}x${viewport.height}`;
  const { context, evidence } = await createContext(contextName, { viewport, isMobile });
  const page = await openPage(context, evidence, "/");
  const metrics = await parseRendererMetrics(page);
  const facts = await page.evaluate(() => ({
    canvasCount: document.querySelectorAll("canvas").length,
    selectedMode: document.querySelector('[role="group"][aria-label="Model view"] [aria-pressed="true"]')?.textContent?.trim(),
    selectedStation: document.querySelector('[id^="station-control-"][aria-pressed="true"]')?.id,
    selectedAxis: document.querySelector('[role="group"][aria-label="Measurement direction"] [aria-pressed="true"]')?.textContent?.trim(),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  await capture(page, name, {
    loop: 1,
    viewport,
    isMobile,
    mode: "full-assembly",
    station: "B1",
    axis: "X",
    scenario: "within-reference-v1",
    step: "not-started",
    metrics,
    facts,
  });
  await finishPage(page, evidence);
  await context.close();
  return { metrics, facts };
}

async function captureInspection(station, name) {
  const viewport = { width: 1440, height: 900 };
  const { context, evidence } = await createContext(`inspect-${station}`, { viewport });
  const page = await openPage(
    context,
    evidence,
    "/?scenario=controlled-deviation-v1&step=0.5294117647058824",
  );
  await page.getByRole("button", { name: new RegExp(`${station} Bearing`) }).click();
  await page.waitForTimeout(850);
  const metrics = await parseRendererMetrics(page);
  const facts = await page.evaluate(() => ({
    selectedMode: document.querySelector('[role="group"][aria-label="Model view"] [aria-pressed="true"]')?.textContent?.trim(),
    selectedStation: document.querySelector('[id^="station-control-"][aria-pressed="true"]')?.id,
    selectedAxis: document.querySelector('[role="group"][aria-label="Measurement direction"] [aria-pressed="true"]')?.textContent?.trim(),
    breadcrumb: document.querySelector(".machine-breadcrumb")?.textContent?.replace(/\s+/g, " ").trim(),
  }));
  await capture(page, name, {
    loop: 1,
    viewport,
    mode: "inspect-station",
    station,
    axis: "X",
    scenario: "controlled-deviation-v1",
    step: 9,
    metrics,
    facts,
  });
  await finishPage(page, evidence);
  await context.close();
  return { metrics, facts };
}

async function runLoop1() {
  results.assertions.loop1 = {
    desktop1440: await captureOverview({
      name: "loop1-overview-1440x900.png",
      viewport: { width: 1440, height: 900 },
    }),
    desktop1280: await captureOverview({
      name: "loop1-overview-1280x800.png",
      viewport: { width: 1280, height: 800 },
    }),
    mobile390: await captureOverview({
      name: "loop1-overview-mobile-390x844.png",
      viewport: { width: 390, height: 844 },
      isMobile: true,
    }),
    inspectB1: await captureInspection("B1", "loop1-inspect-b1-1440x900.png"),
    inspectB4: await captureInspection("B4", "loop1-inspect-b4-1440x900.png"),
  };
}

async function scrollLabToTop(page) {
  await page.locator("#scenario-lab").evaluate((element) => {
    document.documentElement.style.scrollBehavior = "auto";
    element.scrollIntoView({ behavior: "auto", block: "start" });
  });
  await page.waitForTimeout(250);
}

async function scrollPageTop(page) {
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "auto" });
  });
  await page.waitForTimeout(100);
}

async function captureCanonicalState(name, frameIndex) {
  const viewport = { width: 1440, height: 900 };
  const progress = frameIndex / 17;
  const { context, evidence } = await createContext(`canonical-${name}`, { viewport });
  const page = await openPage(
    context,
    evidence,
    `/?scenario=controlled-deviation-v1&step=${progress}`,
  );
  const state = await page.evaluate(() => ({
    status: document.querySelector("#result-title")?.textContent?.trim(),
    explanation: document.querySelector(".result-explanation")?.textContent?.replace(/\s+/g, " ").trim(),
    score: document.querySelector('[data-testid="score-value"]')?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    channel: document.querySelector("#measurement-bridge-title")?.textContent?.trim(),
    comparison: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    exceeded: document.querySelector(".global-exceeded-note")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    measurementFacts: [...document.querySelectorAll(".measurement-bridge dl div")].map((row) => ({
      label: row.querySelector("dt")?.textContent?.trim(),
      value: row.querySelector("dd")?.textContent?.replace(/\s+/g, " ").trim(),
    })),
    canvas: (() => {
      const canvas = document.querySelector("canvas[data-silent-ear-scene]");
      return canvas ? {
        frame: canvas.dataset.fixtureFrame,
        station: canvas.dataset.selectedStation,
        axis: canvas.dataset.selectedAxis,
        channel: canvas.dataset.selectedChannel,
        mode: canvas.dataset.modelMode,
      } : null;
    })(),
  }));
  const metrics = await parseRendererMetrics(page);
  const stem = name.replace(/\.png$/, "");
  await capture(page, `${stem}-hero.png`, {
    loop: 2,
    viewport,
    scenario: "controlled-deviation-v1",
    frameIndex,
    station: "B1",
    axis: "X",
    mode: "full-assembly",
    surface: "model",
    metrics,
    state,
  });
  await page.locator(".machine-controls").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await capture(page, `${stem}-facts.png`, {
    loop: 2,
    viewport,
    scenario: "controlled-deviation-v1",
    frameIndex,
    station: "B1",
    axis: "X",
    mode: "full-assembly",
    surface: "adjacent-facts",
    metrics,
    state,
  });
  await scrollLabToTop(page);
  await capture(page, `${stem}-result.png`, {
    loop: 2,
    viewport,
    scenario: "controlled-deviation-v1",
    frameIndex,
    station: "B1",
    axis: "X",
    mode: "full-assembly",
    surface: "result-timeline",
    state,
  });
  await finishPage(page, evidence);
  await context.close();
  return state;
}

async function captureModeSequence() {
  const viewport = { width: 1440, height: 900 };
  const { context, evidence } = await createContext("mode-sequence", { viewport });
  const page = await openPage(
    context,
    evidence,
    "/?scenario=controlled-deviation-v1&step=0.5882352941176471",
  );

  const modeResults = {};
  await capture(page, "desktop-overview.png", {
    loop: 2,
    viewport,
    mode: "full-assembly",
    station: "B1",
    axis: "X",
    metrics: await parseRendererMetrics(page),
  });

  await page.getByRole("button", { name: "Inspect station" }).click();
  await page.waitForTimeout(850);
  modeResults.inspect = await parseRendererMetrics(page);
  await scrollPageTop(page);
  await capture(page, "desktop-inspect-b1x.png", {
    loop: 2,
    viewport,
    mode: "inspect-station",
    station: "B1",
    axis: "X",
    metrics: modeResults.inspect,
  });

  await page.getByRole("button", { name: "Exploded signal" }).click();
  await page.waitForTimeout(850);
  modeResults.exploded = await parseRendererMetrics(page);
  await scrollPageTop(page);
  await capture(page, "desktop-exploded-b1x.png", {
    loop: 2,
    viewport,
    mode: "exploded-signal",
    station: "B1",
    axis: "X",
    metrics: modeResults.exploded,
  });

  await page.getByRole("button", { name: "Overview", exact: true }).click();
  await page.waitForTimeout(850);
  modeResults.restored = await parseRendererMetrics(page);
  await scrollPageTop(page);
  await capture(page, "desktop-full-restored.png", {
    loop: 2,
    viewport,
    mode: "full-assembly-restored",
    station: "B1",
    axis: "X",
    metrics: modeResults.restored,
  });

  await finishPage(page, evidence);
  await context.close();
  return modeResults;
}

async function runCoreLoop2() {
  results.assertions.modeSequence = await captureModeSequence();
  results.assertions.canonicalStates = {
    within: await captureCanonicalState("within-b1x.png", 9),
    approach: await captureCanonicalState("approach-b1x.png", 10),
    equality: await captureCanonicalState("equality-b1x.png", 11),
    exceeded: await captureCanonicalState("exceeded-b1x.png", 12),
    returned: await captureCanonicalState("returned-b1x.png", 17),
  };
}

function clusterHitPoints(points, step) {
  const byKey = new Map(points.map((point) => [`${point.x}:${point.y}`, point]));
  const visited = new Set();
  const components = [];
  for (const point of points) {
    const key = `${point.x}:${point.y}`;
    if (visited.has(key)) continue;
    const queue = [point];
    const component = [];
    visited.add(key);
    while (queue.length > 0) {
      const current = queue.pop();
      component.push(current);
      for (const dx of [-step, 0, step]) {
        for (const dy of [-step, 0, step]) {
          if (dx === 0 && dy === 0) continue;
          const neighborKey = `${current.x + dx}:${current.y + dy}`;
          if (byKey.has(neighborKey) && !visited.has(neighborKey)) {
            visited.add(neighborKey);
            queue.push(byKey.get(neighborKey));
          }
        }
      }
    }
    if (component.length >= 2) components.push(component);
  }
  return components.map((component) => {
    const center = component.reduce(
      (sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }),
      { x: 0, y: 0 },
    );
    center.x /= component.length;
    center.y /= component.length;
    return component.reduce((nearest, point) =>
      Math.hypot(point.x - center.x, point.y - center.y) <
      Math.hypot(nearest.x - center.x, nearest.y - center.y) ? point : nearest,
    );
  });
}

async function runProjectedPickCheck() {
  const viewport = { width: 1440, height: 900 };
  const { context, evidence } = await createContext("projected-pick-check", { viewport });
  const page = await openPage(context, evidence, "/");
  const step = 4;
  const scan = await page.evaluate((scanStep) => {
    const canvas = document.querySelector("canvas[data-silent-ear-scene]");
    if (!(canvas instanceof HTMLCanvasElement)) return { hits: [], projectedStations: {} };
    const bounds = canvas.getBoundingClientRect();
    const found = [];
    const projectedStations = {};
    for (let y = Math.ceil(bounds.top); y < Math.floor(bounds.bottom); y += scanStep) {
      for (let x = Math.ceil(bounds.left); x < Math.floor(bounds.right); x += scanStep) {
        canvas.dispatchEvent(new PointerEvent("pointermove", {
          clientX: x,
          clientY: y,
          pointerType: "mouse",
          bubbles: true,
        }));
        if (canvas.style.cursor !== "pointer") continue;
        found.push({ x, y });
        canvas.dispatchEvent(new PointerEvent("pointerdown", {
          button: 0,
          clientX: x,
          clientY: y,
          pointerType: "mouse",
          bubbles: true,
        }));
        canvas.dispatchEvent(new PointerEvent("pointerup", {
          button: 0,
          clientX: x,
          clientY: y,
          pointerType: "mouse",
          bubbles: true,
        }));
        const station = canvas.dataset.selectedStation;
        if (station && !projectedStations[station]) projectedStations[station] = { x, y };
      }
    }
    canvas.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }));
    return { hits: found, projectedStations };
  }, step);
  const centers = clusterHitPoints(scan.hits, step);
  await finishPage(page, evidence);
  await context.close();

  const selections = [];
  for (const [expectedStation, center] of Object.entries(scan.projectedStations).sort()) {
    const pickSetup = await createContext(`projected-pick-${expectedStation}`, { viewport });
    const pickPage = await openPage(pickSetup.context, pickSetup.evidence, "/");
    await pickPage.mouse.click(center.x, center.y);
    await pickPage.waitForTimeout(750);
    selections.push({
      ...center,
      expectedStation,
      station: await pickPage.locator("canvas[data-silent-ear-scene]").getAttribute("data-selected-station"),
      pressed: await pickPage.locator('[id^="station-control-"][aria-pressed="true"]').getAttribute("id"),
      mode: await pickPage.locator("canvas[data-silent-ear-scene]").getAttribute("data-model-mode"),
    });
    await finishPage(pickPage, pickSetup.evidence);
    await pickSetup.context.close();
  }
  return {
    hitPointCount: scan.hits.length,
    componentCount: centers.length,
    projectedStations: scan.projectedStations,
    selections,
    uniqueStations: [...new Set(selections.map((selection) => selection.station))].sort(),
  };
}

async function runLoop2StateTransitions() {
  const viewport = { width: 1440, height: 900 };
  const { context, evidence } = await createContext("loop2-state-transitions", { viewport });
  const page = await openPage(
    context,
    evidence,
    "/?scenario=controlled-deviation-v1&step=0.7058823529411765",
  );

  await page.getByRole("button", { name: "Inspect station" }).click();
  await page.getByRole("button", { name: "Exploded signal" }).click();
  await page.waitForTimeout(850);
  const explodedMetrics = await parseRendererMetrics(page);
  await page.getByRole("button", { name: "Overview", exact: true }).click();
  await page.waitForTimeout(850);
  const restoredMetrics = await parseRendererMetrics(page);
  const restoredFacts = await page.evaluate(() => ({
    mode: document.querySelector('[role="group"][aria-label="Model view"] [aria-pressed="true"]')?.textContent?.trim(),
    station: document.querySelector('[id^="station-control-"][aria-pressed="true"]')?.id,
    axis: document.querySelector('[role="group"][aria-label="Measurement direction"] [aria-pressed="true"]')?.textContent?.trim(),
    canvasMode: document.querySelector("canvas")?.dataset.modelMode,
  }));
  await capture(page, "loop2-full-restored-after-explode.png", {
    loop: 2,
    viewport,
    fromFrame: 12,
    explodedMetrics,
    restoredMetrics,
    restoredFacts,
  });

  const range = page.locator("#timeline-range");
  await range.focus();
  await range.press("ArrowLeft");
  await page.waitForTimeout(250);
  const backwardFacts = await page.evaluate(() => ({
    status: document.querySelector("#result-title")?.textContent?.trim(),
    comparison: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    exceeded: document.querySelector(".global-exceeded-note")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    score: document.querySelector('[data-testid="score-value"]')?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    frame: document.querySelector("canvas")?.dataset.fixtureFrame,
  }));
  await page.locator(".machine-controls").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await captureElement(page.locator(".machine-controls"), "loop2-backward-to-equality.png", {
    loop: 2,
    viewport,
    transition: "exceeded-12-backward-to-equality-11",
    backwardFacts,
  });

  await range.focus();
  await range.press("End");
  await page.waitForTimeout(250);
  const returnedFacts = await page.evaluate(() => ({
    status: document.querySelector("#result-title")?.textContent?.trim(),
    comparison: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    exceeded: document.querySelector(".global-exceeded-note")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    frame: document.querySelector("canvas")?.dataset.fixtureFrame,
    mode: document.querySelector("canvas")?.dataset.modelMode,
    metrics: (() => {
      const raw = document.querySelector('[data-testid="scene-host"]')?.getAttribute("data-renderer-metrics");
      return raw ? JSON.parse(raw) : null;
    })(),
  }));
  await capture(page, "loop2-returned-after-exceeded.png", {
    loop: 2,
    viewport,
    transition: "exceeded-12-to-returned-17",
    returnedFacts,
  });

  await page.getByRole("button", { name: /B2 Bearing/ }).click();
  await page.getByRole("button", { name: "Y direction" }).click();
  await range.focus();
  for (let index = 0; index < 5; index += 1) await range.press("ArrowLeft");
  await page.waitForTimeout(250);
  const unselectedGlobalFacts = await page.evaluate(() => ({
    selectedChannel: document.querySelector(".channel-id")?.textContent?.trim(),
    selectedComparison: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    globalExceeded: document.querySelector(".global-exceeded-note")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    result: document.querySelector("#result-title")?.textContent?.trim(),
    canvasStation: document.querySelector("canvas")?.dataset.selectedStation,
    canvasAxis: document.querySelector("canvas")?.dataset.selectedAxis,
  }));
  await page.locator(".machine-controls").scrollIntoViewIfNeeded();
  await capture(page, "loop2-unselected-global-exceeded.png", {
    loop: 2,
    viewport,
    frame: 12,
    unselectedGlobalFacts,
  });

  await finishPage(page, evidence);
  await context.close();
  return { explodedMetrics, restoredMetrics, restoredFacts, backwardFacts, returnedFacts, unselectedGlobalFacts };
}

async function runLoop2() {
  await runCoreLoop2();
  results.assertions.loop2Transitions = await runLoop2StateTransitions();
  results.assertions.htmlParityAndLifecycle = await runInteractionStress();
  results.assertions.projectedPicks = await runProjectedPickCheck();

  const states = results.assertions.canonicalStates;
  const transitions = results.assertions.loop2Transitions;
  const interaction = results.assertions.htmlParityAndLifecycle;
  const picks = results.assertions.projectedPicks;
  results.assertions.loop2Acceptance = {
    canonicalFacts: states.within.status === "Within demo reference" &&
      states.approach.status === "Approaching demo threshold" &&
      states.equality.comparison === "At threshold — not exceeded" &&
      states.equality.exceeded === null &&
      states.exceeded.status === "Demo threshold exceeded" &&
      states.exceeded.score.startsWith("90.0") &&
      states.returned.status === "Within demo reference" &&
      states.returned.score.startsWith("100.0"),
    returnedClearsExceeded: transitions.returnedFacts.frame === "17" &&
      transitions.returnedFacts.status === "Within demo reference" &&
      transitions.returnedFacts.exceeded === null,
    backwardClearsExceeded: transitions.backwardFacts.frame === "11" &&
      transitions.backwardFacts.status === "Approaching demo threshold" &&
      transitions.backwardFacts.comparison === "At threshold — not exceeded" &&
      transitions.backwardFacts.exceeded === null &&
      transitions.backwardFacts.score.startsWith("100.0"),
    unselectedGlobalExceeded: transitions.unselectedGlobalFacts.selectedChannel === "B2_Y" &&
      transitions.unselectedGlobalFacts.selectedComparison === "At or below upper demo threshold" &&
      transitions.unselectedGlobalFacts.globalExceeded === "Above upper demo threshold: B1_X" &&
      transitions.unselectedGlobalFacts.result === "Demo threshold exceeded",
    fullRestoration: transitions.restoredFacts.canvasMode === "full-assembly" &&
      transitions.restoredMetrics.restorationError === 0 &&
      transitions.restoredMetrics.activeAnimationReasons.length === 0,
    htmlParity: interaction.parity.length === 8 &&
      new Set(interaction.parity.map(({ channel }) => channel)).size === 8,
    lifecycle: interaction.lifecycle.canvasCount === 1 &&
      interaction.lifecycle.metrics.restorationError === 0 &&
      interaction.lifecycle.metrics.activeAnimationReasons.length === 0 &&
      interaction.remounts.every(({ canvases, sceneHosts }) => canvases === 1 && sceneHosts === 1),
    fourProjectedPicks: picks.uniqueStations.join(",") === "B1,B2,B3,B4" &&
      picks.selections.every(({ expectedStation, station, pressed, mode }) =>
        station === expectedStation && pressed === `station-control-${expectedStation}` && mode === "inspect-station"),
  };
}

function rendererWithin(metrics, { calls, triangles, dpr }) {
  return Boolean(metrics) && metrics.drawCalls <= calls && metrics.triangles <= triangles && metrics.dpr <= dpr;
}

async function finalDesktopCapture(name, viewport) {
  const setup = await createContext(`loop3-${name}`, { viewport });
  const page = await openPage(
    setup.context,
    setup.evidence,
    "/?scenario=controlled-deviation-v1&step=0.5882352941176471",
  );
  const metrics = await parseRendererMetrics(page);
  const facts = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    canvasCount: document.querySelectorAll("canvas").length,
    station: document.querySelector("canvas")?.dataset.selectedStation,
    axis: document.querySelector("canvas")?.dataset.selectedAxis,
    mode: document.querySelector("canvas")?.dataset.modelMode,
    result: document.querySelector("#result-title")?.textContent?.trim(),
  }));
  await capture(page, name, { loop: 3, viewport, metrics, facts });
  await finishPage(page, setup.evidence);
  await setup.context.close();
  return { metrics, facts };
}

async function sampleFramePacing(page, durationMs = 5000) {
  return page.evaluate(async (sampleDuration) => {
    const stamps = [];
    await new Promise((resolvePromise) => {
      let first;
      const tick = (timestamp) => {
        if (first === undefined) first = timestamp;
        stamps.push(timestamp);
        if (timestamp - first >= sampleDuration) resolvePromise();
        else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    const gaps = stamps.slice(1).map((stamp, index) => stamp - stamps[index]);
    const sorted = [...gaps].sort((a, b) => a - b);
    const percentile = (ratio) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * ratio) - 1))] ?? 0;
    const duration = stamps.at(-1) - stamps[0];
    return {
      requestedDurationMs: sampleDuration,
      observedDurationMs: duration,
      frameCount: stamps.length,
      fps: duration > 0 ? (stamps.length - 1) * 1000 / duration : 0,
      medianGapMs: percentile(0.5),
      p95GapMs: percentile(0.95),
      p99GapMs: percentile(0.99),
      maxGapMs: Math.max(0, ...gaps),
      gapsAbove33_3: gaps.filter((gap) => gap > 33.3).length,
      gapsAbove50: gaps.filter((gap) => gap > 50).length,
    };
  }, durationMs);
}

async function performanceProbe(name, contextOptions, minimumFps) {
  const setup = await createContext(name, contextOptions);
  await setup.context.addInitScript(() => {
    window.__silentEarQaLongTasks = [];
    if (typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("longtask")) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__silentEarQaLongTasks.push({ startTime: entry.startTime, duration: entry.duration });
        }
      });
      observer.observe({ type: "longtask", buffered: true });
    }
  });
  const page = await openPage(setup.context, setup.evidence, "/");
  await page.getByRole("button", { name: "Run the controlled demo" }).click();
  await page.waitForTimeout(2000);
  const pacing = await sampleFramePacing(page, 5000);
  const playingMetrics = await parseRendererMetrics(page);
  const pause = page.getByRole("button", { name: "Pause journey", exact: true });
  if (await pause.isVisible()) await pause.click();
  await page.waitForTimeout(250);
  const settledMetrics = await parseRendererMetrics(page);
  const longTasks = await page.evaluate(() => window.__silentEarQaLongTasks ?? []);
  await finishPage(page, setup.evidence);
  await setup.context.close();
  return {
    warmupMs: 2000,
    minimumFps,
    pacing,
    playingMetrics,
    settledMetrics,
    longTasks,
    longTasksOver50: longTasks.filter(({ duration }) => duration > 50),
  };
}

async function runLoop3() {
  const desktop1440 = await finalDesktopCapture("loop3-desktop-1440x900.png", { width: 1440, height: 900 });
  const desktop1280 = await finalDesktopCapture("loop3-desktop-1280x800.png", { width: 1280, height: 800 });

  const focusSetup = await createContext("loop3-focus", { viewport: { width: 1440, height: 900 } });
  const focusPage = await openPage(focusSetup.context, focusSetup.evidence, "/");
  let focusFacts;
  for (let index = 0; index < 14; index += 1) {
    await focusPage.keyboard.press("Tab");
    focusFacts = await focusPage.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement)) return null;
      const style = getComputedStyle(element);
      return {
        text: element.textContent?.replace(/\s+/g, " ").trim(),
        className: element.className,
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
      };
    });
    if (focusFacts?.className?.includes("primary-action")) break;
  }
  await scrollPageTop(focusPage);
  await capture(focusPage, "loop3-focus-state-1440x900.png", {
    loop: 3,
    viewport: { width: 1440, height: 900 },
    focusFacts,
  });
  await finishPage(focusPage, focusSetup.evidence);
  await focusSetup.context.close();

  const mobileViewport = { width: 390, height: 844 };
  const mobileSetup = await createContext("loop3-mobile", {
    viewport: mobileViewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const mobile = await openPage(
    mobileSetup.context,
    mobileSetup.evidence,
    "/?scenario=controlled-deviation-v1&step=0.5882352941176471",
  );
  const mobileOverviewMetrics = await parseRendererMetrics(mobile);
  const mobileOverviewFacts = await mobile.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    controlsOpen: document.querySelector(".machine-control-disclosure")?.hasAttribute("open"),
    canvasCount: document.querySelectorAll("canvas").length,
    canvasMode: document.querySelector("canvas")?.dataset.modelMode,
    meaningfulMachinePixels: document.querySelector("canvas")?.getBoundingClientRect().toJSON(),
  }));
  await capture(mobile, "loop3-mobile-390x844.png", {
    loop: 3,
    viewport: mobileViewport,
    metrics: mobileOverviewMetrics,
    facts: mobileOverviewFacts,
  }, { scale: "css", clip: { x: 0, y: 0, width: 390, height: 844 } });

  await mobile.evaluate(() => {
    const disclosure = document.querySelector(".machine-control-disclosure");
    if (disclosure instanceof HTMLDetailsElement) disclosure.open = true;
  });
  const touchFacts = await mobile.evaluate(() => ({
    below44: [...document.querySelectorAll("button, a, summary, input[type='range']")]
      .map((element) => ({
        label: element.getAttribute("aria-label") ?? element.textContent?.replace(/\s+/g, " ").trim() ?? element.id,
        box: element.getBoundingClientRect().toJSON(),
      }))
      .filter(({ box }) => box.width > 0 && box.height > 0 && (box.width < 44 || box.height < 44))
      .map(({ label, box }) => ({ label, width: box.width, height: box.height })),
  }));
  await mobile.evaluate(() => {
    const button = [...document.querySelectorAll('[role="group"][aria-label="Model view"] button')]
      .find((candidate) => candidate.textContent?.trim() === "Exploded signal");
    if (!(button instanceof HTMLButtonElement)) throw new Error("Exploded signal control unavailable");
    button.click();
    button.blur();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  await mobile.waitForTimeout(850);
  const mobileExplodedMetrics = await parseRendererMetrics(mobile);
  await scrollPageTop(mobile);
  const mobileExplodedFacts = await mobile.evaluate(() => ({
    scrollY: window.scrollY,
    canvasMode: document.querySelector("canvas")?.dataset.modelMode,
    canvasRect: document.querySelector("canvas")?.getBoundingClientRect().toJSON(),
  }));
  await capture(mobile, "loop3-mobile-exploded-390x844.png", {
    loop: 3,
    viewport: mobileViewport,
    metrics: mobileExplodedMetrics,
    touchFacts,
    facts: mobileExplodedFacts,
  }, { scale: "css", clip: { x: 0, y: 0, width: 390, height: 844 } });
  await mobile.evaluate(() => {
    const button = [...document.querySelectorAll('[role="group"][aria-label="Model view"] button')]
      .find((candidate) => candidate.textContent?.trim() === "Overview");
    if (!(button instanceof HTMLButtonElement)) throw new Error("Overview control unavailable");
    button.click();
  });
  await mobile.waitForTimeout(850);
  const mobileRestoredMetrics = await parseRendererMetrics(mobile);
  await mobile.getByRole("button", { name: /B4 Bearing/ }).click();
  await mobile.waitForTimeout(750);
  const mobileRealInteraction = await mobile.evaluate(() => ({
    station: document.querySelector("canvas")?.dataset.selectedStation,
    mode: document.querySelector("canvas")?.dataset.modelMode,
    pressed: document.querySelector('[id^="station-control-"][aria-pressed="true"]')?.id,
  }));
  await finishPage(mobile, mobileSetup.evidence);
  await mobileSetup.context.close();

  const reducedSetup = await createContext("loop3-reduced-motion", {
    viewport: { width: 1200, height: 900 },
    reducedMotion: "reduce",
  });
  const reduced = await openPage(
    reducedSetup.context,
    reducedSetup.evidence,
    "/?scenario=controlled-deviation-v1&step=0.5882352941176471",
  );
  const reducedBefore = await parseRendererMetrics(reduced);
  await reduced.waitForTimeout(750);
  const reducedAfter = await parseRendererMetrics(reduced);
  const reducedRange = reduced.locator("#timeline-range");
  await reducedRange.focus();
  await reducedRange.press("ArrowLeft");
  await reduced.waitForTimeout(100);
  const reducedFacts = await reduced.evaluate(() => ({
    mediaMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
    machinePlaybackDisabled: document.querySelector(".machine-action-row button:last-child")?.disabled,
    journeyPlaybackDisabled: document.querySelector(".playback-actions button:first-child")?.disabled,
    modeNoteVisible: document.body.innerText.includes("Reduced motion is active"),
    frameAfterDirectStep: document.querySelector("canvas")?.dataset.fixtureFrame,
    comparisonAfterDirectStep: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  await capture(reduced, "loop3-reduced-motion-full.png", {
    loop: 3,
    viewport: { width: 1200, height: 900 },
    before: reducedBefore,
    after: reducedAfter,
    facts: reducedFacts,
  }, { fullPage: true });
  await finishPage(reduced, reducedSetup.evidence);
  await reducedSetup.context.close();

  const fallbackSetup = await createContext("loop3-no-webgl", { viewport: { width: 1200, height: 900 } });
  const fallback = await openPage(
    fallbackSetup.context,
    fallbackSetup.evidence,
    "/?scenario=controlled-deviation-v1&step=0.7058823529411765&webgl=off",
  );
  await fallback.getByRole("button", { name: /Bearing 4; channels B4_X/ }).click();
  await fallback.getByRole("button", { name: "Y direction" }).click();
  const fallbackFacts = await fallback.evaluate(() => ({
    canvasCount: document.querySelectorAll("canvas").length,
    fallbackVisible: Boolean(document.querySelector('[data-testid="webgl-fallback"]')),
    schematicTitle: document.querySelector("#schematic-title")?.textContent?.trim(),
    schematicDescription: document.querySelector("#schematic-desc")?.textContent?.replace(/\s+/g, " ").trim(),
    schematicStations: [...document.querySelectorAll(".schematic-station-layer button")].map((button) => button.getAttribute("aria-label")),
    channelMap: [...document.querySelectorAll(".schematic-channel-map strong")].map((element) => element.textContent?.trim()),
    signalKey: [...document.querySelectorAll(".schematic-signal-key li")].map((element) => element.textContent?.replace(/\s+/g, " ").trim()),
    tableRows: document.querySelectorAll("tbody tr").length,
    modes: [...document.querySelectorAll('[role="group"][aria-label="Model view"] button')].map((button) => button.textContent?.trim()),
    selectedChannel: document.querySelector(".channel-id")?.textContent?.trim(),
    selectedComparison: document.querySelector(".measurement-comparison")?.textContent?.replace(/\s+/g, " ").trim(),
    globalResult: document.querySelector("#result-title")?.textContent?.trim(),
    globalExceeded: document.querySelector(".global-exceeded-note")?.textContent?.replace(/\s+/g, " ").trim(),
    scoreCaveatVisible: document.body.innerText.includes("not physical health, fault probability, or remaining useful life"),
    productTruth: {
      controlled: document.body.innerText.includes("CONTROLLED DEMO"),
      perWindowRms: document.body.innerText.includes("per-window RMS"),
      fixedReference: document.body.innerText.includes("fixed reference"),
      strictUpper: document.body.innerText.includes("Upper mean + kσ comparison") &&
        document.body.innerText.includes("Above upper demo threshold"),
      amplifiedNotReconstructed: document.body.innerText.includes("motion visually amplified; not reconstructed from sensor data"),
      educationalBoundary: document.body.innerText.includes("not certified for safety-critical industrial use"),
    },
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  await capture(fallback, "loop3-no-webgl-full.png", {
    loop: 3,
    viewport: { width: 1200, height: 900 },
    facts: fallbackFacts,
  }, { fullPage: true });
  await finishPage(fallback, fallbackSetup.evidence);
  await fallbackSetup.context.close();

  const zoomViewport = { width: 640, height: 450 };
  const zoomSetup = await createContext("loop3-zoom-200-proxy", {
    viewport: zoomViewport,
    deviceScaleFactor: 2,
  });
  const zoom = await openPage(
    zoomSetup.context,
    zoomSetup.evidence,
    "/?scenario=controlled-deviation-v1&step=0.7058823529411765",
  );
  const zoomFacts = await zoom.evaluate(() => ({
    method: "640x450 CSS viewport at DPR 2; reflow proxy, not native browser zoom",
    viewportWidth: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    statusVisible: Boolean(document.querySelector("#result-title")),
    status: document.querySelector("#result-title")?.textContent?.trim(),
    localTableScroll: (() => {
      const wrapper = document.querySelector(".table-scroll");
      return wrapper ? wrapper.scrollWidth > wrapper.clientWidth : null;
    })(),
  }));
  await capture(zoom, "loop3-zoom-200-proxy-full.png", {
    loop: 3,
    viewport: zoomViewport,
    facts: zoomFacts,
  }, { fullPage: true });
  await finishPage(zoom, zoomSetup.evidence);
  await zoomSetup.context.close();

  const resilienceSetup = await createContext("loop3-context-loss-recovery", { viewport: { width: 1200, height: 900 } });
  const resilience = await openPage(resilienceSetup.context, resilienceSetup.evidence, "/");
  const contextLoss = await resilience.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { dispatched: false, prevented: false };
    const event = new Event("webglcontextlost", { bubbles: false, cancelable: true });
    return { dispatched: true, prevented: !canvas.dispatchEvent(event) };
  });
  await resilience.waitForTimeout(250);
  const fallbackAfterLoss = await resilience.evaluate(() => ({
    canvases: document.querySelectorAll("canvas").length,
    fallbackVisible: Boolean(document.querySelector('[data-testid="webgl-fallback"]')),
  }));
  const recoveryMounts = [];
  for (let index = 0; index < 3; index += 1) {
    await resilience.reload({ waitUntil: "networkidle" });
    await resilience.waitForTimeout(850);
    recoveryMounts.push(await resilience.evaluate(() => ({
      canvases: document.querySelectorAll("canvas").length,
      hosts: document.querySelectorAll('[data-testid="scene-host"]').length,
      metrics: (() => {
        const raw = document.querySelector('[data-testid="scene-host"]')?.getAttribute("data-renderer-metrics");
        return raw ? JSON.parse(raw) : null;
      })(),
    })));
  }
  await finishPage(resilience, resilienceSetup.evidence);
  await resilienceSetup.context.close();

  const desktopPerformance = await performanceProbe(
    "loop3-performance-desktop",
    { viewport: { width: 1440, height: 900 } },
    45,
  );
  const mobilePerformance = await performanceProbe(
    "loop3-performance-mobile",
    { viewport: mobileViewport, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    30,
  );

  results.assertions.loop3 = {
    desktop1440,
    desktop1280,
    focusFacts,
    mobile: {
      overviewFacts: mobileOverviewFacts,
      explodedFacts: mobileExplodedFacts,
      touchFacts,
      overviewMetrics: mobileOverviewMetrics,
      explodedMetrics: mobileExplodedMetrics,
      restoredMetrics: mobileRestoredMetrics,
      realInteraction: mobileRealInteraction,
    },
    reduced: { facts: reducedFacts, before: reducedBefore, after: reducedAfter },
    fallback: fallbackFacts,
    zoom: zoomFacts,
    resilience: { contextLoss, fallbackAfterLoss, recoveryMounts },
    performance: { desktop: desktopPerformance, mobile: mobilePerformance },
  };

  results.assertions.loop3Acceptance = {
    desktop1440: !desktop1440.facts.horizontalOverflow && desktop1440.facts.canvasCount === 1 &&
      rendererWithin(desktop1440.metrics, { calls: 100, triangles: 250000, dpr: 2 }) &&
      desktop1440.metrics.activeAnimationReasons.length === 0 && desktop1440.metrics.restorationError === 0,
    desktop1280: !desktop1280.facts.horizontalOverflow && desktop1280.facts.canvasCount === 1 &&
      rendererWithin(desktop1280.metrics, { calls: 100, triangles: 250000, dpr: 2 }) &&
      desktop1280.metrics.activeAnimationReasons.length === 0 && desktop1280.metrics.restorationError === 0,
    keyboardFocus: focusFacts?.className?.includes("primary-action") &&
      focusFacts.outlineStyle === "solid" && Number.parseFloat(focusFacts.outlineWidth) >= 3,
    mobileOverview: !mobileOverviewFacts.horizontalOverflow && mobileOverviewFacts.canvasCount === 1 &&
      rendererWithin(mobileOverviewMetrics, { calls: 60, triangles: 100000, dpr: 1.5 }),
    mobileExploded: rendererWithin(mobileExplodedMetrics, { calls: 60, triangles: 100000, dpr: 1.5 }) &&
      mobileExplodedMetrics.activeAnimationReasons.length === 0 &&
      mobileExplodedFacts.scrollY === 0 && mobileExplodedFacts.canvasMode === "exploded-signal",
    mobileTouchTargets: touchFacts.below44.length === 0,
    mobileRealInteraction: mobileRealInteraction.station === "B4" &&
      mobileRealInteraction.mode === "inspect-station" &&
      mobileRealInteraction.pressed === "station-control-B4",
    mobileRestoration: mobileRestoredMetrics.restorationError === 0 &&
      mobileRestoredMetrics.activeAnimationReasons.length === 0,
    reducedMotion: reducedFacts.mediaMatches && reducedFacts.machinePlaybackDisabled &&
      reducedFacts.journeyPlaybackDisabled && reducedFacts.modeNoteVisible &&
      reducedBefore.activeAnimationReasons.length === 0 && reducedAfter.activeAnimationReasons.length === 0 &&
      !reducedFacts.horizontalOverflow,
    noWebglParity: fallbackFacts.canvasCount === 0 && fallbackFacts.fallbackVisible &&
      fallbackFacts.schematicStations.length === 4 && fallbackFacts.channelMap.length === 4 &&
      fallbackFacts.signalKey.length === 5 && fallbackFacts.tableRows === 8 &&
      fallbackFacts.selectedChannel === "B4_Y" && fallbackFacts.globalResult === "Demo threshold exceeded" &&
      fallbackFacts.globalExceeded === "Above upper demo threshold: B1_X" &&
      Object.values(fallbackFacts.productTruth).every(Boolean) && fallbackFacts.scoreCaveatVisible &&
      !fallbackFacts.horizontalOverflow,
    zoomReflowProxy: !zoomFacts.horizontalOverflow && zoomFacts.statusVisible,
    contextLossRecovery: contextLoss.dispatched && contextLoss.prevented &&
      fallbackAfterLoss.canvases === 0 && fallbackAfterLoss.fallbackVisible &&
      recoveryMounts.every(({ canvases, hosts, metrics }) => canvases === 1 && hosts === 1 &&
        metrics?.activeAnimationReasons.length === 0 && metrics?.restorationError === 0),
    desktopFrameMinimum: desktopPerformance.pacing.fps >= 45,
    mobileFrameMinimum: mobilePerformance.pacing.fps >= 30,
  };
}

async function runInteractionStress() {
  const viewport = { width: 1440, height: 900 };
  const { context, evidence } = await createContext("interaction-stress", { viewport });
  const page = await openPage(context, evidence, "/");

  const parity = [];
  for (const station of ["B1", "B2", "B3", "B4"]) {
    await page.getByRole("button", { name: new RegExp(`${station} Bearing`) }).click();
    for (const axis of ["X", "Y"]) {
      await page.getByRole("button", { name: `${axis} direction` }).click();
      parity.push(await page.evaluate(() => ({
        station: document.querySelector('[id^="station-control-"][aria-pressed="true"]')?.id,
        axis: document.querySelector('[role="group"][aria-label="Measurement direction"] [aria-pressed="true"]')?.textContent?.trim(),
        channel: document.querySelector(".channel-id")?.textContent?.trim(),
        breadcrumb: document.querySelector(".machine-breadcrumb")?.textContent?.replace(/\s+/g, " ").trim(),
      })));
    }
  }

  for (let cycle = 0; cycle < 20; cycle += 1) {
    await page.getByRole("button", { name: "Exploded signal" }).click();
    await page.getByRole("button", { name: cycle % 2 === 0 ? /B4 Bearing/ : /B1 Bearing/ }).click();
    await page.getByRole("button", { name: "Overview", exact: true }).click();
  }
  await page.waitForTimeout(850);
  const lifecycle = await page.evaluate(() => ({
    canvasCount: document.querySelectorAll("canvas").length,
    selectedMode: document.querySelector('[role="group"][aria-label="Model view"] [aria-pressed="true"]')?.textContent?.trim(),
    metrics: (() => {
      const raw = document.querySelector("[data-renderer-metrics]")?.getAttribute("data-renderer-metrics");
      return raw ? JSON.parse(raw) : null;
    })(),
  }));

  const remounts = [];
  for (let index = 0; index < 5; index += 1) {
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    remounts.push(await page.evaluate(() => ({
      canvases: document.querySelectorAll("canvas").length,
      sceneHosts: document.querySelectorAll('[data-testid="scene-host"]').length,
    })));
  }

  await finishPage(page, evidence);
  await context.close();
  results.assertions.interactionStress = { parity, lifecycle, remounts };
  return { parity, lifecycle, remounts };
}

function evidenceFailures() {
  const failures = [];
  for (const context of results.contexts) {
    for (const field of [
      "consoleErrors",
      "pageErrors",
      "unhandledRejections",
      "requestFailures",
      "badResponses",
      "externalRequests",
    ]) {
      if (context[field].length > 0) failures.push({ context: context.name, field, values: context[field] });
    }
  }
  return failures;
}

try {
  if (qaLoop === "loop1") {
    await runLoop1();
  } else if (qaLoop === "loop2") {
    await runLoop2();
  } else if (qaLoop === "loop3") {
    await runLoop3();
  } else {
    await runLoop1();
    await runCoreLoop2();
    await runLoop3();
    await runInteractionStress();
  }
} finally {
  await browser.close();
}

results.failures = evidenceFailures();
if (qaLoop === "loop2") {
  for (const [name, passed] of Object.entries(results.assertions.loop2Acceptance ?? {})) {
    if (!passed) results.failures.push({ context: "loop2-acceptance", field: name, values: ["failed"] });
  }
}
if (qaLoop === "loop3") {
  for (const [name, passed] of Object.entries(results.assertions.loop3Acceptance ?? {})) {
    if (!passed) results.failures.push({ context: "loop3-acceptance", field: name, values: ["failed"] });
  }
}
await writeFile(
  resolve(
    outputDirectory,
    qaLoop === "loop1"
      ? "qa-loop1-results.json"
      : qaLoop === "loop2"
        ? "qa-loop2-results.json"
        : qaLoop === "loop3"
          ? "qa-loop3-results.json"
        : "qa-results.json",
  ),
  `${JSON.stringify(results, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(results, null, 2));
if (results.failures.length > 0) process.exitCode = 1;
