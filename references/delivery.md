# Figures, formatting, and delivery

Choose the requested format. Editable Markdown may be enough for a chapter; a typeset book may warrant LaTeX or another document system. Preserve an existing working toolchain unless changing it solves a concrete delivery problem.

Prepare missing dependencies using [environment and formats](environment.md). A working HTML fallback receives the same content, language, and visual review as the preferred toolchain. Follow [visual design](visuals.md) when adapting a diagram or interaction between formats.

For a new PDF, use the [typography guidance](typography.md) and the included template as a starting point. Read each source in the form that preserves its meaning, bring relevant figures into the explanation, and check the final document after compilation.

Decide what a figure should make easier to understand: a relationship, mechanism, comparison, or pattern that is cumbersome to describe in prose. Keep labels consistent with the text, identify schematic data, and use editable sources when practical. Colors should have consistent meanings and should not carry information alone.

For tensor diagrams, establish the objects, shapes, and axis meanings before arranging the page. Keep the formula legible, put shape labels next to their objects, and explain the computation in the caption. Equal dimensions should use consistent geometry; a transpose swaps its axes and a contraction removes the shared axis. Distinguish values, scores, indices, and masks when more than one appears. For other diagrams, use the visual encoding appropriate to the subject and make any schematic simplification clear.

Use readable type, restrained emphasis, and enough room for equations and annotations. Break long expressions at logical boundaries. Keep captions and exercise parts attached to their context. Update contents, numbering, and cross-references in the final build.

Build and inspect the actual reading artifact. For PDF, review the full document using thumbnails for overall layout and readable page views for details. For HTML, inspect all sections, controls, local assets, and narrow-screen layout, then check the printed version separately when included. After a localized change, recheck the affected content and any pages shifted by reflow. Rendering alone is not visual review.

Resolve missing glyphs, cropped content, overlapping labels, broken references, and unreadably small text before describing a PDF as finished. Record actual page ranges reviewed and remaining limitations. Avoid mechanical review quotas.

When editable sources are requested, rebuild from a clean copy to catch missing images, absolute paths, or implicit dependencies. Include the command and required tools. The optional [build and render helpers](../scripts/README.md) support local XeLaTeX projects and PDF previews; other toolchains are equally valid.

Deliver the agreed artifact and a ZIP with editable sources, local assets, solutions, and applicable code. Include the credit record for reused paper figures. Open or rebuild an extracted copy to catch missing relative assets. A short review note should identify the checked version or file, checks run, and unresolved limits. Keep round records, routine logs, caches, and old snapshots outside the reader's copy unless requested.
