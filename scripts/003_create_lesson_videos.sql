-- Migration: lesson_videos
-- Source of truth for real training media (video URL, transcript, audio drill,
-- duration) overlaid onto the statically-defined course lessons at runtime.
-- Keyed by course_slug + lesson_id, where lesson_id is the module-qualified
-- id "<moduleId>::<lessonId>" (lesson ids are only unique within a module).
-- When no row (or a null video_url) exists for a lesson, the player is not
-- rendered and the UI shows "Training video coming soon".

create table if not exists public.lesson_videos (
  id uuid primary key default gen_random_uuid(),
  course_slug text not null,
  lesson_id text not null,
  video_url text,
  transcript text,
  audio_url text,
  duration_seconds integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_slug, lesson_id)
);

create index if not exists lesson_videos_course_slug_idx on public.lesson_videos (course_slug);

alter table public.lesson_videos enable row level security;

-- Videos are public content: any authenticated learner can read them.
drop policy if exists lesson_videos_select on public.lesson_videos;
create policy lesson_videos_select on public.lesson_videos
  for select using (true);

-- Only admins may create/update/delete video records.
drop policy if exists lesson_videos_admin_write on public.lesson_videos;
create policy lesson_videos_admin_write on public.lesson_videos
  for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_lesson_videos_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_lesson_videos_updated_at on public.lesson_videos;
create trigger trg_lesson_videos_updated_at
  before update on public.lesson_videos
  for each row execute function public.touch_lesson_videos_updated_at();
