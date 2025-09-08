import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import heroBg from "@/assets/hero-bg.jpg";

const typingTexts = [
  "Machine Learning",
  "Data Analytics", 
  "Problem Solving",
  "Innovation"
];

export function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = typingTexts[currentText];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentText((prev) => (prev + 1) % typingTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, displayText, isTyping]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return Github;
      case 'Linkedin': return Linkedin;
      case 'Mail': return Mail;
      default: return ExternalLink;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-cool rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-warm rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-primary rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center py-20 animate-fade-in-up">
        <div className="max-w-5xl mx-auto">
          {/* Status Badge with Warm Accent */}
          <Badge className="mb-8 px-6 py-3 text-sm font-medium bg-gradient-warm text-white border-0 shadow-warm">
            Available for opportunities
          </Badge>

          {/* Modern Header Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            I'm{" "}
            <span className="gradient-text">Srinivas Erramalla</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-medium text-muted-foreground mt-4 block">
              Fresher | AI & ML Enthusiast | Data Analyst | Software Developer
            </span>
          </h1>

          {/* Typing Animation for Additional Context */}
          <div className="h-12 flex items-center justify-center mb-8">
            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
              Passionate about{" "}
              <span className="text-tertiary font-semibold">
                {displayText}
                <span className="animate-blink text-primary">|</span>
              </span>
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="animate-glow-pulse"
            >
              View My Work
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <a href={personalInfo.resume} download>
                Download Resume
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-16">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.icon);
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:scale-110 transition-transform"
                >
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection('about')}
            className="animate-bounce mx-auto"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}