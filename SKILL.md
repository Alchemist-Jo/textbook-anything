---
name: textbook-anything
description: Builds a systematic university-level STEM tutorial or textbook that teaches a field, course, topic or focal paper from the reader's starting point, as LaTeX/PDF or offline HTML. Runs a staged agent workflow with a reader interview, lite, standard or deep tiers with one to three review rounds, prerequisite tracing, chapter subagents, derivations, exercises with reasoned solutions, and rendered inspection. Use when the user asks to learn a field from scratch, write a tutorial, textbook, handout or course notes with exercises, teach the prerequisites behind a paper, or turn a syllabus, notes or lecture series into a self-study course. Not for explaining one paper, video, code base or dataset as one HTML page without a curriculum (html-report), a study plan without teaching material (zede-zero-learning-roadmap), or LaTeX notes of one YouTube or Bilibili video (youtube-render-pdf, bilibili-render-pdf). 触发词：从零学、入门教程、写教材、讲义、课程笔记、习题与解答、先修知识、系统学习、交互教程。
license: MIT
metadata:
  version: "0.4.0"
---

# Textbook Anything

Use this skill to turn a starting point (a field, a course, a syllabus, notes, a lecture series or a focal paper) into a tutorial the reader can work through, explain and apply alone. The skill decides what the reader must learn first, teaches it in order, and proves every example and exercise before delivery.

## Goal

The deliverable is a tutorial in the agreed format, LaTeX/PDF or offline HTML, with its sources, solutions and code. It must:

- start from the reader's actual gaps and trace prerequisites down to the agreed baseline, no lower
- contain a complete learning unit in every tier: the problem, the objects, the foundations, the mechanism, a worked example, guided practice, and an independent variation with a reasoned answer
- show every decisive step of each derivation, with assumptions and the range of validity
- distinguish foundations, inherited methods, the focal contribution, source reports, simulations and actual runs
- use figures chosen for a stated explanatory purpose, readable at their final size
- contain only exercises the agent has solved, and code the agent has run
- complete the tier's review rounds: one for lite, two for standard, three for deep
- pass rendered inspection: `scripts/render-audit.mjs` for HTML, page renders for PDF

## Reader Standard

The reader is a careful self-learner with the stated background. That reader should be able to follow every step without outside help, solve the independent variation, and explain why the method works and where it stops working. The text sounds like a knowledgeable teacher taking the question seriously: it gives enough guidance at a hard step and enough room to think when the next step is within reach.

Space follows difficulty. The hardest transition gets the most explanation, routine algebra gets a line, and the focal method gets more space than its background.

## Settle the Brief

1. Read the actual sources before proposing a syllabus.
2. Interview the user one question at a time, each with a recommended answer, and only about decisions that change the work: the outcome the reader wants, the relevant background, the language, the required topics, the format and the tier. Look up facts in the environment instead of asking. When the user asks for no interview, or in a GPT Pro run, state the assumptions and proceed.
3. Choose the tier from [resource tiers](references/resource-tiers.md). Standard is the default. The tier sets scope and review rounds. It never sets the reader's proficiency or study time.
4. Fill the [teaching brief](templates/project-brief.md): entry gaps and the requirement table. Show the concise plan once.

| Tier | Scope | Complete review rounds |
| --- | --- | --- |
| lite | one bounded learning outcome and its prerequisite path | 1 |
| standard | a coherent introductory tutorial or the requested chapters | 2 |
| deep | a broader field entry or a demanding paper tutorial | 3 |

An explicit user limit overrides these presets. When the requested scope does not fit the tier, propose a sequence of complete units and say what the current unit covers.

## Acquire the Sources

1. Open each source and establish its identity: title, version, length, and for a video the duration, chapters, cover and subtitle tracks.
2. Trace the prerequisites the focal source actually depends on, stopping at the agreed baseline. Read inherited methods from their original papers or standard textbooks. [Sources](references/sources.md) and [paper study](references/paper-study.md) give the order.
3. Prefer original figure files. `scripts/collect_paper_assets.py` pulls figures and TeX from an arXiv source or a supplied archive. Manual subtitles come before automatic ones, and the highest resolution that actually downloads is used. [Video learning](references/video-learning.md) gives the frame procedure.
4. When access fails, try in order: the official page or repository, a copy the user supplied, a transcript. A third-party summary never stands in for the source. Record what stays unread as a gap and narrow the affected claim.

## Build the Ledgers

The teaching brief holds the requirement table, which is the coverage ledger: each learning outcome with its foundation, source, explanation, practice, assessment and status. Keep three more ledgers in the work directory, outside the reader's text:

