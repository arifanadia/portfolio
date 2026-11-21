export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          case_study_md: string | null;
          cover_image_url: string;
          video_preview_url: string | null;
          live_url: string | null;
          github_url: string | null;
          tech_stack: string[];
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          case_study_md?: string | null;
          cover_image_url: string;
          video_preview_url?: string | null;
          live_url?: string | null;
          github_url?: string | null;
          tech_stack?: string[];
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          case_study_md?: string | null;
          cover_image_url?: string;
          video_preview_url?: string | null;
          live_url?: string | null;
          github_url?: string | null;
          tech_stack?: string[];
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: "Frontend" | "Backend" | "Database" | "Animation" | "DevOps";
          icon_name: string | null;
          proficiency: number;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          category: "Frontend" | "Backend" | "Database" | "Animation" | "DevOps";
          icon_name?: string | null;
          proficiency?: number;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          category?: "Frontend" | "Backend" | "Database" | "Animation" | "DevOps";
          icon_name?: string | null;
          proficiency?: number;
          display_order?: number;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          role: string;
          company: string;
          company_url: string | null;
          period: string;
          highlights: string[];
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          company: string;
          company_url?: string | null;
          period: string;
          highlights?: string[];
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          company?: string;
          company_url?: string | null;
          period?: string;
          highlights?: string[];
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          sender_name: string;
          sender_email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_name: string;
          sender_email: string;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_name?: string;
          sender_email?: string;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
