# Examples

The [multimodal learning textbook](multimodal-learning/README.md) is the main reading example. The two smaller source examples show how a derivation, an exercise, its solution, and a numerical check fit together.

| Example | Teaching focus | Files |
| --- | --- | --- |
| Multimodal learning and reinforcement learning | A full Chinese textbook with worked examples, exercises, diagrams, and solutions | [PDF](multimodal-learning/textbook.pdf) |
| Finite-trajectory GAE | Termination, truncation, and a finite-return derivation | [PDF](gae/handout.pdf), [LaTeX](gae/main.tex), [tests](tests/test_gae.py) |
| Attention and Gaussian flow | Masked normalization, gradients, conditional velocity, and numerical integration | [PDF](attention-flow/handout.pdf), [LaTeX](attention-flow/main.tex), [tests](tests/test_attention_flow.py) |

The small examples share [math_core.py](code/math_core.py). To run their checks and compile the source, see [local helpers](../scripts/README.md).

Use these as examples of teaching decisions. Their subject matter, notation, chapter sequence, and computational requirements do not define the scope of the skill.
