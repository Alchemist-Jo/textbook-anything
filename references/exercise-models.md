# Exercise models

Use these observations to design new university STEM problems. They describe teaching structure; the original problem statements and illustrations remain with their sources.

## Griffiths: place practice where it does its work

In the preface to *Introduction to Electrodynamics*, fourth edition, David J. Griffiths distinguishes problems placed beside the relevant discussion for immediate learning from longer or broader problems at chapter ends. Some earlier problem results are used later in the text and are marked accordingly. This gives three useful decisions: check a new idea soon after introducing it, reserve synthesis for later, and make exercise dependencies visible. Source: [publisher's preface, printed page xiii](https://assets.cambridge.org/97811084/20419/frontmatter/9781108420419_frontmatter.pdf).

For this skill, use a short in-section problem when it reveals a specific misunderstanding. Use an end-of-chapter problem to connect concepts already taught. If a later argument needs a problem's result, supply a locatable result or solution rather than leaving an unstated prerequisite. These are the design choices adopted here, not a requirement to reproduce Griffiths's wording or difficulty labels.

## Supplied textbook: one object, several kinds of reasoning

The [multimodal learning textbook](../examples/multimodal-learning/textbook.pdf) provides the following models. Locations use PDF viewer pages, including the front matter.

| Example | Observed structure | Reusable design feature |
| --- | --- | --- |
| Exercise 1.2, PDF p. 12 | Derive two estimators for one Gaussian objective, compare their moments, optimize a baseline, then test the implementation | Hold the target fixed while changing the method; separate an analytic claim from sampling error. |
| Exercise 4.2, PDF p. 45 | Derive a conditional velocity, obtain a flow map, examine a special case, and test composition and integration | Move between equivalent descriptions, then use a carefully chosen case to expose a mistaken identification. |
| Exercise 7.1, PDF p. 70 | Expand a finite return, compute a short trajectory, change its termination condition, then compare independent implementations | Make a boundary condition alter an observable answer and trace that change into code. |
| Exercise 9.2, PDF p. 90 | Derive a two-choice preference objective, solve it, examine extreme data, and change sequence normalization | Analyze the optimum and its existence; show how an implementation convention changes the objective. |

Across these examples, the subquestions share a mathematical object and build on earlier results. They alternate derivation, concrete calculation, interpretation, and verification. Special cases and counterexamples carry conceptual work. Programming, when present, checks a stated claim through an independent expression or controlled comparison.

## Apply the pattern

Choose a concrete system with enough structure for a complete solution. Establish the model and assumptions, work through the main argument, then vary a condition that changes the result. Ask the reader to explain the change and, where useful, verify it numerically. This sequence is a design option; omit steps that add no learning value.

For physics, the altered condition might be a symmetry, boundary, or scale. In engineering it might be a constraint, discretization, or noise model. In mathematics it might remove an assumption needed for existence or uniqueness. The shared question is what the original conclusion depended on.

Provide full reasoning in the solution, including units or domains, the decisive intermediate steps, and a check of the result. Separate hints from complete solutions when both are useful. Avoid making every chapter repeat the same number of subquestions or end with a coding task.
