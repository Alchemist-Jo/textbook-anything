"""Print a local HTML tutorial to PDF, checking assets, fonts, and math readiness."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys


def build(source: Path, output: Path) -> Path:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as error:
        raise ValueError("Install Playwright in the project environment; see references/environment.md") from error
    source = source.resolve(strict=True)
    if source.suffix.lower() not in {".html", ".htm"}:
        raise ValueError("The source must be an HTML file")
    output = output.resolve()
    if output.suffix.lower() != ".pdf":
        raise ValueError("Choose a .pdf output path")
    failures = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page()
            page.on("requestfailed", lambda request: failures.append(request.url))
            page.on("response", lambda response: failures.append(response.url) if response.status >= 400 else None)
            page.on("pageerror", lambda error: failures.append(str(error)))
            page.goto(source.as_uri(), wait_until="networkidle", timeout=45000)
            page.evaluate("""async () => {
              await document.fonts.ready;
              if (window.MathJax && window.MathJax.startup) await window.MathJax.startup.promise;
              if (window.MathJax && window.MathJax.typesetPromise) await window.MathJax.typesetPromise();
              document.querySelectorAll('details').forEach(node => { node.open = true; });
            }""")
            broken = page.evaluate("Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src'))")
            if failures or broken:
                raise ValueError("Fix missing assets or page errors before export: " + "; ".join(failures + broken))
            output.parent.mkdir(parents=True, exist_ok=True)
            page.pdf(path=str(output), format="A4", print_background=True, prefer_css_page_size=True)
        finally:
            browser.close()
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    try:
        print(build(args.source, args.out))
    except Exception as error:
        print(str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
