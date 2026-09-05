"""Render PDF pages to a new directory. Rendering does not perform a review."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys


def render(pdf: Path, out: Path, dpi: int = 120) -> dict:
    try:
        import fitz
    except ImportError as error:
        raise ValueError("Install PyMuPDF in the Python environment used for this command") from error
    if not 60 <= dpi <= 300:
        raise ValueError("Choose a DPI between 60 and 300")
    pdf = pdf.resolve(strict=True)
    with fitz.open(pdf) as document:
        if document.needs_pass:
            raise ValueError("A password-protected PDF must be unlocked first")
        out.mkdir(parents=True, exist_ok=False)
        for number, page in enumerate(document, 1):
            page.get_pixmap(dpi=dpi, alpha=False).save(out / f"page-{number:03d}.png")
        record = {"pdf": pdf.name, "page_count": len(document), "dpi": dpi,
                  "renderer": f"PyMuPDF {fitz.VersionBind}", "visual_review": "not performed"}
    (out / "render.json").write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    return record


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--dpi", type=int, default=120)
    args = parser.parse_args()
    try:
        record = render(args.pdf, args.out, args.dpi)
        print(f"Rendered {record['page_count']} pages to {args.out}; inspect the images before recording a review.")
    except (OSError, ValueError, RuntimeError) as error:
        print(error, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
