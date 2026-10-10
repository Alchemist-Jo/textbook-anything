# Build a self-contained HTML tutorial

The existing worked starter is templates/tutorial.html with its local CSS and scripts. For a new layout, copy assets/lesson-template.html to an output directory and replace the marked template content.

## Setup and build

Use a project environment. Install declared Node dependencies and requirements-html.txt once, then build:

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs templates/tutorial.html build/tutorial.html
~~~

The Python used by Node must contain the font dependencies. Activate that environment or set SKILL_HTML_PYTHON to its executable.

The builder embeds local CSS, scripts, selected images and Fandol font subsets. It supports native MathML and data-tex formulas rendered with KaTeX. It moves inlined deferred helpers after the document body so they bind to existing elements.

## Source structure

Use one h1 and a few sections with h2 and unique IDs. A nav carrying data-toc is populated from those headings. Optional data-nav labels shorten navigation without changing headings.

Use skill:lesson.css and skill:lesson.js for shared resources. Other relative paths resolve from the source file's directory. The compiler works with ordinary classic local scripts; it does not bundle module imports or fetch remote assets.

Write formulas using a math element or data-tex. Explain their purpose and symbols in the prose. A display formula can use:

~~~html
<div class="math" data-tex="y = f(x)" data-display="true"></div>
~~~

Use semantic figures, captions, code listings and native details/summary for hints or solutions. Images can be PNG, JPEG, WebP, GIF or SVG. Diagrams may be inline SVG with a viewBox and title. Download chosen remote images before building.

Source references can link compact source-ref anchors to a final details.references block. Keep essential figure conditions and video times outside collapsed source notes.

## Verify and deliver

The builder rejects unfinished template markers, duplicate IDs, broken internal anchors, missing required resources and invalid LaTeX formulas. These checks do not establish content accuracy.

Run representative code or calculations and inspect the permitted final rendering. Test controls at meaningful values and preserve a static/print explanation. Respect browser or filesystem access policies and report uninspected visual evidence.

Deliver the standalone reading file first, followed by editable sources, exercises, answers and useful assets. Large original videos and development dependencies stay outside the learner's archive.
