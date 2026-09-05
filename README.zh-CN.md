# textbook-anything

[English](README.md) | **简体中文**

[![v0.1](https://img.shields.io/badge/version-v0.1-315a66?style=flat-square)](https://github.com/Alchemist-Jo/textbook-anything/releases/tag/v0.1.0) [![MIT](https://img.shields.io/badge/license-MIT-647467?style=flat-square)](LICENSE)

**面向大学理工科，从读者基础到完整解答，编写可以独立学习的教材。**

把一个主题、一份课纲或一组论文整理成连贯的教学材料：知识有先后，推导有依据，习题能检验理解。适用于全书编写、单章扩写和已有讲义修订。

[阅读示例教材](examples/multimodal-learning/textbook.pdf) · [安装](#安装) · [查看 skill](SKILL.md)

![示例教材的封面、推导与习题页面](assets/textbook-preview.png)

*《多模态学习与强化学习：理论、架构与实现》，中文，166 页。[示例说明](examples/multimodal-learning/README.md)。*

## 工作方式

先明确读者已经掌握什么，以及读完后应当能够解释、推导或实现什么。各阶段复用已有 skill：

| 阶段 | 方法 | 产物 |
| --- | --- | --- |
| 读者基础与学习目标 | 简短的 `grilling` 问答 | 明确的先修基础与学习目标 |
| 知识范围与先修关系 | `deep-research` | 经核查的来源与知识依赖关系 |
| 正文与例题 | `sepia` 的专业写作规则 | 保留技术条件、推理连贯的讲解 |
| 习题与解答 | Griffiths 的教学结构与所附题目示范 | 随文练习、综合题及完整解答 |
| 交付 | 适用的文档、绘图 skill 与本地工具 | 可编辑稿件及所需的 PDF、代码或图示 |

习题分为及时检查新概念的随文题，以及联系多个知识点的章末综合题。综合题围绕同一对象组织推导、条件变化、极限或反例分析，并在适合时用数值计算验证。[题目设计参考](references/exercise-models.md)分别说明了 Griffiths《电动力学导论》和所附教材提供的启发。

适用范围包括大学数学、物理、计算机与工程课程。符号、例子和实验要求随学科确定，多模态学习是仓库中的一个示例。

## 安装

使用 [Skills CLI](https://github.com/vercel-labs/skills)：

```sh
npx skills add Alchemist-Jo/textbook-anything --skill textbook-anything -g
```

按提示选择代理。若想先查看可安装内容，将 `-g` 换成 `--list`。仓库只有一个正式入口 `SKILL.md`，也可以将完整目录放入代理支持的 skill 目录。

配套 skill 单独安装。优先复用环境中已有的 `grilling`、`deep-research` 和 `sepia`。[Sepia](https://github.com/Nanako0129/sepia) 与 [Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills) 提供各自的安装说明。各配套 skill 均通过完整入口调用。多种来源整合为研究文档时，可复用 [deepresearch-skill](https://github.com/WncFht/agent-basic-skill/tree/main/skills/deepresearch-skill) 的交付流程。[协作约定](references/skill-composition.md)说明各自的职责。

## 使用

指定 `textbook-anything`，附上已有材料。在使用美元符号调用 skill 的代理中，可以这样写：

```text
使用 $textbook-anything，为工科大二学生编写傅里叶分析一章。
读者已学微积分和线性代数。先研究先修关系，讲清关键推导，
加入完整例题和相互关联的综合习题，解答单独编排。交付 LaTeX 与 PDF。
```

| 请求 | 处理范围 |
| --- | --- |
| 编写 | 从主题和资料形成全书或章节。 |
| 扩写 | 补充缺失的解释、推导、例题或习题。 |
| 修订 | 调整结构与内容，同步修改受影响的引用和配套材料。 |
| 审查 | 给出带位置的问题，不修改原稿。 |

这些都是对同一个 skill 的自然语言请求，无需记忆额外命令。

修订已有稿件时，说明保留范围和主要问题即可：

```text
使用 textbook-anything 修订这些讲义。保留原有主题，补全关键推导，
把零散习题改成围绕同一问题展开的综合题，并提供完整解答。
沿用当前文档格式。
```

## 示例与工具

除[完整教材](examples/multimodal-learning/textbook.pdf)外，仓库还保留了[有限轨迹 GAE](examples/gae/main.tex)和[注意力与高斯流](examples/attention-flow/main.tex)两份短篇 LaTeX 示例，附共享数值代码和测试。[排版模板](references/typography.md)采用宋体正文、黑体标题，以及配套的西文与数学字体，为推导、图示和习题留出清晰的阅读层次。

[阅读 GAE 示例](examples/gae/handout.pdf) · [阅读注意力与流匹配示例](examples/attention-flow/handout.pdf)

<details>
<summary>查看两份排版实例</summary>

![公式推导与计算图示](assets/example-derivations.png)

![综合习题与完整解答](assets/example-exercises.png)

</details>

```sh
python3 scripts/check_skill.py
python3 -m unittest discover -s examples/tests -v
```

以上命令只需要 Python 标准库。PDF 编译需要 XeLaTeX，页面渲染需要 PyMuPDF。构建命令与依赖见[本地工具说明](scripts/README.md)。

## 目录

```text
textbook-anything/
├── SKILL.md                 # 教学流程与任务分流
├── references/              # 资料、语言、习题与交付细则
├── templates/               # 项目简表与理工科排版模板
├── examples/                # 教材 PDF、短篇源码、代码与测试
├── scripts/                 # 目录检查、PDF 编译与页面渲染
└── agents/openai.yaml       # 展示信息
```

## v0.1

这是首个公开版本。后续围绕三个方向改进：

- **内容：**补充理工科示例，改善讲解深度与章节联系。
- **交付：**完善文档模板、图示排版与源码构建方式。
- **考察：**改进题目递进、提示、解答与评分标准。

反馈问题时，请附上章节或题号、具体问题，以及有助于判断的来源或推导。[提交 issue](https://github.com/Alchemist-Jo/textbook-anything/issues)。

## 致谢与许可

[Sepia](https://github.com/Nanako0129/sepia)提供了语言处理与仓库布局参考。先修研究复用 [Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills) 中的 `deep-research`。习题组织借鉴 [Griffiths 的前言](https://assets.cambridge.org/97811084/20419/frontmatter/9781108420419_frontmatter.pdf)与作者提供的教材。文档交付参考了 [deepresearch-skill](https://github.com/WncFht/agent-basic-skill/tree/main/skills/deepresearch-skill)。配套 skill 和外部来源保留各自许可，本仓库不打包其原文。

[MIT](LICENSE)。
