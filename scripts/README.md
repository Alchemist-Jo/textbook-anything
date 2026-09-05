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

Copy `tutorial.html`, `tutorial.css`, and `tutorial.js` from [templates](../templates/tutorial.html) together into a project. They contain a small decay lesson with native MathML, editable SVG, a parameter control, and printable solutions. Open the HTML directly in a browser; it has no CDN dependency. Replace the sample content with the requested tutorial and retain the useful reading and print conventions.

To export PDF, prepare Playwright and Chromium in the project environment if they are missing:

```sh
.venv/bin/python -m pip install playwright
.venv/bin/python -m playwright install chromium
.venv/bin/python scripts/build_html_pdf.py templates/tutorial.html --out build/tutorial.pdf
```

The exporter waits for local assets, fonts, and an available MathJax renderer; it expands solutions and rejects missing assets or page errors before producing the PDF. Native MathML needs no additional math package. Inspect the browser and print results separately. When installation or rendering is unavailable, deliver the complete working HTML and its local assets with accurate export instructions.

## Collect source figures

Resolve the article version first, then use either the arXiv source or an archive already supplied by the user:

```sh
python3 scripts/collect_paper_assets.py --arxiv 2507.18071v1 --out build/paper-source
python3 scripts/collect_paper_assets.py --archive paper-source.zip --out build/local-source
```

Use a new output directory. ZIP, TAR, compressed TAR, and single TeX or PDF sources are recognized. The helper preserves figure and TeX bytes, ignores executable files, and writes `inventory.json`. Image files are candidates: match them to the paper's captions and check their suitability and reuse rights before including selected assets in the tutorial ZIP. See [paper figures](../references/paper-figures.md).

The source-download command uses the network; local archive extraction and document helpers do not upload the user's material.
