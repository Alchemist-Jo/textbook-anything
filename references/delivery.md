# Figures, formatting, and delivery

Choose the requested format. Editable Markdown may be enough for a chapter; a typeset book may warrant LaTeX or another document system. Preserve an existing working toolchain unless changing it solves a concrete delivery problem.

For a new PDF, read [typography](typography.md) and use an available document skill with its complete instructions. For research documents built from mixed source formats, `deepresearch-skill` supplies the document workflow; pass this package's textbook typography and reader-facing content requirements with the request.

Give each figure a teaching purpose: a relationship, mechanism, comparison, or pattern the reader needs to see. Keep labels consistent with the text, identify schematic data, and use editable sources when practical. Colors should have consistent meanings and should not carry information alone.

For a diagram that encodes quantities or dimensions geometrically, keep that encoding consistent. A transposed matrix swaps its axes; a time axis preserves order; a chart's scale matches the stated units. Abstract schematics may use non-proportional geometry when labels make the abstraction clear.

Use readable type, restrained emphasis, and enough room for equations and annotations. Break long expressions at logical boundaries. Keep captions and exercise parts attached to their context. Update contents, numbering, and cross-references in the final build.

Compile with the actual dependencies and inspect the resulting PDF. For a new book, render and review the full document, using thumbnails for overall layout and readable page views for details. After a localized change, recheck the affected pages and any pages shifted by reflow. Rendering alone is not visual review.

Resolve missing glyphs, cropped content, overlapping labels, broken references, and unreadably small text before describing a PDF as finished. Record actual page ranges reviewed and remaining limitations. Avoid mechanical review quotas.

When editable sources are requested, rebuild from a clean copy to catch missing images, absolute paths, or implicit dependencies. Include the command and required tools. The optional [build and render helpers](../scripts/README.md) support local XeLaTeX projects and PDF previews; other toolchains are equally valid.

Deliver the agreed artifact, sources, solutions, and applicable code. A short review note should identify the checked version or file, findings resolved, checks run, and unresolved limits. Routine logs, caches, and old snapshots need not accompany the reader's copy.
