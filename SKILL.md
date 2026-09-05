---
name: textbook-anything
description: Turn a paper, technical topic, syllabus, or existing notes into a systematic university STEM tutorial, chapter, or textbook. Establish prerequisites, explain the foundations and related methods, develop derivations and exercises, and deliver readable PDF or HTML with editable source. Use for substantial teaching material and paper study, not a short summary, single-question answer, or file conversion alone.
license: MIT
metadata:
  version: "0.1.2"
---

# Textbook Anything

Turn a narrow starting point into material a reader can learn from independently. A paper may introduce one contribution while assuming years of background. Identify that background, teach the parts needed to understand the contribution, and give the reader opportunities to use the ideas. The workflow and references here are self-contained.

Apply the same standard of explanation and visual design in every format. A switch between LaTeX, HTML, another document system, and printed PDF changes the implementation, not the learning goals, mathematical detail, figure meaning, or readability. Preserve each visual's teaching function when adapting it to the available environment.

## 1. Establish the reader and the task

Read the supplied material first. Identify the learning goal, prior knowledge, language, source cutoff, requested depth, content to preserve, and deliverables. For paper study, assume the reader is new to the paper's specialized methods unless told otherwise; do not assume they lack all university mathematics.

Ordinarily, resolve important gaps with one or two focused opening questions, one at a time. Establish the lowest level that needs explanation and what the reader should be able to derive, implement, or assess at the end. Recommend an assumption from the material already available. Do not ask questions the user has answered.

For a run the user identifies as GPT Pro, or that is explicitly identified as such by reliable runtime context, skip this opening interview. Also honor any request to proceed without questions. Record reasonable learner assumptions and continue; do not infer Pro mode from a model-family name or the absence of replies. Skipping the interview does not skip research, planning, or review.

After the interview, or immediately in the no-interview route, fill the requirement table in [the teaching brief](templates/project-brief.md). Show the concise plan once: learning outcome, prerequisite, source, planned emphasis, explanation or visual, practice, and assessment. Keep detailed working notes outside the tutorial.

Preserve task scope. A review returns findings without editing. A local revision stays local. The tutorial workflow applies to a full paper lesson, substantial chapter, or book; it must not turn every request into a book.

## 2. Prepare a working environment

Check the requested toolchain early with a small representative build. Reuse installed tools; install missing dependencies using the available package manager, preferably in a project environment. Do the installation work within existing authorization rather than returning instructions for the user to do it. [Environment and formats](references/environment.md) covers installation, smoke checks, and fallback decisions.

If the preferred environment cannot be installed or run after a reasonable repair attempt, continue with a capable format such as HTML, CSS, SVG, native MathML, and JavaScript. Preserve the teaching depth, math, visuals, and exercises. Deliver the working HTML and assets; export PDF when a browser renderer is available. Report an unavailable requested format accurately.

## 3. Research the dependencies

Trace the focal paper or topic through the methods it actually relies on. A reference that supplies an objective, derivation, architecture, or evaluation method deserves an explanation at the reader's level, even if the focal paper only cites it. Follow that method's prerequisites until the agreed baseline is reached. Avoid recursively summarizing unrelated citations.

Use [sources and coverage](references/sources.md) and [paper-to-tutorial design](references/paper-study.md). Distinguish foundations, inherited methods, the focal contribution, and empirical claims. Make their relationships explicit before choosing a chapter order.

When an arXiv version exists, inspect its source archive for original illustrations and the TeX that places and captions them. Prefer appropriate original figures over lossy screenshots. [Paper figures](references/paper-figures.md) explains extraction, attribution, and inclusion of usable assets in the delivery ZIP.

## 4. Design the whole tutorial

Use [learning design](references/learning-design.md) to connect outcomes, explanation, examples, and practice. Allocate space by prerequisite gaps and conceptual difficulty. Keep the focal method substantial; move optional background or long solutions to clearly linked sections when they interrupt the main argument.

Give each section a question worth answering. Introduce a concrete setting, explain the necessary objects, develop the argument, and interpret the result. A worked example should explain method choice and the decisive step. Read [writing](references/writing.md) before drafting and apply it to the whole document, including captions and solutions.

Choose visuals by what they explain: a dependency map, geometry, a computation, an empirical comparison, an evolving system, or a parameter's effect. Use [visual design](references/visuals.md) and [typography](references/typography.md) for variety with a coherent visual language. Original paper figures and newly drawn teaching figures can serve different purposes in the same section.

Other references apply when needed:

| Work | Reference |
| --- | --- |
| Mathematical reasoning | [Derivations](references/derivations.md) |
| Practice, hints, and solutions | [Exercises](references/exercises.md), [exercise models](references/exercise-models.md) |
| Implementations and experiments | [Code and experiments](references/code-and-experiments.md) |
| Build, inspect, and package | [Delivery](references/delivery.md), [local helpers](scripts/README.md) |

## 5. Complete two or three full rounds

For substantial tutorials, run two complete rounds by default. Use a third when deep prerequisite chains, extensive mathematics, a new rendering route, or findings from round two justify it. Honor an explicit user request for a different budget. Follow [the tutorial loop](references/tutorial-loop.md): revisit requirements and sources, work through the whole requested scope, produce the actual artifact, inspect it, solve or test the exercises, review the prose, correct defects, and update the requirement table.

Every round ends with a concrete self-review. Two compiler passes are one build, not two rounds. Do not invent defects or claim an independent review when the same author performed it. After the planned rounds, repair remaining blockers in the affected scope; do not claim completion solely because the round count was reached.

## 6. Deliver the tutorial

Provide the requested reading artifact first, then a ZIP with the editable source, local visual assets, applicable code, solutions, and concise build instructions. Include attribution for reused paper figures. Keep research ledgers and round records available separately, without inserting production history into the learner's text or a public README.

Verify the delivered copy opens or rebuilds without files from a temporary working directory. Distinguish mathematical reasoning, numerical tests, experiments, and visual review in any delivery note. A missing tool or source should narrow the relevant claim, not prevent completion of the parts that can be done.
