#!/usr/bin/env python3
"""Subset a bundled font to document characters; write WOFF2 bytes to stdout."""
import io
import sys

try:
    import brotli  # Required by fontTools' WOFF2 codec.
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("Install font dependencies: python3 -m pip install -r requirements-html.txt")

font = TTFont(sys.argv[1])
options = subset.Options()
options.flavor = "woff2"
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=sys.stdin.read())
subsetter.subset(font)
font.flavor = "woff2"
output = io.BytesIO()
font.save(output)
sys.stdout.buffer.write(output.getvalue())
