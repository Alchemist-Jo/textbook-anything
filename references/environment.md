# Environment and output formats

Prepare the environment before committing to a layout. A missing compiler should trigger installation or a format decision while the document is still easy to adapt.

## Detect, install, prove it works

Check the available Python or Node runtime, TeX engine, fonts, PDF tools, and browser renderer. Reuse a working environment. Test a small document containing the actual language, an equation, a figure, and a local asset; a version string alone does not prove the full route works.

Install missing tools through an official distribution or established package manager within the user's existing authorization. Prefer a project virtual environment for Python dependencies. Avoid replacing a working system Python or installing several large toolchains speculatively. If Python itself is missing, use the available runtime manager or system package manager first.

For the Python PDF helpers, a typical local setup is:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install pymupdf playwright
.venv/bin/python -m playwright install chromium
```

On Windows, use the virtual environment's `Scripts/python.exe`. On Linux, a browser may also need operating-system libraries; follow the installer's diagnostic and official setup instructions. See [Playwright's installation guide](https://playwright.dev/python/docs/intro). Do not install browser packages if an existing supported browser renderer already completes the task.

For LaTeX, use a working XeLaTeX distribution with the packages and fonts in the chosen template. Install missing TeX packages through that distribution's package manager. If TeX is absent, use the platform's supported TeX installer when the download, storage, permissions, and available task time make it practical. Confirm the package and font failures in a build log before choosing a repair.

The agent performs these steps. Do not stop at telling the user to install the environment. If a permission boundary requires action from the user, prepare the rest of the tutorial while keeping that specific dependency pending.

## When to change format

Attempt a relevant installation and, if needed, one targeted repair supported by the error. If permissions, network access, platform support, storage, or runtime restrictions still prevent the route from working, switch to an available route. Repeating the same failing command does not help.

HTML can support the full tutorial: a navigable reading layout, SVG figures, mathematical notation, expandable solutions, parameter controls, and a print stylesheet. Use the included [HTML starter](../templates/tutorial.html), [stylesheet](../templates/tutorial.css), and [interaction script](../templates/tutorial.js), or build a subject-appropriate layout from them. The starter works without downloaded JavaScript libraries and contains a small lesson to demonstrate the components.

Native MathML can display formulas without a network service. For a large TeX-heavy document, install and bundle a suitable math renderer if needed; do not leave the final copy dependent on a remote CDN without stating that requirement. Use SVG for editable diagrams and real computed values for plots. A static export must preserve the explanation and one informative state of each interaction.

## Deliver a working fallback

Open the HTML and check its navigation, math, figures, controls, and solutions. Test at both a normal desktop width and a narrow reading width. When PDF is requested and Chromium is available, use [the HTML PDF helper](../scripts/README.md). Inspect the print result as well as the browser page.

If PDF rendering is also unavailable, deliver the complete HTML bundle and state that PDF export remains unavailable. Do not reduce the tutorial to an outline, silently omit formulas, or claim that an unrendered file was checked. Keep all local CSS, scripts, images, and required fonts with the HTML in the ZIP.
