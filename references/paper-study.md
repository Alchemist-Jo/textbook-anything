# From one paper to a systematic tutorial

Read the focal paper as a source of questions and dependencies. Its order was chosen to present a research contribution; a learner may need a different order to understand it.

## Establish what the paper assumes

Identify the task, objects, notation, training or optimization objective, algorithm, and evaluation claims. For every named method that does substantive work, find the relevant reference and determine what is inherited. Label a citation as a required prerequisite, a comparison, or optional context. A single sentence in the paper can contain an entire prerequisite lesson.

Default to a reader who is new to these specialized methods. Use the opening discussion to establish their actual mathematical and programming baseline. In the no-interview route, state a reasonable baseline in the brief and teach the necessary missing concepts from there.

Build a dependency map that connects the focal claim to the specific earlier concepts it uses. Follow the required chain until reaching that baseline. Stop following references when they no longer affect a learning outcome. Read the relevant sections of source papers, not only their abstracts or the focal paper's characterization.

If a paper says it uses GSPO, for example, inspect the cited method and the focal implementation. Determine which likelihood ratios, grouping conventions, and objective details the reader must understand, then teach those dependencies before explaining how the focal paper uses them. Do not infer the implementation merely from the method name. The source example is [Group Sequence Policy Optimization](https://arxiv.org/abs/2507.18071); this is a routing illustration, not a prescribed syllabus for other papers.

The same approach applies when a paper cites a finite-element discretization, a variational bound, or a particular statistical estimator. Explain the relevant objects and assumptions, derive the piece actually used, and then return to the focal method.

## Reconstruct the teaching argument

A useful sequence is: concrete problem; necessary foundations; prior approach; the limitation the new paper addresses; the new method; a worked case; evidence and limits; practice. Reorder or combine these parts when the reasoning requires it. Use [learning design](learning-design.md) to allocate emphasis.

Distinguish four kinds of statements in the prose: established background, an inherited method, the focal paper's contribution, and the tutorial's explanatory example. Maintain citation boundaries when connecting them. A teaching example may clarify a mechanism without being an experiment from the paper; label that distinction naturally.

Translate notation across papers carefully. Keep a short correspondence table when authors use different symbols for the same object or the same symbol for different objects. State any changed convention before combining formulas. Trace an implementation-specific reduction, normalization, or boundary rule back to the actual source.

## Read experiments as evidence

Explain the comparison, baseline, data, metric, and relevant conditions before interpreting the result. Separate what the authors report from what was reproduced locally. Show how a result bears on the paper's claim and which alternative explanations remain. A numerical toy example demonstrates its chosen case; it does not reproduce the paper's benchmark.

## Check transfer

End with a task that makes the reader use the central idea under a changed condition. They might derive a special case, identify a failure mode, compare a neighboring method, or implement a small controlled example. Supply a solution that explains the reasoning. A reader should leave with a model of the method, not only a memory of the paper's section titles.
