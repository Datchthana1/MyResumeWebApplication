import Hero from "@/components/home/Hero";
import EvolutionScroll from "@/components/home/EvolutionScroll";
import Credo from "@/components/home/Credo";
import Explore from "@/components/home/Explore";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import MonitorTeaser from "@/components/home/MonitorTeaser";
import Education from "@/components/home/Education";
import Contact from "@/components/home/Contact";
import Waypoint from "@/components/ui/Waypoint";

/* The home page is a composition of sections. Each section owns its own
   <section id=...> and markup; this file only sets the order. */
export default function HomePage() {
  return (
    <div className="relative font-sans">
      <Hero />
      {/* the ascent: a scroll-scrubbed walk through human evolution */}
      <EvolutionScroll />
      <Credo />
      <Explore />
      <Waypoint />
      <About />
      <Waypoint />
      <Skills />
      <Waypoint />
      <ExperienceTimeline />
      <Waypoint />
      <MonitorTeaser />
      <Waypoint />
      <Education />
      <Waypoint />
      <Contact />

      <div className="h-8" />
    </div>
  );
}
