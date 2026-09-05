# Reuse paper figures thoughtfully

For a paper with an arXiv version, inspect its source download before redrawing its published figures. Source archives often contain the original PDF, EPS, SVG, or raster assets together with TeX captions and labels. They can arrive as ZIP, TAR, compressed TAR, or a single source file; do not assume that every download is a ZIP or contains figures.

## Acquire and match the assets

Resolve the article and version from its abstract page. Download that version's source link and retain its source identity. The [asset helper](../scripts/README.md) can download a versioned arXiv source or unpack a supplied archive into a new working directory. It inventories image candidates and TeX files without executing the paper's code or compiling its source.

Inspect the candidate figure and the surrounding `includegraphics`, caption, label, and figure references in the TeX. Match it to the displayed figure in the paper. Some assets are subpanels, obsolete drafts, or unrelated supplementary material; the inventory alone does not identify the correct figure.

Keep a compact record for each selected image: article and version, original asset path, figure or panel number, caption meaning, intended tutorial section, credit or license, and any crop or annotation. Preserve an untouched original in the working material. Use [the asset table](../templates/project-brief.md) for the selected figures.

## Choose reuse or a teaching redraw

Reuse an original architecture, experiment, or comparison figure when its details are needed and it remains readable at the tutorial's scale. Explain what to inspect in the caption and nearby prose. Add a separate teaching diagram when the paper's dense figure hides a prerequisite operation, intermediate state, or dimension relationship.

Do not redraw an empirical plot from guessed points. If a vector original is available, retain it for the document route that supports it; create a suitable local preview for HTML when necessary. Record format conversions or crops that affect interpretation. Preserve labels, units, legends, and attribution.

If source files are unavailable, try the paper's HTML figure assets, author-provided materials, or extraction from its PDF. Use a page crop when the figure cannot otherwise be separated cleanly. State the actual origin in the asset record; a crop is not an original editable figure. A source failure should not stop the rest of the tutorial.

## Include figures in the delivery ZIP

Copy the selected reusable assets into the tutorial's own `assets/figures/` directory and use relative paths. Include their attribution record and any required license notices. Verify the extracted ZIP renders without the original download directory or a remote image host.

Before public redistribution, check the article and figure rights: availability on arXiv alone does not grant reuse rights. If permission does not cover the intended distribution, link to the original figure or make an original explanatory diagram where appropriate, preserving citation. Follow [arXiv's permissions guidance](https://info.arxiv.org/help/license/reuse.html) and [source-download documentation](https://info.arxiv.org/help/ir.html). Do not put an entire third-party archive into the public tutorial bundle merely because a few figures were useful.
