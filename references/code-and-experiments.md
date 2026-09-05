# Code and experiments

Give code a specific question to answer. A small implementation can show how a formula acts on data or reveal a numerical issue that is difficult to see symbolically. Keep the relevant operations visible, explain their connection to the mathematics, and separate them from data loading or environment setup.

State the interface, input domain, units or shapes, output meaning, and relevant numerical conventions. For stochastic work, record the seed and independent sampling unit. For differentiable models, explain which parameters are updated and where gradients stop.

Choose tests with an independent basis: an analytic result, a conserved quantity, a direct small-case calculation, or another formulation. Test the boundaries the lesson actually discusses. A test that repeats the implementation's formula may repeat its mistake.

Record the command, dependencies, result, and relevant configuration for actual runs. Distinguish these claims:

| Evidence | Supported statement |
| --- | --- |
| Unit or numerical test | The tested cases match the stated expectation. |
| Small integration run | The selected components run together. |
| Controlled experiment | The observed difference occurred under the stated protocol. |
| Full training or performance measurement | The reported result was measured with those resources and settings. |

None of these proves an arbitrary theorem or establishes performance in untested settings.

For an experiment, specify the comparison, data split, independent unit, budget, selection rule, and evaluation metric. Use a control that separates the main competing explanations. Keep correlated observations together when splitting data, and report uncertainty at the appropriate unit.

If computation is unavailable, supply runnable instructions or a clearly labeled proposal. Do not turn expected numbers into results. Keep external downloads, paid compute, and uploads within the user's authorized scope.
