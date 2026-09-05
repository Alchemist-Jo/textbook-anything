"""Inventory figures and TeX from a local archive or a versioned arXiv source."""
from __future__ import annotations

import argparse
import gzip
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import tarfile
import tempfile
from urllib.request import Request, urlopen
import zipfile

FIGURES = {".pdf", ".png", ".jpg", ".jpeg", ".svg", ".eps", ".ps", ".webp"}
TEXT = {".tex", ".bib"}


def safe_name(name: str) -> Path:
    path = PurePosixPath(name)
    if path.is_absolute() or ".." in path.parts or "\\" in name or re.match(r"^[A-Za-z]:", name):
        raise ValueError(f"Unsafe archive path: {name}")
    return Path(*path.parts)


def collect(archive: Path, out: Path, source: str) -> dict:
    archive = archive.resolve(strict=True)
    if out.exists():
        raise ValueError("Use a new output directory")
    out.parent.mkdir(parents=True, exist_ok=True)
    figures, texts = [], []
    with tempfile.TemporaryDirectory(prefix=".paper-assets-", dir=out.parent) as work:
        stage = Path(work)

        def save(name, stream):
            rel = safe_name(name)
            if rel.suffix.lower() not in FIGURES | TEXT:
                return
            dest = stage / "source" / rel
            if dest.exists():
                raise ValueError(f"Duplicate archive path: {name}")
            dest.parent.mkdir(parents=True, exist_ok=True)
            with dest.open("wb") as target:
                shutil.copyfileobj(stream, target)
            (figures if rel.suffix.lower() in FIGURES else texts).append(
                {"original_path": rel.as_posix(), "file": "source/" + rel.as_posix()})

        if zipfile.is_zipfile(archive):
            kind = "zip"
            with zipfile.ZipFile(archive) as package:
                for member in package.infolist():
                    safe_name(member.filename)
                    if stat.S_ISLNK(member.external_attr >> 16):
                        raise ValueError("Archive links are not extracted")
                    if not member.is_dir():
                        with package.open(member) as stream:
                            save(member.filename, stream)
        elif tarfile.is_tarfile(archive):
            kind = "tar"
            with tarfile.open(archive) as package:
                for member in package:
                    safe_name(member.name)
                    if member.issym() or member.islnk():
                        raise ValueError("Archive links are not extracted")
                    if member.isfile():
                        with package.extractfile(member) as stream:
                            save(member.name, stream)
        else:
            with archive.open("rb") as stream:
                prefix = stream.read(4)
            opener = gzip.open if prefix[:2] == b"\x1f\x8b" else open
            with opener(archive, "rb") as stream:
                data = stream.read()
            import io
            if data.startswith(b"%PDF"):
                kind = "pdf_only"
                save("paper.pdf", io.BytesIO(data))
                figures.clear()  # A whole paper is not an isolated figure.
            elif b"\\documentclass" in data or b"\\begin{document}" in data:
                kind = "single_tex"
                save("paper.tex", io.BytesIO(data))
            else:
                raise ValueError("Source is not a supported archive, TeX document, or PDF")
        result = {"source": source, "source_kind": kind,
                  "figure_candidates": sorted(figures, key=lambda x: x["file"]),
                  "text_sources": sorted(texts, key=lambda x: x["file"]),
                  "selection": "Match candidates to captions and check reuse rights before delivery."}
        (stage / "inventory.json").write_text(json.dumps(result, indent=2) + "\n")
        stage.rename(out)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    inputs = parser.add_mutually_exclusive_group(required=True)
    inputs.add_argument("--archive", type=Path)
    inputs.add_argument("--arxiv", help="Versioned identifier, for example 2507.18071v1")
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.arxiv:
            if not re.fullmatch(r"(?:\d{4}\.\d{4,5}|[a-z-]+(?:\.[A-Z]{2})?/\d{7})v\d+", args.arxiv):
                raise ValueError("Resolve and supply the article's versioned arXiv identifier")
            url = "https://arxiv.org/src/" + args.arxiv
            request = Request(url, headers={"User-Agent": "textbook-anything/0.1 (+https://github.com/Alchemist-Jo/textbook-anything)"})
            with tempfile.TemporaryDirectory(prefix="paper-download-") as work:
                archive = Path(work) / "source"
                with urlopen(request, timeout=45) as response, archive.open("wb") as target:
                    shutil.copyfileobj(response, target)
                result = collect(archive, args.out, url)
        else:
            result = collect(args.archive, args.out, args.archive.name)
        print(f"Found {len(result['figure_candidates'])} figure candidates and {len(result['text_sources'])} text sources in {args.out}")
    except (OSError, ValueError, tarfile.TarError, zipfile.BadZipFile) as error:
        parser.exit(1, str(error) + "\n")


if __name__ == "__main__":
    main()
