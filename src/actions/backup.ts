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
