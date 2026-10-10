# Local helpers

Run these commands from the repository root with Python 3.10 or newer. The agent first checks the available tools and installs missing dependencies in an appropriate environment, following [environment and formats](../references/environment.md). Reading and using the skill itself requires no companion skill.

## Check the package and examples

```sh
python3 scripts/check_skill.py
python3 -m unittest discover -s examples/tests -v
python3 -m unittest discover -s tests -v
```

The checker verifies identity and local Markdown link targets. The numerical tests exercise the supplied GAE, attention, and Gaussian-flow examples. Both use the Python standard library.

## Build a PDF

```sh
python3 scripts/build_pdf.py examples/gae/main.tex --out build/gae
python3 scripts/build_pdf.py examples/attention-flow/main.tex --out build/attention-flow
```

For this route, prepare a TeX distribution with XeLaTeX first. The Chinese examples use `ctex`, Fandol, TikZ, and `tcolorbox`, available in a full TeX Live installation. The script runs two compilation passes for cross-references, disables shell escape, and saves compiler output in the chosen build directory. Projects using a bibliography processor or a different engine should use their own build commands.

Output files are named after the input: `main.tex` produces `main.pdf`. Rebuilding replaces generated files in that output directory. Read the compiler logs for warnings and inspect the PDF before delivery.

For a new Chinese handout, copy [templates/main.tex](../templates/main.tex) and [templates/textbook-style.tex](../templates/textbook-style.tex) into the project, set the title, and create `chapter.tex` and `solutions.tex` alongside them. The style uses Fandol for Chinese and TeX Gyre Pagella for Latin text and mathematics. See [typography](../references/typography.md) for the layout choices. Use a different document class for another language or format.

## Render a PDF

If PyMuPDF is missing, install it in the project environment before rendering:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install PyMuPDF
.venv/bin/python scripts/render_pdf.py build/gae/main.pdf --out build/gae-pages
```

Use a new output directory for each render. The command writes one PNG per page and a short `render.json` record. It does not mark pages as reviewed. You can also render an existing PDF without installing TeX.

## HTML with the same teaching depth

The worked source is templates/tutorial.html, with native MathML, editable SVG, rate and model-time controls, and printable solutions. Shared assets provide the reading and presentation layout and embedded Fandol font subsets.

Prepare Node 20+ and a Python environment, then build an offline standalone file:

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-html.txt
SKILL_HTML_PYTHON=.venv/bin/python node scripts/build-html.mjs templates/tutorial.html build/tutorial.html
npm test
~~~

The tests check calculations, isolated DOM events and asset embedding. They do not establish browser appearance. Inspect the permitted final rendering and narrow layout separately. The ready-made example is examples/field-entry/interactive.html.

When PDF export is requested and the environment permits its browser renderer, the existing helper can export the built HTML:

~~~sh
.venv/bin/python -m pip install playwright
.venv/bin/python -m playwright install chromium
.venv/bin/python scripts/build_html_pdf.py build/tutorial.html --out build/tutorial.pdf
~~~

The exporter waits for fonts and math, expands solutions and rejects missing assets. Respect access policies; an unavailable export is reported accurately without blocking the working HTML delivery.

## Inspect the rendered HTML

With Node 22 or newer and a local Chrome or Chromium, render the built file at true phone and desktop widths:

~~~sh
node scripts/render-audit.mjs build/tutorial.html --widths 1440,390 --out build/audit/tutorial --print
~~~

The script saves screenshot tiles, an overview per width, `report.json` and, with `--print`, `print.pdf`. It exits with status 1 on page overflow, more than six text sizes, text below 12px, contrast below WCAG AA, overlapping or clipped figure labels, broken or enlarged images, raw Markdown or TeX, or an internal link without a target. Open the tiles afterwards; the script does not judge alignment, spacing or figure crops. See [visual design](../references/visual-design.md).

## Collect source figures

Resolve the article version first, then use either the arXiv source or an archive already supplied by the user:

```sh
python3 scripts/collect_paper_assets.py --arxiv 2507.18071v1 --out build/paper-source
python3 scripts/collect_paper_assets.py --archive paper-source.zip --out build/local-source
```

Use a new output directory. ZIP, TAR, compressed TAR, and single TeX or PDF sources are recognized. The helper preserves figure and TeX bytes, ignores executable files, and writes `inventory.json`. Image files are candidates: match them to the paper's captions and check their suitability and reuse rights before including selected assets in the tutorial ZIP. See [paper figures](../references/paper-figures.md).

The source-download command uses the network; local archive extraction and document helpers do not upload the user's material.
