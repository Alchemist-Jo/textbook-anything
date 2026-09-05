"""Build a local XeLaTeX document and keep compiler output beside the PDF."""
from __future__ import annotations

import argparse
from pathlib import Path
import shutil
import subprocess
import sys


def build(source: Path, out: Path) -> Path:
    source = source.resolve(strict=True)
    if source.suffix.lower() != ".tex":
        raise ValueError("The source must be a .tex file")
    compiler = shutil.which("xelatex")
    if compiler is None:
        raise ValueError("XeLaTeX is required; install a TeX distribution first")
    out = out.resolve()
    if out == source.parent:
        raise ValueError("Use a separate output directory to keep sources intact")
    out.mkdir(parents=True, exist_ok=True)
    command = [compiler, "-no-shell-escape", "-interaction=nonstopmode",
               "-halt-on-error", "-file-line-error", f"-output-directory={out}", source.name]
    for number in (1, 2):
        result = subprocess.run(command, cwd=source.parent, capture_output=True,
                                text=True, errors="replace", timeout=180)
        log = out / f"compile-{number}.txt"
        log.write_text(result.stdout + result.stderr, encoding="utf-8")
        if result.returncode:
            raise ValueError(f"XeLaTeX failed; see {log}")
    pdf = out / f"{source.stem}.pdf"
    if not pdf.is_file():
        raise ValueError("The compiler did not produce a PDF")
    return pdf


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    try:
        print(build(args.source, args.out))
    except (OSError, ValueError, subprocess.TimeoutExpired) as error:
        print(error, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
