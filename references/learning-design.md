# Design a tutorial that builds understanding

A short paper can justify a long lesson when the reader needs to reconstruct its assumptions and methods. Set the lesson's boundary by what the reader should be able to do after studying it. Add background that enables that outcome and remove detail that distracts from it.

## Plan backward from the outcome

Choose an observable task: explain a mechanism, reproduce a derivation, compare two methods under stated conditions, implement a small case, or interpret evidence. Work out what would count as a convincing answer. Then identify the concepts and practice the reader needs to produce it.

Prior knowledge, the organization of concepts, and practice with useful feedback are central learning considerations in the [Eberly Center's learning principles](https://www.cmu.edu/teaching/principles/learning.html). Apply them here by checking the assumed baseline, making prerequisite relationships explicit, and giving feedback that addresses the reason for an error. These are design choices for this workflow, not measured guarantees about its outputs.

For a beginner in the specialty, first establish a concrete model and a few essential terms. Show a fully worked example, follow it with a partly completed or closely related problem, then ask for an independent variation. Revisit an earlier concept when it becomes useful later. Pair a visual with the explanation it supports and connect numerical cases to general expressions. The [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) discusses worked examples, practice, graphics with text, and concrete/abstract representations; adapt the recommendations to the university topic rather than treating them as a fixed lesson formula.

## Allocate the reader's attention

Use the planning table to assign approximate emphasis, including explanation and worked examples. For a newcomer learning one paper, a possible starting allocation is:

| Part | Example share | What the space is for |
| --- | --- | --- |
| Problem and necessary foundations | 25% | Establish the objects, assumptions, and mathematical tools. |
| Prior method or inherited components | 15% | Explain the approach the paper starts from and the limitation it addresses. |
| Focal method and worked cases | 30% | Develop the contribution in detail and connect equations to behavior. |
| Evidence, comparisons, and limits | 15% | Explain what the experiments support and where the argument stops. |
| Practice and solutions | 15% | Check understanding and transfer to a changed setting. |

These percentages are an editorial starting point, not an educational law or an acceptance test. Change them after the reader brief and initial research. A proof-centered topic needs more mathematical development; an implementation lesson may need more code and experiments. Solutions can sit in an appendix, but still count toward the reading burden.

Avoid two common imbalances: a long background survey that barely reaches the paper, and a close paraphrase of the paper that preserves all its unexplained assumptions. A prerequisite belongs in the main text when the next argument needs it. Optional depth can go into a sidebar, appendix, or linked section.

## Give the lesson a coherent sequence

Use a running model, question, or example across related sections where it reveals the connections. Increase complexity one meaningful change at a time. At each step, identify what is held fixed, what changes, and why the previous explanation is now insufficient.

Do not force every section to contain a definition, theorem, diagram, experiment, and exercise. Some sections establish a single result; others need several representations. Keep the notation and visual conventions stable while varying the form of explanation.

## Assess the understanding the lesson promised

Use short retrieval questions to revisit key distinctions, worked or partly completed problems to guide a new technique, and independent problems to test transfer. Ask the reader to explain why a method applies, diagnose an error, change an assumption, or predict an outcome before calculating it.

Provide hints separately from full solutions. Feedback should identify the failed assumption or reasoning step and show how to recover. A solution that only gives the final expression leaves the reader unable to diagnose their own attempt. See [exercises](exercises.md) for problem contracts and answer review.

At the end of a round, compare the tutorial against its outcomes: where did the reader learn each required component, where did they combine them, and where were they asked to use the result independently? Fix a missing connection in the lesson, not by adding another claim that the tutorial is comprehensive.
