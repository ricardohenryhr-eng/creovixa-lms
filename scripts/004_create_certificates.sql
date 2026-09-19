-- Persistent store for every issued certificate.
-- Certificates are permanent, uniquely identified by cert_id, verifiable by
-- cert_id via the public /verify route, and visible in the Student and Admin
-- dashboards.

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  cert_id text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  recipient text not null,
  course_slug text,
  course_title text not null,
  score integer not null default 100,
  hours integer,
  variant text not null default 'standard' check (variant in ('standard','medical')),
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists certificates_user_id_idx on public.certificates(user_id);
create index if not exists certificates_cert_id_idx on public.certificates(cert_id);

alter table public.certificates enable row level security;

-- A user can read their own certificates; admins can read all.
drop policy if exists certificates_select_own_or_admin on public.certificates;
create policy certificates_select_own_or_admin on public.certificates
  for select using (user_id = auth.uid() or public.is_admin());

-- A user can insert their own certificate; admins can insert for anyone.
drop policy if exists certificates_insert_own_or_admin on public.certificates;
create policy certificates_insert_own_or_admin on public.certificates
  for insert with check (user_id = auth.uid() or public.is_admin());

drop policy if exists certificates_admin_update on public.certificates;
create policy certificates_admin_update on public.certificates
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists certificates_admin_delete on public.certificates;
create policy certificates_admin_delete on public.certificates
  for delete using (public.is_admin());

-- Public verification reads a single row by cert_id through the service role
-- (see app/actions/certificates.ts), so no anonymous SELECT policy is needed.

-- Seed historical/demo certificates (no owning user).
insert into public.certificates (cert_id, recipient, course_slug, course_title, score, hours, variant, issued_at, expires_at) values
  ('CVX-MED-2024-0192', 'Daniel Okoro', 'medical-interpreter-training-40h', '40-Hour Medical Interpreter Training', 92, 40, 'medical', '2024-08-14', null),
  ('CVX-HIPAA-2024-0455', 'Daniel Okoro', 'hipaa-fraud-awareness', 'HIPAA & Fraud Awareness', 88, null, 'standard', '2024-09-02', '2025-09-02'),
  ('CVX-CS-2023-1120', 'Daniel Okoro', null, 'Customer Service Interpretation', 95, null, 'standard', '2023-12-19', '2024-12-19'),
  ('CVX-OPI-2022-0788', 'Daniel Okoro', 'opi-training', 'OPI Training', 84, null, 'standard', '2022-05-10', '2023-05-10')
on conflict (cert_id) do nothing;
