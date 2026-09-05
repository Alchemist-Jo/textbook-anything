# textbook-anything

**English** | [简体中文](README.zh-CN.md)

[![v0.1](https://img.shields.io/badge/version-v0.1-315a66?style=flat-square)](https://github.com/Alchemist-Jo/textbook-anything/releases/latest) [![MIT](https://img.shields.io/badge/license-MIT-647467?style=flat-square)](LICENSE)

**Turn something you want to learn into a textbook you can read, work through, and build on.**

Start with a topic, or bring lecture slides, papers, and unfinished notes. textbook-anything arranges the material around the reader's background, explains where the equations come from, and develops examples and connected exercises with full solutions. It produces a PDF and editable source for university mathematics, physics, computing, and engineering. A single chapter is a good place to start; a whole book is within scope too.

[Read the 166-page example](examples/multimodal-learning/textbook.pdf) · [Install](#install) · [Open the skill](SKILL.md)

![Pages from the example textbook](assets/textbook-preview.png)

*Multimodal Learning and Reinforcement Learning: Theory, Architectures, and Implementation. In Chinese. [See the example](examples/multimodal-learning/README.md).*

## How it works

After following a worked example, can the reader solve a related problem with a different assumption? That question guides the explanations, derivations, and exercises.

| Purpose | Methodology | Evaluation |
| --- | --- | --- |
| Choose the right depth | Ask one or two focused questions about prior knowledge and the intended outcome | Can the goal be expressed as something the reader can explain, derive, or implement? |
| Establish the learning sequence | Compare textbooks, courses, and primary sources; trace where each prerequisite is used | Are necessary ideas introduced in time, and are new claims supported? |
| Explain the material | Begin with a concrete problem, explain the important choices, and interpret the result | Can the reader follow the reasoning without supplying a missing argument? |
| Develop exercises and solutions | Reuse a setting while changing assumptions, checking limits, constructing counterexamples, or testing numerically | Is the problem solvable, is the solution complete, and does it test transferable understanding? |
| Prepare the document | Keep notation and typography consistent, then compile and inspect the pages | Are equations and figures readable, and can the source be rebuilt? |

Short exercises give readers a chance to check a new idea while it is still fresh. Longer chapter problems connect several ideas. A problem might first ask for a model's solution, then change a boundary condition and ask what follows. Code earns its place by checking a specific mathematical claim. The [exercise examples](references/exercise-models.md) show this in more detail.

## Install

```sh
npx skills add Alchemist-Jo/textbook-anything --skill textbook-anything -g
```

Choose your agent when prompted. The teaching workflow, writing guidance, and delivery instructions are included; no companion skills need to be installed.

## Use

Describe the topic, the reader, and the result you want:

```text
Use textbook-anything to write a chapter on Fourier analysis for
second-year engineering students who know calculus and linear algebra.
Explain the key derivations, include worked examples, and develop a connected
problem set with separate solutions. Deliver LaTeX and PDF.
```

Or bring an existing draft:

```text
Use textbook-anything to revise these course notes. Keep the original topics,
fill in missing derivation steps, and turn the scattered exercises into
connected problems with complete solutions. Preserve the document format.
```

For a review without edits, ask it to identify problems and their locations before changing the source.

## See the examples

The repository includes a [full textbook](examples/multimodal-learning/textbook.pdf) and two short examples: [finite-trajectory GAE](examples/gae/handout.pdf) and [attention with conditional flow matching](examples/attention-flow/handout.pdf). The short examples include LaTeX source, numerical code, and tests so you can follow the connection between an argument, a problem, and its implementation.

<details>
<summary>Open the examples: equations, diagrams, problems, and solutions</summary>

![Equations and computation](assets/example-derivations.png)

![Problems and worked solutions](assets/example-exercises.png)

</details>

The [typesetting template](references/typography.md) uses serif body text, sans-serif headings, and matching Latin and mathematical fonts. Equations break at logical steps, and figure labels follow the notation in the text. Build and test commands are in the [tool guide](scripts/README.md).

## What's next

This is v0.1, ready for people to try.

- Content: add examples from more STEM courses and improve difficult explanations and chapter connections.
- Delivery: refine fonts, diagrams, and pagination, and make the source easier to edit.
- Assessment: improve problem progression, hints, solutions, and marking guidance.

If an explanation loses you, a problem is missing a condition, or a page is awkward to read, [open an issue](https://github.com/Alchemist-Jo/textbook-anything/issues) with the relevant location.

## Acknowledgments and license

Thanks to the authors of these works for the writing and teaching ideas that informed this skill:

- [Sepia](https://github.com/Nanako0129/sepia): prose suited to its audience, paragraph flow, and varied sentence rhythm.
- [Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills): source verification and scientific writing that keeps claims aligned with evidence.
- grilling: focused questions about the reader's background and learning goals.
- [deepresearch-skill](https://github.com/WncFht/agent-basic-skill/tree/main/skills/deepresearch-skill): reading mixed source formats and bringing figures into the explanation.
- [tensor-formula-viz](https://github.com/wdkns/wdkns-skills/blob/main/skills/tensor-formula-viz/SKILL.md): clear relationships between tensor operations, shapes, dimension meanings, and diagram geometry.
- [Griffiths's Introduction to Electrodynamics](https://assets.cambridge.org/97811084/20419/frontmatter/9781108420419_frontmatter.pdf): the placement of immediate practice and broader chapter problems.

This project uses the [MIT license](LICENSE). Referenced works retain their own licenses.
