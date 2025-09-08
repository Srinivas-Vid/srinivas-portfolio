import { useState, useCallback } from 'react';

export interface UserInteraction {
  type: 'project_click' | 'skill_query' | 'section_visit' | 'resume_generate' | 'demo_use' | 'first_interaction' | 'easter_egg' | 'feature_access';
  data: any;
  timestamp: Date;
}

export interface UserSession {
  interactions: UserInteraction[];
  visitedSections: Set<string>;
  clickedProjects: string[];
  skillQueries: string[];
  currentStep: number;
}

export function useUserInteractions() {
  const [session, setSession] = useState<UserSession>({
    interactions: [],
    visitedSections: new Set(['hero']), // Start with hero
    clickedProjects: [],
    skillQueries: [],
    currentStep: 0
  });

  const trackInteraction = useCallback((interaction: Omit<UserInteraction, 'timestamp'>) => {
    setSession(prev => {
      const newInteraction = { ...interaction, timestamp: new Date() };
      const updatedSession = {
        ...prev,
        interactions: [...prev.interactions, newInteraction]
      };

      // Update specific tracking based on interaction type
      switch (interaction.type) {
        case 'project_click':
          updatedSession.clickedProjects = [...prev.clickedProjects, interaction.data.projectId];
          break;
        case 'skill_query':
          updatedSession.skillQueries = [...prev.skillQueries, interaction.data.query];
          break;
        case 'section_visit':
          updatedSession.visitedSections = new Set([...prev.visitedSections, interaction.data.section]);
          break;
      }

      return updatedSession;
    });
  }, []);

  const getNextSuggestion = useCallback(() => {
    const { visitedSections, clickedProjects, skillQueries, currentStep } = session;
    
    // Memory-based suggestions based on user journey
    if (visitedSections.has('projects') && !visitedSections.has('achievements')) {
      return {
        message: "💡 Since you explored my projects, you might want to check out my achievements next!",
        action: () => {
          document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
    
    if (visitedSections.has('achievements') && !visitedSections.has('certifications')) {
      return {
        message: "🎓 Great! Now let me show you my certifications to see the formal validations.",
        action: () => {
          document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    // Standard suggestions
    const suggestions = [
      {
        condition: !visitedSections.has('about'),
        message: "💡 Curious about Srinivas's background? Check out the About section to learn more!",
        action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      },
      {
        condition: !visitedSections.has('projects') && visitedSections.has('about'),
        message: "🚀 Ready to see some amazing projects? Let's explore the Projects section!",
        action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      },
      {
        condition: clickedProjects.length === 0 && visitedSections.has('projects'),
        message: "🎯 Try asking about specific projects like 'diabetes prediction' or 'music genre classification'!",
        action: () => {}
      },
      {
        condition: skillQueries.length === 0 && visitedSections.has('projects'),
        message: "📊 Try asking me 'Show me Python vs Java skills' to see the interactive skill visualizer!",
        action: () => {}
      },
      {
        condition: clickedProjects.length > 0,
        message: "🎮 Ready for something interactive? Try saying 'Challenge me with a quiz' or 'Show career predictions'!",
        action: () => {}
      }
    ];

    const availableSuggestion = suggestions.find(s => s.condition);
    return availableSuggestion || {
      message: "🌟 Ask me to 'inspire me' for some ancient wisdom with modern AI context!",
      action: () => {}
    };
  }, [session]);

  const getRelatedProjects = useCallback((currentProjectId: string, projects: any[]) => {
    const currentProject = projects.find(p => p.id === currentProjectId);
    if (!currentProject) return [];

    // Find projects with similar technologies
    const relatedProjects = projects
      .filter(p => p.id !== currentProjectId)
      .map(project => {
        const commonTechs = project.technologies.filter(tech => 
          currentProject.technologies.includes(tech)
        );
        return { ...project, similarity: commonTechs.length };
      })
      .filter(p => p.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2);

    return relatedProjects;
  }, []);

  return {
    session,
    trackInteraction,
    getNextSuggestion,
    getRelatedProjects
  };
}