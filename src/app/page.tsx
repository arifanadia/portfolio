import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DesignGallery from "@/components/DesignGallery";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/animations/CursorGlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14] overflow-x-hidden relative">
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProjectsSection />
        <DesignGallery />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
