---
name: textbook-anything
description: Build a systematic university STEM tutorial from a field, course, video, paper, syllabus or notes. The agent acquires sources, resolves prerequisites, develops derivations and examples, implements purposeful visuals, tests practice and solutions, builds the requested artifact and repairs concrete gaps. Supports lite, standard and deep model budgets. Use for substantial learning material, not a short answer or file conversion alone.
license: MIT
metadata:
  version: "0.3.0"
---

# Textbook Anything

Turn a starting point into material a reader can explain, work through and apply independently. Preserve the requested scope and format. Default to the standard model budget; proficiency and study time are separate decisions.

## Execute the teaching task

1. **Inspect the input and reader.** Read actual sources before proposing a syllabus. Establish the outcome, relevant background, language, required topics and deliverable. Ask one consequential question at a time only when the answer changes the work. Reuse prior answers, fill the teaching brief and show the concise plan once.
2. **Prepare access and tools.** Follow [the agent workflow](references/agent-workflow.md). Inspect video metadata, subtitles and cover; document versions and original figures; or code/data paths. Run a representative build early. Reuse tools and prepare missing dependencies within authorization.
3. **Resolve prerequisites and long inputs.** Trace methods the focal source actually depends on, stopping at the agreed baseline. Split long inputs into coherent segments, preserving claims, equations, code, visual locations and uncertainties. Integrate dependencies and remove repetition.
4. **Build the teaching sequence.** Begin with a concrete problem, explain objects and mechanism, develop the reasoning and interpret the result. Preserve indispensable intermediate steps, assumptions and source numbers. Keep the focal topic substantial and identify optional branches.
5. **Connect explanation to use.** Develop a complete worked case, guided practice and an independent variation. Give reasoned solutions and show how concepts affect a calculation, implementation, design choice or experiment. A project is optional; changing a real project requires an explicit request.
6. **Implement visuals and the artifact.** Choose figures by explanatory purpose. Inspect frames and original figures before describing them. Make parameters, state, graphics and explanations agree. Use supplied HTML or LaTeX resources with consistent teaching depth.
7. **Review, repair and deliver.** Complete the tier's review rounds, reuse valid work and correct concrete findings. Run relevant examples, solve exercises, build the artifact and inspect accessible renderings. Deliver the reading artifact first, then sources, assets, code and solutions.

## Load only the reference needed now

| Current action | Reference |
| --- | --- |
| Source actions, branching, gaps and completion | [Agent workflow](references/agent-workflow.md) |
| Reader brief, budget and scope | [Resource tiers](references/resource-tiers.md), [teaching brief](templates/project-brief.md) |
| Field entry and prerequisite sequence | [Learning from scratch](references/learning-from-scratch.md), [learning design](references/learning-design.md) |
| Source dependencies or a focal paper | [Sources](references/sources.md), [paper study](references/paper-study.md) |
| Videos, covers, subtitles and keyframes | [Video learning](references/video-learning.md) |
| Prose, derivations and implementation | [Writing](references/writing.md), [derivations](references/derivations.md), [code](references/code-and-experiments.md) |
| Exercises, hints and feedback | [Exercises](references/exercises.md), [exercise models](references/exercise-models.md) |
| Original illustrations | [Paper figures](references/paper-figures.md) |
| Visual meaning and typography | [Visuals](references/visuals.md), [typography](references/typography.md) |
| HTML design, compact notes or mechanism animation | [HTML design](references/html-design.md), [animation](references/animation.md) |
| Environment, build and packaging | [Environment](references/environment.md), [HTML authoring](references/html-authoring.md), [delivery](references/delivery.md) |
| Review rounds or continuation | [Tutorial loop](references/tutorial-loop.md), [learning progress](templates/learning-progress.md) |

Read the active phase's references, not the whole directory. Do not reload complete instructions for each segment. Concise concept/source/gap notes preserve coverage; production records stay outside the learner's text.

## Defaults and boundaries

- Find the lowest prerequisite level that needs explanation. In a reliably identified GPT Pro run, or when the user requests no interview, state reasonable assumptions and proceed. Pro does not select a tier; unanswered checks remain unassessed.
- Lite, standard and deep retain one, two and three complete review-round defaults. Explicit limits take precedence. Reuse valid sources, calculations and unaffected checks instead of regenerating the tutorial.
- Read [writing](references/writing.md) before drafting. Use connected prose and meaningful sections; explain formulas and symbols, and trace code from input to output.
- Videos longer than 20 minutes or with more than 300 subtitle entries need segments. Preserve timing and original covers. Compare nearby frames and choose a complete readable state after direct visual inspection.
- Distinguish foundations, inherited methods, focal contributions, source reports, simulations and actual runs. Source access, a successful build or an answer key does not prove reader mastery.
- Animations explain a specified relationship. Provide pause, manual inspection and static content; update numbers and explanations from the same model. Keep necessary figure times visible and consolidate repeated notes.
- Use subagents only when current authorization allows them. Segmentation can be sequential.
- When a source or tool fails, try a permitted alternative and preserve the learning goal in a capable format. Respect access policies and identify unresolved content or visual checks.

## Build routes

For HTML, start from templates/tutorial.html or assets/lesson-template.html. Install dependencies once, then build a standalone file:

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r requirements-html.txt
node scripts/build-html.mjs templates/tutorial.html build/tutorial.html
~~~

The builder embeds assets and Fandol font subsets; native MathML and pre-rendered LaTeX formulas are supported. See [local helpers](scripts/README.md) for LaTeX, source figures and checks. Existing LaTeX templates remain available.

Finish when agreed content, examples, solutions and a usable artifact are complete and known blockers are resolved. Review counts and compiler passes do not establish completion. Keep unmet requirements explicit and preserve accepted work for continuation.