- Evidence: each claim or number, its source location, and its kind: source statement, established background, teaching calculation, simulation or actual run.
- Figures: each candidate under a neutral name such as `t00-12-42.png` or `p07-fig3.png`, whether it was opened, the decision, the semantic name given after inspection, and its source and credit.
- Design: the type scale, measure, colour roles and widths for HTML, or the template, body size and caption size for PDF.

Record each round in the [round record](templates/round-record.md), and continuation across sessions in [learning progress](templates/learning-progress.md).

Labels stay neutral until verified. A raw frame keeps its timestamp name until it has been viewed. An exercise is marked solved only after its solution has been worked through. A learner check stays unassessed until a real attempt exists, because generated material does not prove mastery.

## Long Material

Split the work when any threshold is crossed:

- a video longer than 20 minutes, or a subtitle file with more than 300 entries
- a focal paper longer than 30 pages including appendices
- a series of two or more lectures, with one segment per lecture
- a tutorial of more than four chapters, with one segment per chapter
- prerequisite research across more than three source papers, with one segment per paper

Split at chapter, lecture or section boundaries, keeping a small overlap where an argument crosses one. When subagents are available, run the segments in parallel. Before starting them, the main agent fixes the brief, the notation table and the terms, and every subagent receives them. Each subagent returns:

- its segment's learning outcomes and the prerequisites it assumed
- core claims, each with a source location
- derivations and code verbatim, with every symbol defined
- worked examples and exercises with complete solutions, marked solved or unsolved
- figure candidates with time or page, marked opened or not opened
- notation or term conflicts with the shared table, and gaps it could not close

The main agent integrates the returns into one teaching sequence. It unifies notation, removes repetition, fills prerequisites that fell between segments, opens every figure it keeps, and re-solves every exercise. A subagent's report of success is not acceptance. Without subagents, process the segments in order under the same contract.

## Build the Teaching Sequence

Begin each section with a concrete problem or the unfinished reasoning from the previous one. Introduce objects and notation beside a concrete use. Explain the mechanism, develop the reasoning, then interpret the result. [Writing](references/writing.md) holds the prose standard. [Learning from scratch](references/learning-from-scratch.md) and [learning design](references/learning-design.md) cover field entry and sequencing.

For each derivation, state the quantity sought, the objects and their domains, the assumptions and the starting result. Justify each non-obvious transformation where it happens, and end with the conclusion and its range of validity. Keep identities, approximations, bounds and conventions distinct. [Derivations](references/derivations.md) lists the checks.

For code, state the input, trace it through the computation, and show the output. Run every listed example. [Code and experiments](references/code-and-experiments.md) covers programming tasks.

## Exercises and Solutions

Every tier keeps an independent check with its reasoned answer. Move from a fully worked case to a closely related or partly completed problem, then to an independent variation that changes an assumption, a condition or the setting. Each exercise maps to a learning outcome in the requirement table.

Work out the solution before accepting the wording. A solution states the approach, shows the needed steps, answers every part, and explains any sign, boundary condition or non-unique result that could surprise. [Exercises](references/exercises.md) and [exercise models](references/exercise-models.md) give the forms.

## Figures and Interaction

Choose each figure by the question it answers: a prerequisite map, a geometric or coordinate picture, a dataflow with tensor shapes, a comparison, a trajectory, evidence, a parameter effect, or a counterexample. [Visuals](references/visuals.md) maps questions to figure types.

Bias the frame search toward recall before precision. Generate dense candidates across the subtitle interval, locate them with contact sheets, then open the best ones individually in the image viewer. Decide what a frame shows only from viewing it. For progressive slides keep searching until the final readable state appears. Original paper figures follow [paper figures](references/paper-figures.md), with credit.

Interaction is used when a reader changes a parameter or steps through states to see a relationship. It starts from a user action, can pause, step and reset, and the page teaches the same relationship in print and without scripts. [Animation](references/animation.md) gives the state model.

## Visual Design and Typography

For HTML, [visual design](references/visual-design.md) holds the rules and shipped values: six text sizes per width, one reading column of 648px for Chinese or 576px for English, figure labels at least 12px when rendered at 390px, WCAG AA contrast, one accent hue and one caution hue, cards only for parallel items and exercises, and headings that state their content. For PDF, [typography](references/typography.md) sets 11pt body text, captions near 10pt, A4 with about 25mm margins, and figure text at least 7pt at the printed size.

A user's reference design or existing document style decides the look. The invariants hold inside it.

## Build Routes

