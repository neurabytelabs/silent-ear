# Asset and dependency licenses

## Visual and media assets

| Asset | Source | License / ownership | Use |
|---|---|---|---|
| Conveyor frame, belt, drums, idlers, motor, reducer, coupling, carriers, four bearing stations, sensors, station flags, signal layers, grid and lighting | Original procedural geometry created in repository source | Project MIT license | WebGL conveyor test-cell explanation |
| RMS timeline and state graphics | Original HTML/CSS/SVG generated from versioned fixture data | Project MIT license | Semantic visual explanation |
| Complete no-WebGL conveyor schematic | Original repository HTML/CSS/SVG | Project MIT license | Four-station/eight-channel semantic fallback |
| Silent-Ear favicon | Original repository SVG | Project MIT license | Browser tab identity |
| Typography | Local operating-system font stack only | No bundled font asset | Interface text |
| Textures, photographs, audio, recordings | None | Not applicable | No runtime use |

No third-party model, texture, image, font, icon pack, audio file, or CDN runtime asset is used by the new product experience.

## Runtime dependencies

| Package | Role | License |
|---|---|---|
| React / React DOM | Semantic UI composition | MIT |
| Three.js | WebGL scene and procedural geometry | MIT |

## Development-only dependencies

Vite, TypeScript, Vitest, Testing Library, ESLint, jsdom, Playwright (local screenshot QA only), and their pinned transitive packages are used only to build, lint, type-check, test, and capture local evidence. Their package metadata and license texts remain available under local `node_modules/` after installation; they are not copied into the browser as standalone media assets. `package-lock.json` records the exact resolved inventory.

## Network policy

The production browser bundle must load only same-origin `index.html` and hashed assets emitted under `static/assets/`, plus same-origin Rust endpoints when explicitly inspected. Verification must fail on unexpected cross-origin requests. The final local build does not emit a source map.
