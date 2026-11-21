# System Architecture & Technical Specifications

## 1. Overview
This portfolio is an interactive, animated web application built with **Next.js (App Router)**, **TypeScript**, **Node.js (Server Actions & Route Handlers)**, **Supabase (PostgreSQL + RLS + Storage)**, **GSAP (`@gsap/react` + ScrollTrigger)**, **Tailwind CSS**, and **shadcn/ui**.

## 2. Directory Structure

```text
├── docs/
│   ├── ARCHITECTURE.md          # Living documentation of folder structure & data flow
│   ├── DATABASE_BACKUP.md       # Complete SQL schema, RLS policies, and seed data backup
│   └── CHANGELOG.md             # Log of completed features and component updates
├── src/
│   ├── app/
│   │   ├── (public)/            # Public portfolio pages (Home, Projects, About, Contact)
│   │   ├── (admin)/             # Protected Supabase Auth routes for managing data
│   │   ├── api/                 # Node.js API endpoints (webhooks, health, data export)
│   │   ├── layout.tsx           # Global Root Layout
│   │   └── globals.css          # Tailwind CSS styles & CSS custom properties
│   ├── actions/                 # Next.js Server Actions (contact form, backup export, project CRUD)
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives (Button, Card, Badge, Input, Textarea, Dialog, Sonner)
│   │   ├── animations/          # Reusable GSAP wrappers (MagneticButton, RevealText, ParallaxImage)
│   │   └── sections/            # Portfolio sections (HeroSection, BentoSkills, ProjectGallery, ExperienceTimeline, ContactSection)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser Supabase client (@supabase/ssr)
│   │   │   └── server.ts        # Server Component / Server Action Supabase client (@supabase/ssr)
│   │   ├── gsap.ts              # Centralized GSAP plugin registration
│   │   └── utils.ts             # Tailwind cn() helper and formatting utilities
│   └── types/
│       ├── database.types.ts    # Supabase generated database types
│       └── portfolio.ts         # Application TypeScript domain models
```

## 3. Data Flow & Rendering Strategy
- **React Server Components (RSC):** Data fetching for projects, skills, and experience records is executed securely on the server via `src/lib/supabase/server.ts`.
- **Client Components (`"use client"`):** Strictly isolated to interactive controls and GSAP animations (such as floating timeline cards, magnetic buttons, and scroll reveals).
- **Server Actions:** Form submissions (e.g. contact form) and data backup exports run through typed Node.js Server Actions with Zod validation.
- **Row Level Security (RLS):** Supabase PostgreSQL tables enforce public read access for portfolio items and restricted write access for contact messages and admin actions.