HTML starts from `templates/tutorial.html` (native MathML, SVG, a parameter control and printable solutions) or `assets/lesson-template.html`:

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs templates/tutorial.html build/tutorial.html
node scripts/render-audit.mjs build/tutorial.html --widths 1440,390 --out build/audit --print
~~~

LaTeX starts from `templates/main.tex` and `templates/textbook-style.tex`:

~~~sh
python3 scripts/build_pdf.py chapter/main.tex --out build/chapter
python3 scripts/render_pdf.py build/chapter/main.pdf --out build/chapter-pages
~~~

[Environment](references/environment.md) covers installing missing tools and switching format when a toolchain cannot work. [Local helpers](scripts/README.md) lists every script. [HTML authoring](references/html-authoring.md) and [delivery](references/delivery.md) cover components and packaging.

## Review Rounds

Run the tier's complete rounds as defined in the [tutorial loop](references/tutorial-loop.md). Each round:

1. revisits the requirement table, the reader assumptions and open findings
2. works through the whole tutorial and revises what needs it
3. builds the actual deliverable
4. reads the whole tutorial for sequence, reasoning, language and figure meaning, solves the exercises, and runs the code
5. records concrete findings, corrects them, rebuilds and rechecks what changed
6. updates the requirement table and the round record

Round 1 asks whether a complete lesson exists. Round 2 asks whether the stated reader can use it alone. Round 3 challenges deep dependency chains and limits. A clean section is recorded as checked with no finding. Compiler passes and repeated lint runs are not rounds.

## Inspect and Repair

A successful build proves only that a file was written. For HTML, run the audit at 1440 and 390, read its report, and open every tile and the print PDF with the image viewer. For PDF, render every page and open the pages at reading size, plus a thumbnail pass for overall layout. Repair each defect at its source, rebuild, and reopen the affected pages or tiles.

| Invariant | Threshold | Checked by |
| --- | --- | --- |
| HTML sideways page scroll | none at 390 and 1440 | audit |
| HTML text sizes per width | 6 at most | audit |
| HTML smallest text, figures included | 12px | audit, tiles for raster text |
| HTML text contrast | 4.5:1, or 3:1 at 24px or 18.66px bold | audit |
| HTML figure labels, links, raw markup | no overlap or clipping, every target exists, no raw TeX or Markdown | audit |
| PDF figure text | 7pt at printed size | page renders |
| PDF glyphs, references, overfull boxes | no missing glyph, no `??`, nothing past the margin | compiler log and page renders |
| Exercises | every one solved, every part answered | round record |
| Code | every listed example run | round record |
| Coverage | every requirement row complete or explicitly out of scope | teaching brief |

## When Something Fails

Apply the first fallback that works:

- Source access: official page or repository, user copy, transcript, then a recorded gap and a narrowed claim.
- A toolchain that cannot install or run after one targeted repair: switch format (LaTeX to HTML, or HTML to PDF through `scripts/build_html_pdf.py`) with the same content and review.
- A figure that fails at the narrow width: enlarge labels, reflow, scroll inside the figure, split it.
- No renderer: complete the build and tests, then state which rendered checks were not done.
- A scope that exceeds the tier: deliver the most useful complete unit and name the unmet portion.

These moves are never allowed:

- an exercise without a worked solution, or a solution the agent has not checked
- hiding a missing prerequisite instead of teaching it or naming it out of scope
- describing a frame or figure that was not opened
- citing a number without a source location
- text below the size minimum, or labels deleted to make a figure fit
- reporting a rendered check that was not viewed
- claiming learner mastery from generated material
- silently upgrading the tier or deleting required topics

## Final Checklist

- Every blocking prerequisite is taught in the unit or named as outside the agreed outcome.
- Every derivation shows its decisive steps, assumptions and range of validity.
- Every chapter has a worked example and practice, and the unit ends with an independent variation and its reasoned answer.
- Every exercise was solved and every listed code example was run.
- Foundations, inherited methods, the focal contribution, source reports, simulations and actual runs are distinguishable.
- Every figure serves a stated question and was opened at its final size.
- The tier's review rounds are complete and recorded.
- The rendered HTML passes the audit at both widths, or every PDF page was viewed.

## Delivery

Discussion with the user is in Chinese unless they write in another language. The tutorial uses the language agreed in the brief.

Deliver:

- the reading artifact first: the PDF or the standalone HTML
- a ZIP with editable sources, local assets, solutions and runnable code
- the credit record for reused figures and the cover image when a video is the source
- the audit report or page renders that were inspected
- the teaching brief with final statuses and the round record
- a short note listing what was checked, by which method, and every requirement that remains open
