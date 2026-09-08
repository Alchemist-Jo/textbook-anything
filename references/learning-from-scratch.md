# Enter a new field from a usable starting point

The first difficulty in a new field is often deciding what needs to be understood before the main idea becomes meaningful. Someone may know the mathematics but not the field's objects, or write working code while missing the assumptions behind the objective. Start from that particular gap.

Use this method when the user is entering a field, learning a paper whose prerequisites are unfamiliar, or asks to learn from scratch. Keep a small revision or an already well-specified advanced chapter within its original scope.

## 1. Define an achievable entry outcome

Replace a broad topic name with a concrete task the reader wants to perform: follow a method's derivation, explain a system's behavior, implement a controlled example, compare approaches, or interpret a representative result. Give a brief orientation to the field's central problems and objects, then select the path needed for that task.

A field introduction can name the important neighboring branches without teaching all of them at once. Show what the current unit enables, where its boundary lies, and which branch can follow. A paper's section order and citation count do not define the teaching sequence.

## 2. Identify the actual gaps

Use supplied work, a brief explanation, a small calculation, or a concept sketch when available. A course title, self-report, or familiarity with software is useful context but does not demonstrate each prerequisite. Avoid a long placement exam before helping the user.

| Gap to investigate | What might be missing | Useful teaching response |
| --- | --- | --- |
| Field orientation | The main question, objects, or reasons for using the method | Start with a representative problem and identify what success would mean. |
| Language and representation | A term, symbol, axis, unit, or translation between code and mathematics | Connect each representation to the same concrete object and use it in a small case. |
| Conceptual foundation | A necessary relationship such as conditional probability or a rate of change | Teach the required concept at the point it is used, with an example and a check. |
| Procedure | How to choose or carry out a calculation, algorithm, or experiment | Demonstrate the decisions, then let the reader complete a related case. |
| Conventions and assumptions | Boundary rules, normalizations, sampling units, or customary omissions | State the convention and show a case where changing it changes the result. |
| Evidence and transfer | What a result supports, or when an approach is appropriate | Compare claims to evidence and ask for a changed-condition problem or counterexample. |

Record a gap as demonstrated, partial, or unassessed, with the basis for that status. These are local observations about a specific prerequisite, not labels for the person's overall ability. Do not fill in imaginary diagnostic answers.

In GPT Pro or another no-interview run, proceed with explicit assumptions and include optional entry checks in the material with answers separately located. No reply means unassessed. It must not be treated as a passed diagnostic or as a reason to stall the task.

## 3. Build the necessary prerequisite path

Work backward from the target task. For each dependency, identify the exact later step that needs it. Continue until reaching the established or assumed baseline. Distinguish a blocking prerequisite from helpful context and optional depth.

Use a small dependency map rather than a long list of unfamiliar terms. If two concepts appear circular, introduce a concrete example first and return to the formal explanation when the required mathematics is available. Mark the return point so a deferred explanation is not forgotten.

Do not restart all of calculus because one derivative appears in a paper. Equally, do not place the word “background” above a set of unexplained formulas and assume the gap is closed. The reader needs the portion of the foundation that makes the next argument possible.

## 4. Teach one connected unit

Use a running case through these moves, combining them where natural:

1. Present the problem and ask what the reader would expect to happen.
2. Define the objects and the representation needed to describe it.
3. Explain or derive the essential relationship, including its assumptions.
4. Work through a concrete example and explain the choice of method.
5. Let the reader supply a missing step or solve a nearby problem with less help.
6. Ask for an independent variation, an error diagnosis, or a condition under which the result changes.
7. Give feedback that identifies the reasoning step, and return to the target task.

A prediction prompt should invite reasoning without becoming a barrier to progress. Supply an explanation before demanding self-explanation when the reader lacks the necessary concepts. Reduce guidance according to demonstrated understanding, not because a fixed number of pages has elapsed.

Connect words, equations, code, and figures around the same objects. A visual should reveal a relationship that is difficult to follow in the other representation. Use a concrete value or geometry before abstraction when it helps, then explain what generalizes and what was special about the example.

## 5. Check understanding beyond recognition

Ask the reader to reconstruct a key idea without copying the worked solution, explain why a step is valid, or apply the idea after changing a condition. A near-identical numerical substitution checks less than a problem that requires choosing the method. Include both when they serve different stages of learning.

Keep hints and full solutions distinguishable. When an answer is wrong, identify whether the difficulty is a missing concept, a mistaken representation, a procedural error, or an unsupported inference. Repair that specific issue and try another meaningful case. Repeating the same paragraph more slowly may leave the misconception intact.

Revisit important concepts later in the tutorial and suggest a delayed retrieval task when continued study is appropriate. Do not imply that reading once establishes lasting understanding, or create a recurring reminder unless requested.

## 6. Leave a clear next step

End the selected unit with what it enables and the next dependency or question to tackle. In a larger tutorial, connect that next step to a chapter or section. In lite, provide the short continuation map without pretending that the deferred lessons have been completed.

Distinguish three statements: the material covers the prerequisite; the author checked its explanation and solution; the learner demonstrated the skill. Only the last requires an actual learner attempt. Use [learning progress](../templates/learning-progress.md) if the task continues across sessions.

## Research basis and limits

The supporting findings and their scope are summarized in [learning evidence](learning-evidence.md). The sequence above is this project's teaching synthesis. Its gap categories and budget presets are design choices, not a validated diagnostic instrument or a claim that one method suits every learner. See [the field-entry example](../examples/field-entry/README.md) for a concrete application.
