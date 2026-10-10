# Visual design and rendered inspection

Read before designing a page, changing a theme, drawing a figure, or accepting a built HTML file. The rules apply to the lesson theme (`assets/lesson.css`), the paper reading theme (`assets/reading.css`) where it ships, and any style a user supplies. A user's reference design decides the look. The invariants below still hold inside it.

## Keep a design ledger

Before writing components, record the page's design values in a short working note outside the page:

- language, reading measure and body size
- the six text sizes and the role of each
- colour roles, the accent hue and the caution hue
- figure label size in source units and the scale at which each figure will render
- the widths to inspect, normally 1440 and 390, and whether print is delivered

Every new component takes its values from the ledger. A value that is missing gets added to the ledger first, with its role, so the page never accumulates one-off sizes or colours. When a user supplies a reference page, measure its sizes and colours into the ledger instead of approximating them.

## Type scale

A page uses at most six text sizes per width across prose, secondary text and headings. Figures and formulas are counted separately. `scripts/render-audit.mjs` counts the rendered sizes and fails above six.

The lesson theme ships this scale:

| Role | 1440 | 390 | Used by |
| --- | --- | --- | --- |
| small | 13px | 13px | section labels, metadata, table headers, footers, badges |
| ui | 15px | 15px | navigation, figure captions, code, tables, controls |
| body | 18px | 17px | paragraphs and lists |
| lead and h3 | 21px | 19px | opening paragraph, subsection headings |
| h2 | 40px | 29px | section headings |
| h1 | 66px | 39px | title |

The reading theme uses 13, 15 and 16px for small, ui and body text, 18.5px for subsection headings, and clamped section and title sizes.

New text picks a size from the scale through `var(--fs-small)`, `var(--fs-ui)` or a heading rule. Emphasis inside a size uses weight or colour. Relative units inside a nested element are the usual way an extra size appears: `.82em` inside 15px text renders at 12.3px, a seventh size that is also below the minimum. Use the scale variables instead.

Body text keeps a line height of 1.7 to 1.85. Headings use 1.25 to 1.35. Headings, figure captions and short labels use `text-wrap: balance`, and paragraphs use `text-wrap: pretty`, so a line does not end with one stranded character or word. Headings state their content. A heading never takes the form of a question.

## Measure and alignment

Text sits in one reading column. In Chinese the column holds about 36 characters at 18px, which is 648px. In English it holds about 70 Latin characters, which is 576px. The lesson theme sets this through `--measure`, and `html:lang(en)` switches the value.

Paragraphs, figures, tables, callouts and panels share the same left and right edges inside the column. The opening hero may span the page width. Inside the column, a component that needs more width scrolls locally (see the narrow-screen rules) rather than breaking the edge.

## Spacing and grouping

Space shows which items belong together. The space above a heading is larger than the space below it, so the heading attaches to the text it introduces. The lesson theme uses 40px above and 14px below an h3. Items in one group sit closer to each other than to the next group. Use the spacing values already present in the theme. A new gap value goes into the ledger with its role.

Cards hold parallel items, an input with its output, a sequence of stages, or an exercise. Continuous explanation stays in paragraphs. Callouts carry three kinds of content: a core claim, background the reader needs, and a common misunderstanding. A section can hold several callouts when it has several such signals, and none when it has none. Figures sit outside callouts, so a callout never carries an image.

## Colour roles and the accent budget

Colour carries meaning, and each colour keeps one meaning across prose, figures and controls. The lesson theme defines these roles:

| Variable | Value | Meaning |
| --- | --- | --- |
| `--ink` | #233149 | text |
| `--muted` | #586b83 | secondary text |
| `--accent` | #355da5 | links, the current state, the focal object |
| `--warm` | #8b542a | a changed condition or a caution |
| `--dark` | #0e1d35 | the opening, code and mechanism panels |
| `--figure-*` | several | nodes, strokes, arrows and labels inside dark figures |

The accent budget is one accent hue and one caution hue. A third hue enters only when a figure needs categorical colours, and then a categorical palette such as ColorBrewer applies. Sequential data uses a perceptually ordered map such as viridis. Every colour-coded difference also has a second encoding: a label, a line style, a marker shape or a position.

Gradients, glows, grids and arcs belong to the opening background only. They stay static and never sit behind body text. Reading cards share one shadow style. Hierarchy comes from size, weight, spacing and position, never from heavier shadows or 3D effects.

## Contrast

Text meets WCAG AA against the pixels actually behind it:

- 4.5:1 for normal text
- 3:1 for large text, which is at least 24px, or at least 18.66px in bold
- 3:1 for non-text marks that carry meaning, such as focus rings, control borders and plotted lines

Disabled controls are exempt. The audit hides the text, captures the background, and measures each text box against the median of the pixels behind it, so gradients and images are measured as they render.

Small accent labels fail first. The forest reading theme's accent #c16736 measured 3.5 to 4.0:1 at 13px against its tinted panels. Darkening it to #a2572d reached 4.69:1 without changing the theme's character. Fix contrast by darkening the foreground or lightening the panel. Never fix it by enlarging the text into another size of the scale.

