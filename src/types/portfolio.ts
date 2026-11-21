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
  category: "Frontend" | "Backend" | "Database" | "Animation" | "DevOps";
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
