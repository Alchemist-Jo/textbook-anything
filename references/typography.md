# Textbook typography

Use a reading-oriented layout for long STEM material. The supplied [style](../templates/textbook-style.tex) provides a starting point; retain an existing document style when the user asks for it.

## Type

Use a serif for continuous text and a sans serif for headings. The Chinese starter uses Fandol Song for body text and Fandol Hei for headings, supplied through `ctex`'s Fandol set. Latin text uses TeX Gyre Pagella, headings use TeX Gyre Heros, and mathematics uses TeX Gyre Pagella Math. Code uses Latin Modern Mono. These fonts come with a full TeX Live distribution, so the source does not depend on a particular operating system's fonts.

Begin with 11-point body text and approximately 1.2 line spacing. Keep captions near 10 points. A script or handwriting font is unsuitable as the default for a formula-heavy book. Ensure Greek letters, subscripts, bold vectors, and Chinese punctuation remain distinct at reading size.

## Page and hierarchy

For A4 handouts, use roughly 25 mm margins and a single column. Keep body text on white, limit the accent palette, and use restrained chapter and section headings. A fine rule or a small amount of space can distinguish a worked example without enclosing every paragraph in a box.

Let derivations align at their logical operators. Give dense formulas enough vertical space, and split long expressions before reducing type size. Keep the explanation for a step next to that step. Avoid a heading stranded at the foot of a page.

Use `booktabs` and wrapping columns for tables. Repeat headers on multipage tables. Keep figures near the paragraph that uses them, preserve readable axis labels, and move secondary detail to a caption or separate panel.

## Read the input before setting the page

Read the source before deciding how it should appear on the page. A table may need to be redrawn for readability; a mathematical diagram may need its original notation preserved. Place the figure where the argument uses it, and keep its caption specific to the relationship being explained. Choose the layout for the reading task and inspect the compiled result.

Keep production metadata and working source records separate from the student's main text. Preserve ordinary citations, scientifically relevant limitations, and attribution. A textbook does not need agent names, generation statistics, build logs, or editing history on its title page.

Inspect actual rendered pages for glyph coverage, mathematical weight, line breaks, figure labels, and spacing. If a font changes, check both the equations and pagination again.
