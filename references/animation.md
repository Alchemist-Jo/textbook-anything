# Explanatory animation

Read for stages, data flow, sampling or parameter effects. First state what the reader changes, what becomes visible and what the reader should be able to explain.

## Choose an explanatory relationship

- Stage highlighting follows the current input, operation, state and output.
- Flow follows the actual direction of data or control.
- Parameter controls update geometry, numbers and interpretation from one calculation.
- Sampling shows the distribution, parameters, sample count and accumulated statistic, distinguishing simulation from measurement.
- Comparisons use the same inputs and comparable scales.

Ask the observation question before the demonstration and interpret the decisive change afterwards. A static relationship can remain static.

## Keep one state calculation

Calculate state once and make the graph, labels, numbers and explanation read it. State which information persists when an input changes. Reset the process when the changed condition invalidates the old state.

Moving arrows may indicate order; speed indicates runtime only when a valid time model supports that interpretation. Compute values from stated rules. Identify schematic or simulated data rather than presenting them as experimental outcomes.

For the supplied decay example, templates/decay-model.js calculates the curve, selected point, derivative and endpoint. templates/tutorial.js handles controls and playback.

## Playback and accessibility

Start from a readable static state. Provide play/pause, manual steps or time selection, reset and replay. Stop at the endpoint. A manual parameter or stage change pauses automatic progression.

Pause when the relevant region or page is hidden. Resume only through the reader's action. Automatic demonstrations, when needed, play once in a visible region with a pause control.

Respect prefers-reduced-motion. Preserve static comparisons, full explanations and solutions. No key claim may depend on a brief flash.

Check the initial state, a decisive intermediate state, endpoints, pause, reset and changed parameters. Calculation tests and isolated DOM event tests verify logic; browser inspection establishes actual appearance and interaction. Report their scopes separately.
