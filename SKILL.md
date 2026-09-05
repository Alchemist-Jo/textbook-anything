---
name: textbook-anything
description: Write, expand, or revise university STEM textbooks, course notes, and substantial teaching chapters from a topic, syllabus, papers, or drafts. Clarify the learner's goals, research prerequisite relationships, explain concepts and derivations, and develop linked exercises with solutions. Use for coherent teaching material, not a short summary, single-question answer, study schedule, or file conversion alone.
license: MIT
metadata:
  version: "0.1.0"
---

# Textbook Anything

Build university STEM material a reader can learn from independently. A chapter needs a reason for its ideas to appear in that order, enough explanation to use them, and practice that reveals whether they were understood.

## Establish the teaching task

Read the supplied material before proposing a structure. Identify the audience, prerequisites, learning goals, language, scope, content to preserve, source cutoff, and requested deliverables. Infer routine choices from context; ask only when a missing answer would materially change the work. A brief such as [templates/project-brief.md](templates/project-brief.md) is useful for a book, but unnecessary for a small revision.

Respect the requested operation. A review produces findings; a chapter edit stays within that chapter and its affected references. Write or rebuild a whole book only when the request calls for it. Keep the original input available.

Use `grilling` for one or two focused opening questions when the audience or goal is unresolved: what can the reader already derive or implement, and what should they be able to do after this material? Ask one at a time with a recommended assumption, use existing answers, and settle those decisions before choosing the chapter's depth.

## Organize the subject

Use `deep-research` to establish the subject's coverage and prerequisite relationships before drafting a new structure. Give it the audience, scope, and questions about which concepts are required, where they are used, and which teaching sequences the sources support; turn the findings into a cited dependency map. For an existing structure, research only the dependencies affected by the revision. See [skill composition](references/skill-composition.md) for handoff details.

Arrange chapters around what the reader needs to understand or do next. When revising, track where retained material moves and explain substantive omissions. Preserve requested examples, conclusions, and exercises even when sections are merged.

Choose the teaching method to fit the STEM subject. A mathematical argument may need a derivation, a physics lesson a model and limiting case, and an engineering chapter an implementation or experiment. Include each where it serves the learning goal. The examples in this repository illustrate selected techniques, not a default syllabus.

## Develop the material

Introduce the problem before the machinery needed to solve it. Define unfamiliar terms where they first matter. Connect each major result to an explanation, example, application, or limitation that serves the learning goal. New sections should meet the surrounding material's teaching depth; equal page counts are unnecessary.

Use `sepia` for the language of the exposition and worked examples, following its professional route. Preserve technical conditions and useful textbook structure; keep the mathematical reasoning and exercise design under this skill's subject checks.

Read only the references needed for the task:

| Work | Reference |
| --- | --- |
| Use a syllabus, papers, external sources, or time-sensitive claims | [Sources and coverage](references/sources.md) |
| Write or check mathematical arguments | [Derivations](references/derivations.md) |
| Develop examples, practice, solutions, or assessment | [Exercises](references/exercises.md), including the Griffiths and supplied-example synthesis |
| Supply code or experiments | [Code and experiments](references/code-and-experiments.md) |
| Draft or edit explanatory prose | [Writing](references/writing.md) |
| Produce figures, format a document, or check delivery | [Delivery](references/delivery.md) |

Work out examples and solutions while writing the corresponding explanation. If a task is underdetermined, state the missing conditions or ask the reader to analyze the alternatives. Keep solutions separately locatable so the reader can attempt a problem first.

For long work, finish a representative section early to establish depth, notation, and presentation. Continue with that standard unless the user has requested a checkpoint. Carry definition changes through dependent explanations, figures, exercises, solutions, and code.

## Review the actual result

Check coverage, reasoning, teaching value, and readability against the intended audience. Use numerical tests for claims they can test, and inspect the rendered document when layout is part of delivery. Compilation and file checks do not establish subject correctness.

Record concrete defects with their locations, fix them, and recheck the affected material. Review the whole requested scope once it is complete; repeat a full review when broad changes or remaining defects justify it. A fixed number of review rounds is not a completion criterion.

Stop when the requested material is complete and known blocking defects are resolved. Missing source access, an untested experiment, or an unresolved argument remains explicit. Distinguish author review, independent review, tests, and experiments in any report; never describe one as another.

## Deliver

Provide the requested artifact first, then editable sources and any necessary build instructions. Include code, solutions, and a short review record when they are part of the task. Keep process notes outside the teaching text. State what was checked and what remains unverified.

For PDF workflows, the optional local helpers are documented in [scripts/README.md](scripts/README.md). They do not install dependencies or require a particular subject. The supplied [multimodal textbook](examples/multimodal-learning/README.md) shows one finished document.
