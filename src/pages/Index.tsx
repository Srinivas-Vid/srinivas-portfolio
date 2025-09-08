import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { AICompanion } from "@/components/AICompanion";
import { LiveDataFeed } from "@/components/LiveDataFeed";

const Index = () => {
  // Initialize theme on mount
  useEffect(() => {
    const theme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AICompanion />
      <LiveDataFeed />
    </div>
  );
};

export default Index;
