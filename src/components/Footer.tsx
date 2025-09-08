import { personalInfo, socialLinks } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return Github;
      case 'Linkedin': return Linkedin;
      case 'Mail': return Mail;
      default: return ExternalLink;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="font-bold text-2xl gradient-text hover:scale-105 transition-transform mb-4 block"
            >
              {personalInfo.name}
            </button>
            <p className="text-muted-foreground mb-4">
              {personalInfo.title}
            </p>
            <p className="text-sm text-muted-foreground">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {["About", "Projects", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {link}
                </button>
              ))}
              <a
                href={personalInfo.resume}
                download
                className="block text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.icon);
                return (
                  <Button
                    key={link.name}
                    variant="outline"
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
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="hover:text-foreground transition-colors link-underline"
              >
                {personalInfo.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} {personalInfo.name}. Made with 
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}