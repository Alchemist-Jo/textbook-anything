# Figures, formatting, and delivery

Choose the requested format. Editable Markdown may be enough for a chapter; a typeset book may warrant LaTeX or another document system. Preserve an existing working toolchain unless changing it solves a concrete delivery problem.

For a new PDF, use the [typography guidance](typography.md) and the included template as a starting point. Read each source in the form that preserves its meaning, bring relevant figures into the explanation, and check the final document after compilation.

Decide what a figure should make easier to understand: a relationship, mechanism, comparison, or pattern that is cumbersome to describe in prose. Keep labels consistent with the text, identify schematic data, and use editable sources when practical. Colors should have consistent meanings and should not carry information alone.

For tensor diagrams, establish the objects, shapes, and axis meanings before arranging the page. Keep the formula legible, put shape labels next to their objects, and explain the computation in the caption. Equal dimensions should use consistent geometry; a transpose swaps its axes and a contraction removes the shared axis. Distinguish values, scores, indices, and masks when more than one appears. For other diagrams, use the visual encoding appropriate to the subject and make any schematic simplification clear.

Use readable type, restrained emphasis, and enough room for equations and annotations. Break long expressions at logical boundaries. Keep captions and exercise parts attached to their context. Update contents, numbering, and cross-references in the final build.

Compile with the actual dependencies and inspect the resulting PDF. For a new book, render and review the full document, using thumbnails for overall layout and readable page views for details. After a localized change, recheck the affected pages and any pages shifted by reflow. Rendering alone is not visual review.

Resolve missing glyphs, cropped content, overlapping labels, broken references, and unreadably small text before describing a PDF as finished. Record actual page ranges reviewed and remaining limitations. Avoid mechanical review quotas.

When editable sources are requested, rebuild from a clean copy to catch missing images, absolute paths, or implicit dependencies. Include the command and required tools. The optional [build and render helpers](../scripts/README.md) support local XeLaTeX projects and PDF previews; other toolchains are equally valid.

Deliver the agreed artifact, sources, solutions, and applicable code. A short review note should identify the checked version or file, findings resolved, checks run, and unresolved limits. Routine logs, caches, and old snapshots need not accompany the reader's copy.
