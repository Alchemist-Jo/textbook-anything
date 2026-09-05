---
name: textbook-anything
description: Write, expand, or revise university STEM textbooks, course notes, and substantial teaching chapters from a topic, syllabus, papers, or drafts. Research prerequisites, explain concepts and derivations, and develop connected exercises with solutions. Use for coherent teaching material, not a short summary, single-question answer, study schedule, or file conversion alone.
license: MIT
metadata:
  version: "0.1.1"
---

# Textbook Anything

Write for a reader who wants to understand the subject well enough to use it. Explain why a problem matters, how the argument works, and what changes when an assumption changes. The workflow and references in this package are sufficient to carry out the task; no companion skill is required.

## Find the right starting point

Read the supplied material before choosing a structure. Establish the reader's background, learning goal, language, scope, source cutoff, material to preserve, and requested output. Use what the user has already told you. For a substantial book, keep a short [teaching brief](templates/project-brief.md); a small revision rarely needs one.

If the background or goal is unclear, ask one or two focused questions, one at a time. Recommend a starting assumption: can the reader already derive a particular foundational result, or only recognize it? Should the chapter prepare them to explain the idea, solve unfamiliar problems, or implement the method? Settle the decisions that determine depth, then proceed.

Keep the operation in scope. A review returns located findings. A revision changes the requested material and its affected references. Preserve the original input.

## Research the learning sequence

Before drafting a new structure, investigate what the topic depends on. Compare established textbooks, actual course materials, and relevant primary sources. Trace a prerequisite to the argument or task that needs it; distinguish necessary knowledge from useful background. [Sources and coverage](references/sources.md) gives the research procedure, including how to resolve gaps and conflicting accounts.

Arrange the chapters so readers encounter the needed ideas before using them. When an intuitive introduction must come before a full proof, make that choice explicit and return to the proof later. In a revision, keep track of where retained material moves. Merging two headings must not silently remove an example or result the user wanted to keep.

Let the subject determine the teaching method. A mathematical chapter may turn on a proof, a physics lesson on a model and its limits, and an engineering lesson on a design or implementation. Include equations, code, and experiments where they help the reader accomplish the goal.

## Explain the ideas

Begin a section with the question its mathematics will answer. Introduce notation when it becomes useful, explain the decisive steps, and return to the meaning of the result. Spend more space where the reader has to make a new conceptual move; routine algebra can be brief.

Make a worked example a guided argument. Say why the chosen method applies, work through the difficult step, then interpret or check the answer. A useful transition identifies what has changed: a new condition, a remaining limitation, or a question the previous result allows us to ask.

Read [writing](references/writing.md) before drafting or revising prose. It covers explanations, examples, solutions, captions, Chinese and English expression, and a concrete editing pass. Preserve assumptions, quantities, attribution, and the strength of claims while improving the language.

Use the other references when their work is needed:

| Task | Reference |
| --- | --- |
| Check mathematical reasoning | [Derivations](references/derivations.md) |
| Design practice and solutions | [Exercises](references/exercises.md) and [worked design examples](references/exercise-models.md) |
| Supply implementations or experiments | [Code and experiments](references/code-and-experiments.md) |
| Draw figures or produce the document | [Delivery](references/delivery.md) and [typography](references/typography.md) |

For long work, complete a representative section early to establish depth, notation, and presentation. Continue using that standard unless the user has requested a checkpoint. Carry definition changes through explanations, figures, exercises, solutions, and code that depend on them.

## Give the reader something to work out

Choose exercises from the understanding they should reveal. A short question can check a new concept immediately. A longer problem can keep the same model or setting while asking the reader to derive a result, alter a condition, examine a limit, or check an implementation.

Solve the problem before accepting its wording. Ensure every part has enough information and that the solution answers it. Where a conclusion depends on a parameter or the solution is not unique, let that be part of the reasoning. Keep solutions separately locatable so readers can attempt the problem first.

## Read and check the result

Read the completed material as the intended student. Look for an unexplained symbol, a jump in reasoning, a repetitive paragraph, or an exercise whose solution uses something never taught. Fix concrete problems and revisit the affected material. Apply the language pass to the entire requested scope, including captions and answers.

Use numerical checks where they can expose a plausible error. Inspect the rendered document when layout is part of delivery. Compilation establishes that a file builds; it does not establish mathematical correctness. Review the whole requested scope when it is complete, and repeat broader checks only when changes or unresolved problems warrant them.

## Deliver material the reader can use

Provide the requested artifact first, followed by editable source and the necessary build instructions. Include solutions, code, and a short review record when requested or needed for the handoff. Keep production notes outside the teaching text. Distinguish checks actually run from proposed experiments and unresolved questions.

The [local helpers](scripts/README.md) support package checks, XeLaTeX builds, and PDF rendering. A different working toolchain is equally valid. The [example textbook](examples/multimodal-learning/README.md) and two short source examples show the kinds of material this workflow organizes.
