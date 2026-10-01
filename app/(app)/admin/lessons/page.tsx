"use client"

import { useMemo, useRef, useState, useTransition } from "react"
import Link from "next/link"
import useSWR from "swr"
import {
  ArrowDown,
  ArrowUp,
  Bold,
  CircleCheck,
  CircleDashed,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  GripVertical,
  Heading2,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Plus,
  Quote,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  Video,
} from "lucide-react"
import { PageHeader, Card, Badge, Button, Input } from "@/components/ui"
import { RichText } from "@/components/rich-text"
import { courses, type KnowledgeQuestion, type Lesson, type TermItem } from "@/lib/data"
import { parseVideoSource, WATCH_THRESHOLD } from "@/lib/video"
import { YouTubePlayer } from "@/components/youtube-player"
import {
  isVideoFreeCourse,
  lessonKey,
  type LessonAttachment,
  type LessonContentRow,
  type LessonImage,
  type LessonStatus,
} from "@/lib/lesson-content"
import {
  deleteLessonVideo,
  listLessonContent,
  listLessonOrder,
  saveLessonContent,
  saveLessonOrder,
  setLessonStatus,
  uploadLessonAsset,
} from "@/app/actions/videos"
import { applyLessonOrder } from "@/lib/lesson-content"
import { cn } from "@/lib/utils"

const sortedCourses = courses.slice().sort((a, b) => a.order - b.order)
const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

export default function AdminLessonsPage() {
  const [courseSlug, setCourseSlug] = useState(sortedCourses[0]?.slug ?? "")
  const course = sortedCourses.find((c) => c.slug === courseSlug)
  const { data: order, mutate: mutateOrder } = useSWR(courseSlug ? ["lesson-order", courseSlug] : null, () =>
    listLessonOrder(courseSlug),
  )
  const lessonOptions = useMemo(
    () =>
      (course?.modules ?? []).flatMap((m) =>
        applyLessonOrder(m.lessons, order?.[m.id]).map((l) => ({
          key: lessonKey(m.id, l.id),
          moduleTitle: m.title,
          lesson: l,
        })),
      ),
    [course, order],
  )
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const current = lessonOptions.find((o) => o.key === selectedKey) ?? lessonOptions[0]

  const { data: rows, mutate } = useSWR(courseSlug ? ["lesson-content", courseSlug] : null, () =>
    listLessonContent(courseSlug),
  )
  const rowByKey = useMemo(() => new Map((rows ?? []).map((r) => [r.lessonKey, r])), [rows])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Lesson content"
        subtitle="Edit every lesson's video, images, training notes, vocabulary, PDFs, and quiz. Publish when ready — drafts stay hidden from learners."
      />

      <Card className="grid gap-4 p-5 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Course
          <select
            className={fieldClass}
            value={courseSlug}
            onChange={(e) => {
              setCourseSlug(e.target.value)
              setSelectedKey(null)
            }}
          >
            {sortedCourses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Lesson
          <select
            className={fieldClass}
            value={current?.key ?? ""}
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            {lessonOptions.map((o) => {
              const row = rowByKey.get(o.key)
              const flag = row ? (row.status === "draft" ? " (draft)" : " (edited)") : ""
              return (
                <option key={o.key} value={o.key}>
                  {o.moduleTitle} — {o.lesson.title}
                  {flag}
                </option>
              )
            })}
          </select>
        </label>
      </Card>

      {course ? (
        <LessonOrderPanel
          key={`${courseSlug}:${JSON.stringify(order ?? {})}`}
          courseSlug={courseSlug}
          modules={course.modules}
          order={order ?? {}}
          selectedKey={current?.key}
          onSelect={setSelectedKey}
          onSaved={() => mutateOrder()}
        />
      ) : null}

      {course && current ? (
        <LessonEditor
          key={`${courseSlug}:${current.key}:${rowByKey.get(current.key)?.updatedAt ?? "default"}`}
          courseSlug={courseSlug}
          lessonKeyValue={current.key}
          lesson={current.lesson}
          row={rowByKey.get(current.key)}
          videoFree={isVideoFreeCourse(courseSlug)}
          onSaved={() => mutate()}
        />
      ) : (
        <Card className="p-6 text-sm text-muted-foreground">This course has no lessons yet.</Card>
      )}
    </div>
  )
}

