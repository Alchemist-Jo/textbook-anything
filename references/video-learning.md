# Video and course acquisition

Read for video input. This adapts youtube-render-pdf's acquisition and visual-selection standards to a tutorial in the requested format.

## Acquire before writing

Inspect title, author, date, duration, chapters, official cover, subtitle tracks and usable formats. For a series, establish lecture order and distinguish published notes from available recordings.

Use the platform, official course page and existing download tools. Prefer manual subtitles, then the best matching automatic track. Preserve timestamps and correct ASR only with supporting context, audio or frames. If no subtitles exist, use an available transcription tool and identify its origin.

With an existing yt-dlp, probe before choosing a subtitle or download format:

~~~sh
yt-dlp --dump-single-json --skip-download "VIDEO_URL" > video.json
yt-dlp --list-subs --list-formats "VIDEO_URL"
~~~

If the extractor cannot access this platform, inspect the official course page, platform metadata or supplied local material. Once video and timed subtitles are available, use ffmpeg to generate interval candidates in batches.

Probe formats before selecting the highest resolution that can actually be downloaded. Acquire the video or relevant segments when visual inspection is needed. Keep metadata, timed subtitles, cover and selected frames locally; raw large videos need not enter the delivery archive.

Use the original cover near the opening when available. A user-supplied design reference is not evidence for the course's claims.

## Segment and integrate

Split videos longer than 20 minutes or with more than 300 subtitle entries. Prefer chapters or coherent concepts, with a small overlap when reasoning crosses boundaries.

Retain each segment's goal, claims, operations, formulas/code, required visuals and times, and uncertainties. Share notation and coverage notes across lectures. Integrate one teaching sequence and deduplicate repeated material.

Preserve informative examples, demonstrations, limitations and substantive closing discussion. Omit greetings, advertisements and routine course logistics. Quote only short dialogue whose wording contributes to understanding, with speaker and time.

## Select frames through direct inspection

1. Locate the concept using timed subtitles and generate several dense candidates within and near that interval.
2. Use contact sheets for search, then inspect the actual candidate images or crops. OCR, filenames and nearby narration do not establish visual content.
3. Compare neighboring candidates. Every element described in the prose must be visible. Prefer the final complete readable state of a progressive slide, board or animation.
4. Crop, enlarge or separate figures when needed. Keep intermediate states only when they teach a distinct operation.
5. Name raw candidates by timestamp; assign semantic names only after visual confirmation.

Choose figure count by explanatory coverage. Omit repetition without deleting necessary visual steps.

## Keep provenance useful

Beside each frame or crop, record the lecture, the subtitle interval used for search, and the actual frame time. Distinguish the search interval from the duration of a visual state. Record video ID and part number when relevant.

Link the original recording or a verified timestamp link. If exact seeking was not verified, retain the text time and recording link without claiming precision.

Identify official covers, redrawn diagrams and teaching simulations. Keep necessary time and conditions visible beside the figure; consolidate repeated production details elsewhere.
