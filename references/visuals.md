# Visual explanations with a purpose

Choose a visual by the question it answers. Variety is useful when the reader needs to see different relationships; it does not require every chapter to contain every chart type.

The quality standard is format-independent. In every output, the reader should be able to identify the objects, follow their relationships, read the labels, and connect the figure to the text. A fallback must preserve these functions and the surrounding explanation.

| Visual function | LaTeX or static document | HTML or interactive document |
| --- | --- | --- |
| Exact relationships and shapes | TikZ, included SVG/PDF, or a high-resolution exported diagram | SVG or an accessible canvas with a readable static alternative |
| A parameter's effect | Small multiples or selected curves with stated values | A control linked to the curve or geometry, plus an informative print state |
| A sequence of operations | Aligned stages or panels with captions | The same stages, optionally revealed step by step |
| Practice and feedback | Hints and solutions in separate, locatable sections | Expandable hints and solutions that remain accessible in print |

When converting formats, check every equation, figure, caption, and solution again. Do not replace a purposeful diagram with a text placeholder or flatten a derivation into an unlabelled screenshot. If an interaction is essential to the lesson, provide static comparisons that teach the same relationship in print.

| Learning question | Useful visual | What to check |
| --- | --- | --- |
| What must I understand first? | A concept or prerequisite map | Each connection has a reason and a direction. |
| How do the objects relate? | Geometry, a coordinate diagram, or a physical model | Coordinates, scale conventions, and assumptions agree with the explanation. |
| What happens at each operation? | Tensor blocks, a dataflow diagram, or aligned intermediate states | Shapes, axis meanings, and operations remain consistent. |
| How do two approaches differ? | A side-by-side schematic or compact comparison table | Both use comparable assumptions and the difference is visible. |
| What changes over time or iteration? | A trajectory, sequence of states, or convergence plot | The time direction, units, and sampled states are clear. |
| What does the evidence show? | An original paper figure or a plot from actual data | Source, conditions, baselines, and uncertainty are retained. |
| What happens when a parameter changes? | A slider with a linked curve, geometry, or numerical readout | The control changes a meaningful quantity and has a useful static print state. |
| Why does a plausible answer fail? | A counterexample, residual plot, or annotated incorrect step | The figure isolates the specific assumption or error. |

Use editable SVG, TikZ, or a plotting tool for precise diagrams. HTML can add accessible controls, hover details, small multiples, and step-by-step reveals. Keep a static explanation available so the tutorial still teaches when JavaScript is disabled or the page is printed.

## Compose a readable page

Give the main relationship visual priority. Separate the equation, objects, labels, and interpretation enough that they can be read in order. Place a figure close to the explanation that uses it. Captions should tell readers what to notice, rather than repeat the title.

Use a restrained palette with stable meanings across the tutorial. Distinguish categories with labels or line patterns as well as color. Keep mathematical labels readable at the final size. Balance a dense derivation with an explanatory diagram or example when it clarifies the argument, rather than surrounding every paragraph with a decorative card.

Original paper figures and teaching diagrams can complement one another: retain the authentic system overview, then isolate one difficult operation in a simpler diagram. Use [paper figures](paper-figures.md) to acquire and credit the originals.

## Preserve mathematical and empirical meaning

For matrix faces, map rows and columns consistently to height and width. Equal shapes should have equal geometry within a figure; transposition swaps the axes; a contraction uses the same shared dimension; partitioned blocks fit their parent. Explain batch, head, or time axes with panels or explicitly labeled depth.

Keep values, scores, probabilities, indices, and masks distinct. A selection diagram should show how a score becomes an index and how that index selects a value. For numerical plots, calculate the data or identify them as schematic. Never invent a paper's result to fill a chart.

## Check interaction and print

Test controls at their default and meaningful endpoint values, with keyboard input as well as a pointer. Labels and plotted data must update together. Reveal controls should leave complete answers available in print. Check mobile wrapping, figure clipping, contrast, and link targets.

Inspect the browser page and the exported PDF separately. A readable interactive layout can become a cramped print page; provide print rules and a static state that preserves the main lesson. See the [HTML starter](../templates/tutorial.html) for an example using local CSS, SVG, MathML, and a small parameter control.
