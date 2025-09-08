import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { projects } from "@/data/portfolio";
import { ExternalLink, Github, Clock, CheckCircle, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useUserInteractions } from "@/hooks/useUserInteractions";
import { motion, AnimatePresence } from "framer-motion";

const projectImages: Record<string, string> = {
  "1": "/lovable-uploads/296e50b3-1026-4596-8bb5-49b5207bd643.png",
  "2": "/lovable-uploads/f773efbc-5cb0-43e4-b893-23b7fdfc167e.png",
  "3": "/lovable-uploads/c04f7b43-cecf-43d9-b269-7f7698d8d3ab.png",
};

export function Projects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);
  const { trackInteraction, getRelatedProjects } = useUserInteractions();

  const toggleExpanded = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getShortDescription = (description: string) => {
    const sentences = description.split('. ');
    return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    trackInteraction({ type: 'project_click', data: { projectId } });
  };

  const getStatusIcon = (status: string) => {
    return status === "completed" ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <Clock className="h-4 w-4 text-orange" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "completed" ? "success" : "secondary";
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-surface/30 to-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-cool text-white border-0">
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI, ML, and data analysis
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => {
            const isExpanded = expandedProjects.has(project.id);
            const isSelected = selectedProject === project.id;
            const relatedProjects = isSelected ? getRelatedProjects(project.id, projects) : [];
            const shortDescription = getShortDescription(project.description);
            
            return (
              <Card key={project.id} className={`card-gradient group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden border-0 ${isSelected ? 'ring-2 ring-primary/30' : ''}`}>
                <div 
                  className="aspect-video overflow-hidden relative cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <img 
                    src={projectImages[project.id as keyof typeof projectImages]} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      Selected
                    </div>
                  )}
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      <Badge 
                        variant={getStatusColor(project.status) as any}
                        className={project.status === "completed" ? "bg-success/10 text-success border-success/20" : "bg-orange/10 text-orange border-orange/20"}
                      >
                        {project.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {isExpanded ? project.description : shortDescription}
                    </p>
                    {shortDescription !== project.description && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(project.id)}
                        className="p-0 h-auto mt-2 text-primary hover:text-primary/80 font-medium"
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className={`
                          border-0 font-medium transition-all duration-200 hover:scale-105
                          ${index % 4 === 0 ? 'bg-primary/10 text-primary' : ''}
                          ${index % 4 === 1 ? 'bg-tertiary/10 text-tertiary' : ''}
                          ${index % 4 === 2 ? 'bg-secondary/10 text-secondary' : ''}
                          ${index % 4 === 3 ? 'bg-orange/10 text-orange' : ''}
                        `}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="default" size="sm" asChild className="bg-gradient-primary border-0 shadow-glow hover:shadow-lg transition-all duration-300">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-colors">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* AI Recommendations */}
                  {isSelected && relatedProjects.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-purple/5 rounded-lg"
                    >
                      <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4" />
                        AI Recommendations
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Based on similar technologies, you might also like:
                      </p>
                      <div className="space-y-2">
                        {relatedProjects.map((relatedProject: any) => (
                          <div 
                            key={relatedProject.id}
                            className="flex items-center justify-between p-2 bg-card/50 rounded cursor-pointer hover:bg-card/70 transition-colors"
                            onClick={() => handleProjectClick(relatedProject.id)}
                          >
                            <div>
                              <p className="text-sm font-medium">{relatedProject.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {relatedProject.similarity} shared technologies
                              </p>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Other <span className="gradient-text">Projects</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => {
                const isExpanded = expandedProjects.has(project.id);
                const shortDescription = getShortDescription(project.description);
                
                return (
                  <Card key={project.id} className="card-gradient hover:shadow-md hover:shadow-primary/5 transition-all duration-300 border-0">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold hover:text-primary transition-colors">{project.title}</h4>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(project.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {isExpanded ? project.description : shortDescription}
                        </p>
                        {shortDescription !== project.description && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(project.id)}
                            className="p-0 h-auto mt-2 text-primary hover:text-primary/80 font-medium text-xs"
                          >
                            {isExpanded ? (
                              <>
                                Show Less <ChevronUp className="h-3 w-3 ml-1" />
                              </>
                            ) : (
                              <>
                                Read More <ChevronDown className="h-3 w-3 ml-1" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className={`
                              text-xs border-0 font-medium
                              ${index % 3 === 0 ? 'bg-primary/10 text-primary' : ''}
                              ${index % 3 === 1 ? 'bg-tertiary/10 text-tertiary' : ''}
                              ${index % 3 === 2 ? 'bg-secondary/10 text-secondary' : ''}
                            `}
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-0">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary transition-colors">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        {project.liveUrl && (
                          <Button variant="ghost" size="sm" asChild className="hover:bg-tertiary/10 hover:text-tertiary transition-colors">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
