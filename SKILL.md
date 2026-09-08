---
name: textbook-anything
description: Build a systematic university STEM tutorial from a new field, paper, topic, syllabus, or notes. Identify prerequisite gaps, teach a complete path from the reader's starting point, and develop examples, visuals, and exercises with solutions. Supports lite, standard, and deep model-budget tiers. Use for field entry and substantial teaching material, not a short summary, single-question answer, or file conversion alone.
license: MIT
metadata:
  version: "0.2.0"
---

# Textbook Anything

Turn a narrow starting point into material a reader can learn from independently. A paper may introduce one contribution while assuming years of background. Identify that background, teach the parts needed to understand the contribution, and give the reader opportunities to use the ideas. The workflow and references here are self-contained.

For entry into a new field, use [learning from scratch](references/learning-from-scratch.md). Begin with the reader's actual gaps and a concrete task, then connect the necessary concepts, worked examples, and independent practice. Being new to a field does not imply being new to every prerequisite.

Apply the same standard of explanation and visual design in every format. A switch between LaTeX, HTML, another document system, and printed PDF changes the implementation, not the learning goals, mathematical detail, figure meaning, or readability. Preserve each visual's teaching function when adapting it to the available environment.

## 1. Establish the reader and the task

Read the supplied material first. Identify the learning goal, prior knowledge, language, source cutoff, requested depth, content to preserve, and deliverables. Select the model-budget tier: lite / 精简, standard / 标准, or deep / 深入. Default to standard. [Resource tiers](references/resource-tiers.md) defines the scope, research effort, and review defaults; any explicit hard limit takes precedence. Keep model budget separate from the reader's proficiency and available study time.

Ordinarily, resolve important gaps with one or two focused opening questions, one at a time. Establish the lowest level that needs explanation and what the reader should be able to derive, implement, or assess at the end. Recommend an assumption from the material already available. Do not ask questions the user has answered.

For a run the user identifies as GPT Pro, or that is explicitly identified as such by reliable runtime context, skip this opening interview. Also honor any request to proceed without questions. Record reasonable learner assumptions and continue; do not infer Pro mode from a model-family name or the absence of replies. Pro does not select a budget tier. Skipping the interview does not skip research, planning, or review, and unanswered entry checks remain unassessed.

After the interview, or immediately in the no-interview route, fill the requirement table in [the teaching brief](templates/project-brief.md). Show the concise plan once: tier, selected outcome, prerequisite gaps, source, planned emphasis, explanation or visual, practice, and assessment. Distinguish demonstrated background from assumptions. State deferred scope explicitly and preserve the user's required topics. Keep detailed working notes outside the tutorial.

Preserve task scope. A review returns findings without editing. A local revision stays local. The tutorial workflow applies to a full paper lesson, substantial chapter, or book; it must not turn every request into a book.

## 2. Prepare a working environment

Check the requested toolchain early with a small representative build. Reuse installed tools; install missing dependencies using the available package manager, preferably in a project environment. Do the installation work within existing authorization rather than returning instructions for the user to do it. [Environment and formats](references/environment.md) covers installation, smoke checks, and fallback decisions.

If the preferred environment cannot be installed or run after a reasonable repair attempt, continue with a capable format such as HTML, CSS, SVG, native MathML, and JavaScript. Preserve the teaching depth, math, visuals, and exercises. Deliver the working HTML and assets; export PDF when a browser renderer is available. Report an unavailable requested format accurately.

## 3. Research the dependencies

Trace the focal paper or topic through the methods it actually relies on. A reference that supplies an objective, derivation, architecture, or evaluation method deserves an explanation at the reader's level, even if the focal paper only cites it. Follow that method's prerequisites until the agreed baseline is reached. Avoid recursively summarizing unrelated citations.

Use [sources and coverage](references/sources.md) and [paper-to-tutorial design](references/paper-study.md). Distinguish foundations, inherited methods, the focal contribution, and empirical claims. Make their relationships explicit before choosing a chapter order.

For a broad field, first orient the reader to its representative problems and objects. Choose the prerequisite path needed for the selected outcome. Teach blocking gaps in terminology, mathematics, procedures, conventions, and evidence interpretation where they become necessary. A glossary or bibliography alone does not close those gaps.

When an arXiv version exists, inspect its source archive for original illustrations and the TeX that places and captions them. Prefer appropriate original figures over lossy screenshots. [Paper figures](references/paper-figures.md) explains extraction, attribution, and inclusion of usable assets in the delivery ZIP.

## 4. Design the whole tutorial

Use [learning design](references/learning-design.md) to connect outcomes, explanation, examples, and practice. Allocate space by prerequisite gaps and conceptual difficulty. Keep the focal method substantial; move optional background or long solutions to clearly linked sections when they interrupt the main argument.

Give each section a question worth answering. Introduce a concrete setting, explain the necessary objects, develop the argument, and interpret the result. A worked example should explain method choice and the decisive step. Read [writing](references/writing.md) before drafting and apply it to the whole document, including captions and solutions.

Move from demonstration to guided completion and independent use. Include a changed-condition problem or an explanation of when the idea applies. Give feedback on the specific reasoning, and revisit important concepts later when they are needed again. Do not infer learner mastery from an answer key or a successful document build. If study spans sessions, preserve real attempts and remaining gaps in [learning progress](templates/learning-progress.md).

Choose visuals by what they explain: a dependency map, geometry, a computation, an empirical comparison, an evolving system, or a parameter's effect. Use [visual design](references/visuals.md) and [typography](references/typography.md) for variety with a coherent visual language. Original paper figures and newly drawn teaching figures can serve different purposes in the same section.

Other references apply when needed:

| Work | Reference |
| --- | --- |
| Mathematical reasoning | [Derivations](references/derivations.md) |
| Practice, hints, and solutions | [Exercises](references/exercises.md), [exercise models](references/exercise-models.md) |
| Implementations and experiments | [Code and experiments](references/code-and-experiments.md) |
| Build, inspect, and package | [Delivery](references/delivery.md), [local helpers](scripts/README.md) |

## 5. Complete the tier's review rounds

Use one complete round for lite, two for standard, and three for deep, unless the user explicitly sets a different review budget. Follow [the tutorial loop](references/tutorial-loop.md): revisit requirements and sources, work through the complete agreed scope, produce the artifact, inspect it, solve or test the exercises, review the prose, correct defects, and update the requirement table. Lite still includes all these steps for its bounded learning unit.

Every round ends with a concrete self-review. Two compiler passes are one build, not two rounds. Do not invent defects or claim an independent review when the same author performed it. After the planned rounds, repair remaining blockers in the affected scope; do not claim completion solely because the round count was reached.

If the model budget becomes tight, remove optional branches and reuse valid work before sacrificing a necessary explanation, answer, or review. Honor explicit hard caps; identify unfinished requirements rather than silently declaring them complete. Use [resource tiers](references/resource-tiers.md) to resolve an oversized request or continue at a higher tier.

## 6. Deliver the tutorial

Provide the requested reading artifact first, then a ZIP with the editable source, local visual assets, applicable code, solutions, and concise build instructions. Include attribution for reused paper figures. Keep research ledgers and round records available separately, without inserting production history into the learner's text or a public README.

Verify the delivered copy opens or rebuilds without files from a temporary working directory. Distinguish mathematical reasoning, numerical tests, experiments, and visual review in any delivery note. A missing tool or source should narrow the relevant claim, not prevent completion of the parts that can be done.
