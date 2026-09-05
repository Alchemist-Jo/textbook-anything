# Derivations

Help the reader see why each important step follows. Before a long chain of equations, state what it will establish. At a change of variable, conditional expectation, or optimization step, explain the reason at the point of use. Finish by connecting the expression to the original question.

For each important argument, establish the quantity sought, the objects and their domains, the assumptions, the starting result, and the justification for each non-obvious transformation. State the conclusion with its range of validity. Definitions can be given directly.

Distinguish identities, approximations, bounds, objectives, and implementation conventions. An approximation needs a regime or error argument. An empirical observation needs experimental conditions. Neither should appear as an unconditional equality or theorem.

Check the properties the actual argument uses:

- Units, dimensions, signs, indexing, and normalization.
- Existence and uniqueness before presenting a unique solution.
- Invertibility before using an inverse; boundary conditions before solving a differential equation.
- The distribution of an expectation and the conditions for exchanging limits, sums, integrals, or derivatives.
- Whether a special case or local update has been mistaken for a general solution.

Select checks that could expose a plausible error in this derivation. An analytic special case, an alternative formulation, a dimensional argument, or a numerical comparison can provide useful evidence. A finite set of examples cannot establish a general theorem, and automatic differentiation can agree with an incorrectly specified objective.

Keep notation consistent across the explanation, figure, exercise, solution, and implementation. Define a reused symbol locally when its meaning changes.
