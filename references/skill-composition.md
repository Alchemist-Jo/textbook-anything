# Reuse existing skills

Textbook Anything coordinates teaching work. Invoke each installed companion through its complete `SKILL.md`, including the supporting references and scripts that entry point requires; the handoff table below is not a substitute for those instructions. Companion skills are installed separately and retain their own licenses.

| Stage | Skill | Input | Result to carry forward |
| --- | --- | --- | --- |
| Audience and learning goal | `grilling` | Supplied background and the consequential open decision | A settled prerequisite baseline and an observable learning goal |
| Coverage and prerequisites | `deep-research` | Subject, audience, source cutoff, and dependency questions | Verified sources, competing teaching sequences, and a cited prerequisite map |
| Exposition and worked examples | `sepia` | Draft or source facts, language, reader level, and protected technical content | Clear professional prose with the reasoning intact |
| Research document production | `deepresearch-skill` when the task calls for a research document from mixed sources | Sources, reader brief, document scope, and textbook typography | A compiled document with figures integrated into its explanation |
| Other figures and document production | An available figure or document skill suited to the requested output | Figure purpose or manuscript plus format constraints | Editable visuals or a checked document |

Keep handoffs within the user's requested scope. Reuse existing source research when it answers the new question; do not restart a survey because a sentence changed. Do not automatically install tools, buy compute, or create a separate task as a consequence of a handoff.

## Audience discussion

Keep the opening exchange to the unresolved decisions that affect depth. Ask one question at a time and recommend an assumption based on the supplied material. A typical first question is whether readers can already derive a stated foundational result; the next can distinguish explanation, derivation, and implementation as the target outcome. Skip questions already answered and stop when the brief is settled.

## Prerequisite research

Ask research questions such as: which mathematical tools does the target topic actually use, where must they be introduced, and where do credible courses or textbooks choose different orders? Give `deep-research` a bounded subject and the learner brief, not the open request to research an entire discipline.

Preserve its source verification and coverage work. Then translate the research into a teaching artifact:

| Concept | Used by which argument or task | Required or helpful | Source location | Teaching placement |
| --- | --- | --- | --- | --- |

Resolve circular dependencies with a preliminary explanation followed by a later derivation, or reorganize the material. Keep survey prose and research records outside the student's textbook unless that discussion itself teaches something needed.

## Sepia handoff

For new text use `write`; for local edits use `refactor`; for diagnostic-only requests use `review`. Ask for the professional or technical-exposition route. Provide formulas, numerical values, assumptions, citations, and solution steps as content to preserve. Recheck meaning after the language pass. Use its diagnosis-before-revision workflow without turning its findings into text inside the textbook.

## When a companion is unavailable

Tell the user which companion is missing and offer its official installation source. Use a local fallback only if the user accepts it or has already authorized that approach. Prerequisite research still needs actual retrieval. Do not describe a summary of a companion as execution of the full skill, or silently substitute another skill with the same name but a different purpose.

Known companions: [Sepia](https://github.com/Nanako0129/sepia), the `deep-research` skill in [Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills), and [deepresearch-skill](https://github.com/WncFht/agent-basic-skill/tree/main/skills/deepresearch-skill). The two research skills have different roles: literature and prerequisite research, and multimodal research-document production. Use the environment's installed `grilling` skill. This package does not vendor third-party skill text.