function LessonEditor({
  courseSlug,
  lessonKeyValue,
  lesson,
  row,
  videoFree,
  onSaved,
}: {
  courseSlug: string
  lessonKeyValue: string
  lesson: Lesson
  row?: LessonContentRow
  videoFree: boolean
  onSaved: () => void
}) {
  const [videoUrl, setVideoUrl] = useState(row?.videoUrl ?? lesson.videoUrl ?? "")
  const [extraVideos, setExtraVideos] = useState<string[]>(
    row?.extraVideos.length ? row.extraVideos : (lesson.extraVideos ?? []),
  )
  const [requiredPercent, setRequiredPercent] = useState(
    String(row?.requiredPercent ?? lesson.requiredPercent ?? WATCH_THRESHOLD),
  )
  const [body, setBody] = useState(row?.body ?? (lesson.content ?? []).join("\n\n"))
  const [images, setImages] = useState<LessonImage[]>(row?.images.length ? row.images : (lesson.images ?? []))
  const [vocabulary, setVocabulary] = useState<TermItem[]>(
    row?.vocabulary.length ? row.vocabulary : (lesson.terminology ?? []),
  )
  const [quiz, setQuiz] = useState<KnowledgeQuestion[]>(row?.quiz.length ? row.quiz : (lesson.knowledgeCheck ?? []))
  const [attachments, setAttachments] = useState<LessonAttachment[]>(
    row?.attachments.length ? row.attachments : (lesson.attachments ?? []),
  )
  const [preview, setPreview] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const previewId = parseVideoSource(videoUrl || null).videoId
  const videoInvalid = Boolean(videoUrl.trim()) && !previewId

  function save(status: LessonStatus) {
    setMessage(null)
    startTransition(async () => {
      const res = await saveLessonContent({
        courseSlug,
        lessonKey: lessonKeyValue,
        videoUrl,
        extraVideos,
        requiredPercent: Number(requiredPercent),
        body,
        images,
        vocabulary,
        quiz,
        attachments,
        status,
      })
      setMessage({ ok: res.ok, text: res.ok ? (res.message ?? "Saved.") : (res.error ?? "Save failed.") })
      if (res.ok) onSaved()
    })
  }

  function toggleStatus(status: LessonStatus) {
    setMessage(null)
    startTransition(async () => {
      const res = await setLessonStatus(courseSlug, lessonKeyValue, status)
      setMessage({ ok: res.ok, text: res.ok ? (res.message ?? "Updated.") : (res.error ?? "Update failed.") })
      if (res.ok) onSaved()
    })
  }

  function reset() {
    if (!row) return
    if (!window.confirm("Discard all edits for this lesson and restore the default content?")) return
    startTransition(async () => {
      const res = await deleteLessonVideo(courseSlug, lessonKeyValue)
      setMessage({ ok: res.ok, text: res.ok ? "Restored the default lesson content." : (res.error ?? "Reset failed.") })
      if (res.ok) onSaved()
    })
  }

  function wrapSelection(before: string, after = before, linePrefix = false) {
    const el = bodyRef.current
    if (!el) return
    const { selectionStart: s, selectionEnd: e } = el
    const selected = body.slice(s, e)
    const next = linePrefix
      ? body.slice(0, s) +
        (selected || "Text")
          .split("\n")
          .map((l) => before + l)
          .join("\n") +
        body.slice(e)
      : body.slice(0, s) + before + (selected || "text") + after + body.slice(e)
    setBody(next)
    requestAnimationFrame(() => el.focus())
  }

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-lg font-semibold text-balance">{lesson.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {row ? (
              row.status === "draft" ? (
                <Badge tone="amber">
                  <CircleDashed className="h-3 w-3" /> Draft — not visible to learners
                </Badge>
              ) : (
                <Badge tone="green">
                  <CircleCheck className="h-3 w-3" /> Published
                </Badge>
              )
            ) : (
              <Badge tone="muted">Default content</Badge>
            )}
            {row?.updatedAt ? <span>Last saved {new Date(row.updatedAt).toLocaleString()}</span> : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {row ? (
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => toggleStatus(row.status === "draft" ? "published" : "draft")}
            >
              {row.status === "draft" ? (
                <>
                  <CircleCheck className="h-4 w-4" /> Publish
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4" /> Unpublish
                </>
              )}
            </Button>
          ) : null}
          <Link
            href={`/courses/${courseSlug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Open course <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>

      {/* 1. Video */}
      <EditorSection icon={Video} title="Video">
        {videoFree ? (
          <p className="text-sm text-muted-foreground">
            This course is delivered as text, images, and quizzes. Video is not used or required.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=…"
                aria-label="YouTube video URL"
                aria-invalid={videoInvalid}
              />
              {videoUrl.trim() ? (
                <Button variant="outline" onClick={() => setVideoUrl("")} aria-label="Remove video">
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              ) : null}
            </div>
            {videoInvalid ? (
              <p className="text-xs text-destructive">
                {"Only YouTube videos are supported. Paste a full YouTube link (youtube.com/watch?v=… or youtu.be/…)."}
              </p>
            ) : previewId ? (
              <div className="flex flex-col gap-1.5">
                <YouTubePlayer key={previewId} videoId={previewId} title={lesson.title} />
                <p className="text-xs text-muted-foreground">
                  Preview of the learner player. Learners watch inside the lesson and must reach the required watch
                  percentage to continue. Save, then publish to make changes live.
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Paste a YouTube link. It is embedded at the top of the lesson; only the link is stored.
              </p>
            )}

            <div className="flex flex-col gap-3 border-t border-border pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">Additional videos</p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!videoUrl.trim() || extraVideos.length >= 10}
                  onClick={() => setExtraVideos((v) => [...v, ""])}
                >
                  <Plus className="h-4 w-4" /> Add video
                </Button>
              </div>
              {extraVideos.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Optional. Extra YouTube videos play in order below the main video.
                </p>
              ) : (
                extraVideos.map((url, i) => {
                  const id = parseVideoSource(url || null).videoId
                  const invalid = Boolean(url.trim()) && !id
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          value={url}
                          onChange={(e) =>
                            setExtraVideos((v) => v.map((x, j) => (j === i ? e.target.value : x)))
                          }
                          placeholder={`Video ${i + 2} YouTube link`}
                          aria-label={`Additional video ${i + 1} URL`}
                          aria-invalid={invalid}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={i === 0}
                          onClick={() =>
                            setExtraVideos((v) => {
                              const n = [...v]
                              ;[n[i - 1], n[i]] = [n[i], n[i - 1]]
                              return n
                            })
                          }
                          aria-label={`Move additional video ${i + 1} up`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExtraVideos((v) => v.filter((_, j) => j !== i))}
                          aria-label={`Remove additional video ${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {invalid ? (
                        <p className="text-xs text-destructive">Not a valid YouTube link.</p>
                      ) : id ? (
                        <YouTubePlayer key={id} videoId={id} title={`${lesson.title} (video ${i + 2})`} />
                      ) : null}
                    </div>
                  )
                })
              )}
            </div>

            <label className="flex flex-wrap items-center gap-3 border-t border-border pt-3 text-sm">
              <span className="font-medium text-foreground">Required viewing</span>
              <Input
                type="number"
                min={10}
                max={100}
                step={5}
                value={requiredPercent}
                onChange={(e) => setRequiredPercent(e.target.value)}
                className="w-24"
                aria-describedby="required-viewing-hint"
              />
              <span id="required-viewing-hint" className="text-xs text-muted-foreground">
                % of each video a learner must watch before continuing (default {WATCH_THRESHOLD}%).
              </span>
            </label>
          </div>
        )}
      </EditorSection>

      {/* 2. Images */}
      <EditorSection icon={ImageIcon} title="Images & diagrams" hint="Shown directly below the video.">
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of storage-hosted image */}
              <img
                src={img.url || "/placeholder.svg"}
                alt={img.caption || `Image ${i + 1}`}
                className="h-24 w-full rounded-md border border-border bg-muted object-contain sm:w-36"
              />
              <div className="flex flex-1 flex-col gap-2">
                <Input
                  value={img.url}
                  onChange={(e) => setImages(updateAt(images, i, { ...img, url: e.target.value }))}
                  placeholder="Image URL"
                  aria-label={`Image ${i + 1} URL`}
                />
                <Input
                  value={img.caption ?? ""}
                  onChange={(e) => setImages(updateAt(images, i, { ...img, caption: e.target.value }))}
                  placeholder="Caption (optional)"
                  aria-label={`Image ${i + 1} caption`}
                />
              </div>
              <RowControls
                onUp={i > 0 ? () => setImages(move(images, i, -1)) : undefined}
                onDown={i < images.length - 1 ? () => setImages(move(images, i, 1)) : undefined}
                onRemove={() => setImages(images.filter((_, j) => j !== i))}
              />
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <UploadButton
              courseSlug={courseSlug}
              kind="image"
              accept="image/png,image/jpeg"
              label="Upload image"
              onUploaded={(url) => setImages([...images, { url }])}
              onError={(text) => setMessage({ ok: false, text })}
            />
            <Button variant="ghost" size="sm" onClick={() => setImages([...images, { url: "" }])}>
              <Plus className="h-4 w-4" /> Add by URL
            </Button>
          </div>
        </div>
      </EditorSection>

      {/* 3. Training notes */}
      <EditorSection
        icon={FileText}
        title="Training notes"
        action={
          <Button variant="ghost" size="sm" onClick={() => setPreview((p) => !p)} aria-pressed={preview}>
            <Eye className="h-4 w-4" /> {preview ? "Edit" : "Preview"}
          </Button>
        }
      >
        {preview ? (
          <div className="rounded-lg border border-border p-4">
            {body.trim() ? <RichText text={body} /> : <p className="text-sm text-muted-foreground">Nothing yet.</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1" role="toolbar" aria-label="Formatting">
              <ToolbarButton label="Heading" icon={Heading2} onClick={() => wrapSelection("## ", "", true)} />
              <ToolbarButton label="Bold" icon={Bold} onClick={() => wrapSelection("**")} />
              <ToolbarButton label="Italic" icon={Italic} onClick={() => wrapSelection("*")} />
              <ToolbarButton label="Bulleted list" icon={List} onClick={() => wrapSelection("- ", "", true)} />
              <ToolbarButton label="Numbered list" icon={ListOrdered} onClick={() => wrapSelection("1. ", "", true)} />
              <ToolbarButton label="Callout" icon={Quote} onClick={() => wrapSelection("> ", "", true)} />
            </div>
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className={cn(fieldClass, "font-mono leading-relaxed")}
              aria-label="Training notes"
              placeholder="Write the lesson notes. Use the toolbar for headings, bold text, and lists."
            />
          </div>
        )}
      </EditorSection>

      {/* 4. Vocabulary */}
      <EditorSection icon={List} title="Vocabulary">
        <div className="flex flex-col gap-3">
          {vocabulary.map((t, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row">
              <Input
                className="sm:w-56"
                value={t.term}
                onChange={(e) => setVocabulary(updateAt(vocabulary, i, { ...t, term: e.target.value }))}
                placeholder="Term"
                aria-label={`Term ${i + 1}`}
              />
              <Input
                className="flex-1"
                value={t.definition}
                onChange={(e) => setVocabulary(updateAt(vocabulary, i, { ...t, definition: e.target.value }))}
                placeholder="Definition"
                aria-label={`Definition ${i + 1}`}
              />
              <RowControls onRemove={() => setVocabulary(vocabulary.filter((_, j) => j !== i))} />
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() => setVocabulary([...vocabulary, { term: "", definition: "" }])}
          >
            <Plus className="h-4 w-4" /> Add term
          </Button>
        </div>
      </EditorSection>

      {/* 5. PDF attachments */}
      <EditorSection icon={FileText} title="PDF attachments">
        <div className="flex flex-col gap-3">
          {attachments.map((a, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center">
              <Input
                className="flex-1"
                value={a.name}
                onChange={(e) => setAttachments(updateAt(attachments, i, { ...a, name: e.target.value }))}
                placeholder="Document name"
                aria-label={`Attachment ${i + 1} name`}
              />
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-xs text-primary hover:underline sm:max-w-56"
              >
                {a.url}
              </a>
              <RowControls onRemove={() => setAttachments(attachments.filter((_, j) => j !== i))} />
            </div>
          ))}
          <UploadButton
            courseSlug={courseSlug}
            kind="pdf"
            accept="application/pdf"
            label="Upload PDF"
            onUploaded={(url, name) => setAttachments([...attachments, { url, name: name ?? "Lesson document" }])}
            onError={(text) => setMessage({ ok: false, text })}
          />
        </div>
      </EditorSection>

      {/* 6. Quiz */}
      <EditorSection icon={CircleCheck} title="Quiz" hint="Learners must answer every question correctly to complete the lesson.">
        <div className="flex flex-col gap-4">
          {quiz.map((q, i) => (
            <fieldset key={i} className="flex flex-col gap-3 rounded-lg border border-border p-4">
              <legend className="px-1 text-xs font-semibold text-muted-foreground">Question {i + 1}</legend>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  value={q.question}
                  onChange={(e) => setQuiz(updateAt(quiz, i, { ...q, question: e.target.value }))}
                  placeholder="Question"
                  aria-label={`Question ${i + 1}`}
                />
                <RowControls onRemove={() => setQuiz(quiz.filter((_, j) => j !== i))} />
              </div>
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`answer-${i}`}
                    checked={q.answer === oi}
                    onChange={() => setQuiz(updateAt(quiz, i, { ...q, answer: oi }))}
                    aria-label={`Mark option ${oi + 1} correct`}
                    className="h-4 w-4 accent-primary"
                  />
                  <Input
                    className="flex-1"
                    value={opt}
                    onChange={(e) =>
                      setQuiz(updateAt(quiz, i, { ...q, options: updateAt(q.options, oi, e.target.value) }))
                    }
                    placeholder={`Option ${oi + 1}`}
                    aria-label={`Question ${i + 1} option ${oi + 1}`}
                  />
                  {q.options.length > 2 ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove option"
                      onClick={() =>
                        setQuiz(
                          updateAt(quiz, i, {
                            ...q,
                            options: q.options.filter((_, j) => j !== oi),
                            answer: q.answer === oi ? 0 : q.answer > oi ? q.answer - 1 : q.answer,
                          }),
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              ))}
              {q.options.length < 6 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start"
                  onClick={() => setQuiz(updateAt(quiz, i, { ...q, options: [...q.options, ""] }))}
                >
                  <Plus className="h-4 w-4" /> Add option
                </Button>
              ) : null}
              <Input
                value={q.explanation ?? ""}
                onChange={(e) => setQuiz(updateAt(quiz, i, { ...q, explanation: e.target.value }))}
                placeholder="Explanation shown after answering (optional)"
                aria-label={`Question ${i + 1} explanation`}
              />
            </fieldset>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() =>
              setQuiz([...quiz, { id: `q${quiz.length + 1}`, question: "", options: ["", ""], answer: 0 }])
            }
          >
            <Plus className="h-4 w-4" /> Add question
          </Button>
        </div>
      </EditorSection>

      <Card className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 p-4 shadow-lg">
        <p
          role="status"
          aria-live="polite"
          className={cn("text-sm", message ? (message.ok ? "text-green-700" : "text-destructive") : "text-muted-foreground")}
        >
          {message?.text ?? "Changes are not saved until you save a draft or publish."}
        </p>
        <div className="flex flex-wrap gap-2">
          {row ? (
            <Button variant="ghost" size="sm" onClick={reset} disabled={pending}>
              <RotateCcw className="h-4 w-4" /> Restore default
            </Button>
          ) : null}
          <Button variant="outline" size="sm" onClick={() => save("draft")} disabled={pending || videoInvalid}>
            <Save className="h-4 w-4" /> Save draft
          </Button>
          <Button size="sm" onClick={() => save("published")} disabled={pending || videoInvalid}>
            <CircleCheck className="h-4 w-4" /> {pending ? "Saving…" : "Publish"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

type ModuleLike = { id: string; title: string; lessons: Lesson[] }

function LessonOrderPanel({
  courseSlug,
  modules,
  order,
  selectedKey,
  onSelect,
  onSaved,
}: {
  courseSlug: string
  modules: ModuleLike[]
  order: Record<string, string[]>
  selectedKey?: string
  onSelect: (key: string) => void
  onSaved: () => void
}) {
  const [lists, setLists] = useState<Record<string, Lesson[]>>(() =>
    Object.fromEntries(modules.map((m) => [m.id, applyLessonOrder(m.lessons, order[m.id])])),
  )
  const [dragging, setDragging] = useState<{ moduleId: string; index: number } | null>(null)
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()
  const reorderable = modules.filter((m) => m.lessons.length > 1)

  function persist(moduleId: string, next: Lesson[]) {
    setLists((prev) => ({ ...prev, [moduleId]: next }))
    startTransition(async () => {
      const res = await saveLessonOrder(courseSlug, moduleId, next.map((l) => l.id))
      setStatus({ ok: res.ok, text: res.ok ? (res.message ?? "Saved.") : (res.error ?? "Could not save the order.") })
      if (res.ok) onSaved()
    })
  }

  function moveTo(moduleId: string, from: number, to: number) {
    const list = lists[moduleId] ?? []
    if (from === to || to < 0 || to >= list.length) return
    const next = list.slice()
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    persist(moduleId, next)
  }

  if (reorderable.length === 0) return null

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-display text-base font-semibold">Lesson order</h2>
          <p className="text-xs text-muted-foreground">
            Drag lessons to reorder them within a module (or focus a lesson and use Alt + arrow keys). Order saves
            automatically.
          </p>
        </div>
        <p
          role="status"
          aria-live="polite"
          className={cn("text-xs", status ? (status.ok ? "text-green-700" : "text-destructive") : "text-muted-foreground")}
        >
          {pending ? "Saving…" : status?.text}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reorderable.map((m) => (
          <div key={m.id} className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-pretty">{m.title}</h3>
            <ol className="flex flex-col gap-1.5">
              {(lists[m.id] ?? []).map((l, i) => {
                const key = lessonKey(m.id, l.id)
                return (
                  <li
                    key={l.id}
                    draggable
                    tabIndex={0}
                    aria-label={`${l.title}, position ${i + 1}`}
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = "move"
                      setDragging({ moduleId: m.id, index: i })
                    }}
                    onDragOver={(e) => {
                      if (dragging?.moduleId === m.id) e.preventDefault()
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (dragging?.moduleId === m.id) moveTo(m.id, dragging.index, i)
                      setDragging(null)
                    }}
                    onDragEnd={() => setDragging(null)}
                    onKeyDown={(e) => {
                      if (!e.altKey) return
                      if (e.key === "ArrowUp") {
                        e.preventDefault()
                        moveTo(m.id, i, i - 1)
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault()
                        moveTo(m.id, i, i + 1)
                      }
                    }}
                    className={cn(
                      "flex cursor-grab items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing",
                      dragging?.moduleId === m.id && dragging.index === i && "opacity-50",
                      selectedKey === key && "border-primary",
                    )}
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                    <button
                      type="button"
                      className="flex-1 truncate text-left hover:underline"
                      onClick={() => onSelect(key)}
                    >
                      {l.title}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
    </Card>
  )
}

function EditorSection({
  icon: Icon,
  title,
  hint,
  action,
  children,
}: {
  icon: typeof Video
  title: string
  hint?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold">
            <Icon className="h-4 w-4 text-primary" /> {title}
          </h3>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </Card>
  )
}

function ToolbarButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Video; onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" type="button" onClick={onClick} aria-label={label} title={label} className="h-8 w-8">
      <Icon className="h-4 w-4" />
    </Button>
  )
}

function RowControls({ onUp, onDown, onRemove }: { onUp?: () => void; onDown?: () => void; onRemove: () => void }) {
  return (
    <div className="flex shrink-0 items-start gap-1">
      {onUp ? (
        <Button variant="ghost" size="icon" onClick={onUp} aria-label="Move up">
          <ArrowUp className="h-4 w-4" />
        </Button>
      ) : null}
      {onDown ? (
        <Button variant="ghost" size="icon" onClick={onDown} aria-label="Move down">
          <ArrowDown className="h-4 w-4" />
        </Button>
      ) : null}
      <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

function UploadButton({
  courseSlug,
  kind,
  accept,
  label,
  onUploaded,
  onError,
}: {
  courseSlug: string
  kind: "image" | "pdf"
  accept: string
  label: string
  onUploaded: (url: string, name?: string) => void
  onError: (message: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handle(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.set("file", file)
    fd.set("courseSlug", courseSlug)
    fd.set("kind", kind)
    const res = await uploadLessonAsset(fd)
    setUploading(false)
    if (res.ok && res.url) onUploaded(res.url, res.name)
    else onError(res.error ?? "Upload failed.")
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          e.target.value = ""
          if (file) handle(file)
        }}
      />
      <Button variant="outline" size="sm" className="self-start" disabled={uploading} onClick={() => inputRef.current?.click()}>
        <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : label}
      </Button>
    </>
  )
}

function updateAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item))
}

function move<T>(list: T[], index: number, delta: number): T[] {
  const next = list.slice()
  const [item] = next.splice(index, 1)
  next.splice(index + delta, 0, item)
  return next
}
