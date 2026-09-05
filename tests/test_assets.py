from pathlib import Path
import io
import json
import sys
import tarfile
import tempfile
import unittest
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from collect_paper_assets import collect


class AssetExtractionTests(unittest.TestCase):
    def test_zip_keeps_figure_and_caption_source_together(self):
        with tempfile.TemporaryDirectory() as work:
            root = Path(work)
            archive = root / "paper.zip"
            with zipfile.ZipFile(archive, "w") as package:
                package.writestr("figures/model.svg", '<svg xmlns="http://www.w3.org/2000/svg"/>')
                package.writestr("main.tex", r"\includegraphics{figures/model.svg}")
                package.writestr("run.sh", "exit 99")
            result = collect(archive, root / "out", "paper v1")
            self.assertEqual(result["figure_candidates"][0]["original_path"], "figures/model.svg")
            self.assertEqual(result["text_sources"][0]["file"], "source/main.tex")
            self.assertFalse((root / "out/source/run.sh").exists())
            self.assertEqual(json.loads((root / "out/inventory.json").read_text())["source"], "paper v1")

    def test_compressed_tar_preserves_vector_bytes(self):
        with tempfile.TemporaryDirectory() as work:
            root = Path(work)
            archive = root / "source.tar.gz"
            data = b"%PDF-1.4\nfigure-bytes"
            with tarfile.open(archive, "w:gz") as package:
                entry = tarfile.TarInfo("figs/curve.pdf")
                entry.size = len(data)
                package.addfile(entry, io.BytesIO(data))
            collect(archive, root / "out", "example")
            self.assertEqual((root / "out/source/figs/curve.pdf").read_bytes(), data)

    def test_pdf_only_is_not_reported_as_an_isolated_figure(self):
        with tempfile.TemporaryDirectory() as work:
            root = Path(work)
            archive = root / "source"
            archive.write_bytes(b"%PDF-1.4\nwhole-paper")
            result = collect(archive, root / "out", "example")
            self.assertEqual(result["source_kind"], "pdf_only")
            self.assertEqual(result["figure_candidates"], [])
            self.assertTrue((root / "out/source/paper.pdf").exists())

    def test_traversal_rejected_without_partial_output(self):
        with tempfile.TemporaryDirectory() as work:
            root = Path(work)
            archive = root / "paper.zip"
            with zipfile.ZipFile(archive, "w") as package:
                package.writestr("normal.tex", "draft")
                package.writestr("../outside.svg", "bad")
            with self.assertRaises(ValueError):
                collect(archive, root / "out", "example")
            self.assertFalse((root / "out").exists())
            self.assertFalse((root / "outside.svg").exists())

    def test_existing_directory_is_preserved(self):
        with tempfile.TemporaryDirectory() as work:
            root = Path(work)
            archive = root / "paper.zip"
            with zipfile.ZipFile(archive, "w") as package:
                package.writestr("main.tex", "draft")
            out = root / "out"
            out.mkdir()
            (out / "keep.txt").write_text("keep")
            with self.assertRaises(ValueError):
                collect(archive, out, "example")
            self.assertEqual((out / "keep.txt").read_text(), "keep")


if __name__ == "__main__":
    unittest.main()
