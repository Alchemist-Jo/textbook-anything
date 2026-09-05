# Local helpers

Run these commands from the repository root with Python 3.10 or newer. Reading and using the skill itself requires none of these dependencies.

## Check the package and examples

```sh
python3 scripts/check_skill.py
python3 -m unittest discover -s examples/tests -v
```

The checker verifies identity and local Markdown link targets. The numerical tests exercise the supplied GAE, attention, and Gaussian-flow examples. Both use the Python standard library.

## Build a PDF

```sh
python3 scripts/build_pdf.py examples/gae/main.tex --out build/gae
python3 scripts/build_pdf.py examples/attention-flow/main.tex --out build/attention-flow
```

Install a TeX distribution with XeLaTeX first. The Chinese examples use `ctex`, Fandol, TikZ, and `tcolorbox`, available in a full TeX Live installation. The script runs two compilation passes for cross-references, disables shell escape, and saves compiler output in the chosen build directory. Projects using a bibliography processor or a different engine should use their own build commands.

Output files are named after the input: `main.tex` produces `main.pdf`. Rebuilding replaces generated files in that output directory. Read the compiler logs for warnings and inspect the PDF before delivery.

For a new Chinese handout, copy [templates/main.tex](../templates/main.tex) and [templates/textbook-style.tex](../templates/textbook-style.tex) into the project, set the title, and create `chapter.tex` and `solutions.tex` alongside them. The style uses Fandol for Chinese and TeX Gyre Pagella for Latin text and mathematics. See [typography](../references/typography.md) for the layout choices. Use a different document class for another language or format.

## Render a PDF

Install PyMuPDF into your chosen Python environment if needed:

```sh
python3 -m pip install PyMuPDF
python3 scripts/render_pdf.py build/gae/main.pdf --out build/gae-pages
```

Use a new output directory for each render. The command writes one PNG per page and a short `render.json` record. It does not mark pages as reviewed. You can also render an existing PDF without installing TeX.
