# textbook-anything

[English](README.md) | **简体中文**

[![v0.1](https://img.shields.io/badge/version-v0.1-315a66?style=flat-square)](https://github.com/Alchemist-Jo/textbook-anything/releases/latest) [![MIT](https://img.shields.io/badge/license-MIT-647467?style=flat-square)](LICENSE)

**把想学的内容，写成一份讲得明白、可以动手做题的教材。**

给一个主题，也可以附上课件、论文或已有讲义。textbook-anything 会根据读者基础安排章节，把公式的来由讲清楚，配上例题、图示和有联系的综合习题，最后交付 PDF 与可编辑源码。适合大学数学、物理、计算机和工程课程，可以写一整本，也可以只补好某一章。

[阅读 166 页示例教材](examples/multimodal-learning/textbook.pdf) · [安装](#安装) · [查看 skill](SKILL.md)

![示例教材的封面、推导与习题页面](assets/textbook-preview.png)

*《多模态学习与强化学习：理论、架构与实现》。[查看示例](examples/multimodal-learning/README.md)。*

起点也可以只有一篇论文。如果正文直接用到一个前置方法，教程会沿引用找到它，补足理解它所需的概念，再回到当前论文，说明继承了什么、改变了什么。默认按读者尚不熟悉这些专业背景来安排深度，开场用简短问答确认；GPT Pro 使用时可直接根据已有信息开始。

## 怎样编写

读者看懂一道例题之后，能否独立处理稍有变化的问题，是这份 skill 关心的事。因此，讲解、推导和习题会围绕同一个学习目标展开。

| 目的 | 方法论 | 评估 |
| --- | --- | --- |
| 确定讲解深度 | 用一两轮简短问答，明确读者已经会什么、希望学会什么 | 学习目标能否落实到具体的解释、推导或实现任务 |
| 安排知识顺序 | 对照教材、课程和关联论文，追查每个概念在哪里被后续内容使用 | 必需的先修是否已经讲到，前置方法与论文贡献是否分清 |
| 讲清正文与例题 | 从具体问题展开，在关键步骤解释为什么这样做，再说明结果的含义 | 读者能否跟上推理，公式之间是否缺少必要步骤 |
| 设计习题与解答 | 围绕同一对象改变条件，结合推导、极限、反例和数值验证 | 题目是否可解，答案是否完整，是否考察了理解与迁移 |
| 做好阅读与交付 | 准备环境，选择合适的图示，在 LaTeX 或 HTML 中制作并检查成品 | 解释、公式与图表是否清楚，屏幕与打印是否都好读，源码能否重新构建 |

随文练习帮助读者及时检查一个新概念；章末综合题则把前面学过的内容联系起来。比如，先求出一个模型的解，再改变边界条件，看结论怎样变化。需要编程时，让代码验证题目中的具体判断。[习题示范](references/exercise-models.md)中有更完整的说明。

全文先按学习目标分配篇幅，再完成两轮编写、成品检查与修订；依赖较深或仍有实质问题时增加第三轮。基础知识、核心方法、图示和习题都接受同样的检查。

## 安装

```sh
npx skills add Alchemist-Jo/textbook-anything --skill textbook-anything -g
```

按提示选择代理即可。教学流程、写作规范和交付说明都包含在这个 skill 中，无需另装配套 skill。

## 使用

推荐用法：安装此 skill 后，在网页端 GPT Pro 中使用。

直接说明主题、读者和想要的产物：

```text
使用 textbook-anything，为工科大二学生编写傅里叶分析一章。
读者已学微积分和线性代数。讲清关键推导，加入完整例题，
再设计一组相互关联的综合习题，解答单独编排。交付 LaTeX 与 PDF。
```

已有稿件也可以直接交给它：

```text
使用 textbook-anything 修订这些讲义。保留原有主题，补全关键推导，
把零散习题改成围绕同一问题展开的综合题，并提供完整解答。
沿用当前文档格式。
```

只想检查时，可以要求“先审查，不修改”，结果会标出具体章节和问题位置。

## 看看实例

仓库包含一份[完整教材](examples/multimodal-learning/textbook.pdf)，以及[有限轨迹 GAE](examples/gae/handout.pdf)、[注意力与条件流匹配](examples/attention-flow/handout.pdf)两份短篇实例。短篇附有 LaTeX 源码、数值代码和测试，方便查看推导、题目和实现如何对应。

<details>
<summary>展开查看：公式图示、综合习题与解答</summary>

![公式推导与计算图示](assets/example-derivations.png)

![综合习题与完整解答](assets/example-exercises.png)

</details>

[排版模板](references/typography.md)采用宋体正文、黑体标题，西文与数学使用配套字体。长公式按推理顺序换行，图中的符号与正文保持一致。也附有一个[HTML 教程示例](templates/tutorial.html)，用可调曲线、流程图和展开式解答展示同一内容的不同表示。环境缺失时先安装依赖；确实无法运行首选工具时，采用 HTML 等可用方案，保持讲解与可视化质量。PDF 构建和测试命令见[工具说明](scripts/README.md)。

论文原图会优先从 arXiv 源码包中查找，对照正文和图注选择，在许可范围内连同本地资产一起放入交付 ZIP。

## 接下来

目前是 v0.1，先把这版开放出来，欢迎试用。

- 内容：补充不同理工科课程的例子，把难懂的推导和章节联系讲得更清楚。
- 交付：改善字体、图示和分页，让 PDF 好读，源码也方便修改。
- 考察：调整题目难度与递进，完善提示、解答和评分依据。

如果某一步看不懂、某道题条件不足，或某页排版不舒服，欢迎附上具体位置[提个 issue](https://github.com/Alchemist-Jo/textbook-anything/issues)。

## 致谢与许可

这份 skill 的写作与教学设计参考了以下工作，感谢作者们的分享：

- [Sepia](https://github.com/Nanako0129/sepia)：贴合文体的语言表达、段落衔接和有变化的句子节奏。
- [Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills)：资料核查与科技写作中对论据、措辞和结论范围的处理。
- grilling：通过简短追问澄清读者基础与学习目标。
- [deepresearch-skill](https://github.com/WncFht/agent-basic-skill/tree/main/skills/deepresearch-skill)：多种来源的阅读方法，以及图表与正文的组织方式。
- [tensor-formula-viz](https://github.com/wdkns/wdkns-skills/blob/main/skills/tensor-formula-viz/SKILL.md)：张量运算、shape、维度语义与图形几何的对应表达。
- [Griffiths《电动力学导论》](https://assets.cambridge.org/97811084/20419/frontmatter/9781108420419_frontmatter.pdf)：随文练习与章末综合题的教学安排。

本项目采用 [MIT 许可](LICENSE)。外部作品保留各自许可。