## Figures at their rendered size

Inline SVG text renders at its font size multiplied by the SVG's scale on screen. A 900-unit-wide `viewBox` shown in a 342px column scales by 0.38, so a label written at 14 units renders at 5.3px. Judge every label at its rendered size:

- at 390, every figure label is at least 12px
- at 1440, labels fall between the small size and slightly above the body size, about 13 to 20px; labels larger than the section headings compete with them
- labels never overlap each other and never cross the figure's edge

When a figure fails at 390, apply these repairs in order and stop at the first that works:

1. Enlarge the labels in the source and shorten their wording.
2. Reflow the figure: stack its panels vertically, or provide a narrow layout of the same diagram.
3. Let the figure scroll inside its own box, with a `min-width` that keeps labels at 12px or more and a visible scroll hint.
4. Split it into several figures that each answer part of the question.

These moves are never allowed: text below 12px, text converted to an image to escape the check, labels deleted to make room, and a figure that makes the whole page scroll sideways.

Raster figures are displayed at no more than their natural width, because enlarging a raster blurs it. Crop an original paper figure to the panel the text discusses. The audit cannot read text inside a raster image, so inspect it in the screenshots. When its smallest text is unreadable at 390, crop further or redraw the relationship and credit the original.

A figure states one relationship. Its labels use the prose's terms, its arrows have a stated meaning, and its caption begins with what the reader should notice. A data figure keeps its axes, units, scale and comparison conditions, and bars start at zero. A static illustration never imitates navigation, such as numbered chapter lists or selected-tab styling.

## Interaction and motion

Interaction exists to compare conditions, follow a state through stages, or relate a parameter to a result. Use [animation](animation.md) for the state model. The rendered requirements are:

- motion starts from a user action, can pause, step and reset, and stops when it scrolls out of view
- `prefers-reduced-motion` disables automatic playback and leaves manual stepping
- the page teaches the same relationship with scripts disabled
- controls have labels, a visible focus ring, and touch targets of at least 24 by 24px; primary controls use 44px

## Narrow screens and print

At 390 the reading order is explanation, figure, controls, result. The page never scrolls sideways. Wide tables, code blocks, display formulas and figures with a `min-width` scroll inside their own box. Sticky navigation leaves headings visible after a jump, which `scroll-padding-top` handles.

When print is delivered, every hint, solution and source list prints open, and `assets/lesson.js` restores the reader's disclosure state afterwards. Interactive figures print their static state. Navigation, the skip link, progress bars and copy buttons are hidden. The hero, diagram panels and code blocks carry light text on dark ground, so they keep their backgrounds with `print-color-adjust: exact`; browsers drop background graphics by default, and the text would vanish on white paper. The print rules also remove `backdrop-filter`, which left the hero figure blank in Chrome's print output. Callouts, figures and table rows stay on one page, and a section label and its heading stay with the text that follows. Inspect the printed PDF separately from the screen.

## Notes, sources and captions

Cite a source with a short marker at the first claim it supports, and reuse the marker afterwards. The full source list and production notes go in a closed disclosure at the end. Figure conditions and video timestamps stay visible next to the figure. Production records, check results and tool names stay out of the reader's text.

## Shipped themes and fonts

The lesson theme has a dark blue opening above white reading cards on a light blue-grey page. Chinese text uses Fandol Song for prose, Fandol Hei for headings and figure labels, and Fandol Fang for code, embedded as WOFF2 subsets. Latin text uses Times New Roman for prose, Arial for headings and labels, and the system monospace for code. KaTeX or native MathML sets formulas.

The reading theme uses a system sans-serif at 16px and offers four palettes: forest, cobalt, plum and saffron. Each palette's accent and secondary colours meet 4.5:1 on its own panels.

## Inspect the rendered page

A successful build proves only that the file was written. Acceptance comes from the rendered page.

1. Build the HTML file.
2. Run `node scripts/render-audit.mjs page.html --widths 1440,390 --out audit/`. Add `--print` when print is delivered. The script needs Node 22 or later and a local Chrome or Chromium.
3. Read the report. Exit status 1 means at least one defect: page overflow, more than six text sizes, text below 12px, contrast below WCAG AA, overlapping or clipped figure labels, a broken or enlarged image, raw Markdown or TeX in visible text, or an internal link without a target. Each hit names its selector and screenshot tile.
4. Open every tile and the overview at both widths with the image viewer. Look at what the script cannot measure: alignment to the column, stranded characters, competing emphasis, figure crops, uneven spacing, empty regions, and text inside raster images and frames.
5. When print is delivered, open the pages of `print.pdf`.
6. Repair each defect at its source, rebuild, rerun the audit, and reopen the affected tiles.

Headless Chrome clamps a window narrower than 500px to 500px, so a screenshot taken with `--window-size=390` shows the 500px layout. The audit sets the true width through the DevTools protocol. A full-page capture paints a fixed background only in the first viewport, so the audit switches backgrounds to scroll before capturing.

Label each item in the inspection note as unchecked, checked or repaired. Mark an item checked only after its tile or page has been opened.
