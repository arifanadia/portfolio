# Portfolio Architecture & Database Backup Guide

Keep this file in your project under `docs/DATABASE_BACKUP.md` so you always have a complete, version-controlled backup of your Supabase schema, TypeScript types, GSAP setup, and recovery commands.

---

## 1. Quick-Start Terminal Setup Backup

If you ever need to recreate your project environment from scratch, run these commands in order:

```bash
# 1. Create Next.js App with TypeScript, Tailwind CSS, and App Router
npx create-next-app@latest arifa-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd arifa-portfolio

# 2. Initialize shadcn/ui and common components
npx shadcn@latest init -d
npx shadcn@latest add button card badge input textarea dialog sonner

# 3. Install Supabase, GSAP, and validation utilities
npm install @supabase/supabase-js @supabase/ssr gsap @gsap/react zod lucide-react clsx tailwind-merge class-variance-authority
```

---

## 2. Supabase SQL Schema & RLS Backup

Run this SQL script inside the **Supabase SQL Editor** to create or restore all tables, indexes, and Row Level Security policies for your portfolio:

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- 1. PROJECTS TABLE
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  summary text not null,
  case_study_md text,
  cover_image_url text not null,
  video_preview_url text,
  live_url text,
  github_url text,
  tech_stack text[] not null default '{}',
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. SKILLS (BENTO GRID) TABLE
create table public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('Frontend', 'Backend', 'Database', 'Animation', 'DevOps')),
  icon_name text,
  proficiency integer default 90,
  display_order integer not null default 0
);

-- 3. EXPERIENCE TIMELINE TABLE
create table public.experiences (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  company text not null,
  company_url text,
  period text not null,
  highlights text[] not null default '{}',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 4. CONTACT MESSAGES TABLE
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  sender_name text not null,
  sender_email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.contact_messages enable row level security;

-- Public read access for portfolio visitors
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read skills" on public.skills for select using (true);
create policy "Public can read experiences" on public.experiences for select using (true);

-- Anyone can submit a contact message via Node.js Server Action
create policy "Public can insert contact messages" on public.contact_messages for insert with check (true);
```

---

## 3. Seed Data SQL Script

Use this script to populate realistic starter data for projects, skills, and experiences:

```sql
-- Insert initial Skills
insert into public.skills (name, category, icon_name, proficiency, display_order) values
('Next.js 15 & React 19', 'Frontend', 'Code2', 98, 1),
('TypeScript', 'Frontend', 'FileCode', 95, 2),
('Tailwind CSS & shadcn/ui', 'Frontend', 'Palette', 96, 3),
('GSAP & ScrollTrigger', 'Animation', 'Sparkles', 92, 4),
('Node.js & Server Actions', 'Backend', 'Server', 94, 5),
('Supabase & PostgreSQL', 'Database', 'Database', 90, 6),
('REST & GraphQL APIs', 'Backend', 'Cpu', 90, 7),
('Docker & CI/CD Pipelines', 'DevOps', 'Workflow', 85, 8);

-- Insert initial Experiences
insert into public.experiences (role, company, company_url, period, highlights, display_order) values
('Senior Creative Frontend Engineer', 'Aura Labs', 'https://aura.design', '2024 - Present', ARRAY['Architected dynamic web experiences with Next.js App Router, GSAP, and Tailwind CSS', 'Boosted Core Web Vitals to 99+ across all key performance metrics', 'Spearheaded interactive design system integrated with shadcn/ui and custom motion components'], 1),
('Full-Stack Web Developer', 'HyperScale Studio', 'https://hyperscale.tech', '2022 - 2024', ARRAY['Built high-concurrency SaaS dashboards with Next.js, Node.js, and Supabase RLS', 'Implemented fluid micro-interactions and smooth scroll timelines with GSAP', 'Engineered custom real-time collaboration tools and notifications'], 2),
('Frontend Developer', 'PixelCraft Interactive', 'https://pixelcraft.dev', '2020 - 2022', ARRAY['Crafted responsive client web applications and high-converting marketing experiences', 'Created reusable UI component libraries with TypeScript and Tailwind CSS', 'Mentored junior engineers in modern CSS layout techniques and animations'], 3);

-- Insert initial Featured Projects
insert into public.projects (title, slug, summary, cover_image_url, video_preview_url, live_url, github_url, tech_stack, is_featured, display_order) values
('Synapse AI Platform', 'synapse-ai-platform', 'An intelligent workflow orchestration dashboard powered by Next.js 15, Server Actions, Supabase PostgreSQL, and GSAP micro-interactions.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', null, 'https://example.com/synapse', 'https://github.com/example/synapse', ARRAY['Next.js', 'TypeScript', 'Supabase', 'GSAP', 'Tailwind CSS'], true, 1),
('OmniFlow Design System', 'omniflow-design-system', 'A high-performance design system and component catalog featuring weightless animations and accessible Radix primitives.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop', null, 'https://example.com/omniflow', 'https://github.com/example/omniflow', ARRAY['React', 'shadcn/ui', 'GSAP', 'Tailwind CSS', 'TypeScript'], true, 2),
('Vanguard Cloud Metrics', 'vanguard-cloud-metrics', 'Real-time telemetry and infrastructure observability tool featuring animated streaming charts and automated incident triage.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', null, 'https://example.com/vanguard', 'https://github.com/example/vanguard', ARRAY['Next.js', 'PostgreSQL', 'Supabase', 'Server Actions', 'Node.js'], true, 3);
```

---

## 4. Core Code Templates for Backup

### `src/types/portfolio.ts`
```typescript
export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  case_study_md?: string | null;
  cover_image_url: string;
  video_preview_url?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  tech_stack: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Animation' | 'DevOps';
  icon_name?: string | null;
  proficiency: number;
  display_order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  company_url?: string | null;
  period: string;
  highlights: string[];
  display_order: number;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  subject?: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
```

### `src/lib/gsap.ts`
```typescript
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
```

### `src/actions/backup.ts` (JSON Data Export Utility)
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

export async function exportPortfolioBackupJSON() {
  const supabase = await createClient();

  const [projectsRes, skillsRes, experiencesRes] = await Promise.all([
    supabase.from("projects").select("*").order("display_order"),
    supabase.from("skills").select("*").order("display_order"),
    supabase.from("experiences").select("*").order("display_order"),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    projects: projectsRes.data ?? [],
    skills: skillsRes.data ?? [],
    experiences: experiencesRes.data ?? [],
  };
}
```
