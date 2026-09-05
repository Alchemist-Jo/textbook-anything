# Writing that helps a reader understand

A textbook should sound like a knowledgeable teacher taking a question seriously. Give readers enough guidance to follow a difficult step, and enough room to think when the next step is within reach. Use the subject's normal terminology without making every sentence read like a definition.

The standard applies equally to LaTeX, HTML, PDF, figure labels, interactive explanations, and printed answers. Format choices should make the argument easier to read. They do not excuse terse fragments, missing conditions, decorative captions, or weaker explanations in a fallback.

## Let the explanation develop

Before writing a section, identify the question it answers and the point where the reader is likely to need help. Begin with the problem or the unfinished reasoning from the preceding section. Introduce a technical term when it helps answer that question, then use it consistently.

Give a paragraph a clear purpose: define an object, justify a step, compare alternatives, interpret a result, or explain a limitation. Connect paragraphs through the ideas themselves. A transition such as “The derivation assumed independent samples; we now need to account for their covariance” tells the reader what changes. “We will now explore this topic in greater depth” does not.

In a paper tutorial, explain an inherited method where the reader first needs it. Introduce the relevant objective or mechanism, connect it to the preceding foundations, then show what the focal paper retains or changes. A citation should support that explanation; it cannot supply the explanation by itself. Keep the paper's claims, established background, and tutorial examples distinguishable without repeatedly interrupting the lesson with production notes.

Allocate space according to conceptual difficulty and the [learning plan](learning-design.md). Spend time on why a method applies or why a tempting argument fails. Routine algebra may need only a line. Avoid giving every subsection the same length or repeating an introduction and a summary around every result. Re-read the whole document for balance: the core method should receive enough explanation after the foundations have been established.

## Guide the worked example

Set up the problem with enough context to see what is being asked. Explain the choice of method before calculating, pause at the decisive step, and interpret the answer when the calculation is done. Where useful, check a limiting case or compare a second route to the result.

An example should make the reasoning available, not narrate every keystroke. In the supplied attention example, the useful explanation is that the normalization denominator depends on the score being differentiated. Naming that dependence helps the reader understand the quotient rule and the terms that follow.

Solutions have a different rhythm from the first explanation. State the approach, show the needed steps, and answer the question asked. Refer back to an established result instead of repeating the whole lesson. Include an explanation when a sign, boundary condition, or non-unique solution could otherwise seem surprising.

## Write natural technical sentences

Use concrete subjects and verbs. Replace a nominal phrase when the verb says the same thing more directly. Keep enough variation in sentence length to match the argument: a longer sentence can carry a condition and its consequence; a short sentence can settle a point. Uniformly clipped prose is tiring too.

Repeat a technical noun when a pronoun could refer to several objects. Keep familiar technical terms rather than cycling through near-synonyms. Use lists for parallel items or procedures, and connected prose for an argument.

For Chinese, prefer “讨论”“计算”“比较” to padded forms such as “进行讨论” or “开展比较分析”. Remove accumulated connective words, but retain “因此” when it marks a real implication. A direct question can introduce a conceptual difficulty when answering it advances the lesson. Do not manufacture a question at the start of every paragraph.

For English, write the proposition in natural English order rather than mirroring a Chinese sentence. Use “we” for a derivation the reader is following when it sounds natural, without beginning every sentence that way. Keep formal language where precision requires it; avoid promotional adjectives and elaborate synonyms for ordinary actions.

## Match the wording to its place

| Passage | What the language should do |
| --- | --- |
| Opening | Give the reader a concrete reason to study the section. |
| Derivation | Explain the transformations that require judgment or a new assumption. |
| Worked example | Make the choice of method and interpretation visible. |
| Exercise | State the setting and task precisely while leaving the reasoning to the reader. |
| Solution | Resolve every part, with enough intermediate work to learn from an error. |
| Figure caption | Explain what the relationships or encodings show and where the reader should look. |
| README or announcement | Say what people can try and where to find it, in a more conversational register. |

For a figure, replace a caption such as “The figure shows the calculation process” with the actual relationship: “The shared axis is summed out; the output retains the query and channel axes.” Labels, captions, and surrounding prose should each add something rather than repeat the same sentence.

## Edit without changing the claim

Before revising, identify the factual statements, mathematical conditions, numerical values, quotations, and conclusions that must remain intact. Diagnose the actual problem in the passage, then repair the argument, paragraph connections, and sentences in that order. Remove repetition before adding explanation; add only the explanation the reasoning needs.

Read the revision beside the source. An edit must not turn an approximation into an identity, remove a condition, change a quantity, or strengthen an empirical conclusion. If a substantive correction is needed, treat it as a content change and explain it outside the teaching text.

Finish by reading the whole requested scope, including captions, problems, and answers. Look for vague openings, repetitive sentence frames, unsupported causal language, unnecessary summaries, and strings of sentences with the same rhythm. Correct the passages where these habits obscure the meaning. Do not inject mistakes, anecdotes, slang, or invented results to make the writing seem more personal.

Keep working notes and editing history outside the textbook. References and scientifically meaningful limitations belong where the reader needs them. Public descriptions should introduce the material itself, without claims of popularity, completeness, or quality that the project has not established.
