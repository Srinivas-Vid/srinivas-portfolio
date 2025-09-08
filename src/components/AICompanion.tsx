import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo, skills, projects, achievements, certifications } from "@/data/portfolio";
import { Bot, X, MessageCircle, Sparkles, BarChart3, Tags, FileText, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserInteractions } from "@/hooks/useUserInteractions";
import { SkillVisualizer } from "./SkillVisualizer";
import { ResumeGenerator } from "./ResumeGenerator";
import { MLDemo } from "./MLDemo";
import { AIDemo } from "./AIDemo";
import { AIQuiz } from "./AIQuiz";
import { CareerPredictor } from "./CareerPredictor";
import medhasaLogo from "@/assets/medhasa-logo.jpg";

interface AIMessage {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface AIFact {
  title: string;
  description: string;
  icon: string;
}

const aiFacts: AIFact[] = [
  {
    title: "Machine Learning Magic",
    description: "ML algorithms can learn patterns from data without being explicitly programmed for each scenario!",
    icon: "🤖"
  },
  {
    title: "AI Processing Power",
    description: "Modern AI models like GPT have billions of parameters - more than there are stars in our galaxy!",
    icon: "⭐"
  },
  {
    title: "Data Science Impact",
    description: "Data scientists help companies make decisions that can increase revenue by 15-20% on average!",
    icon: "📊"
  },
  {
    title: "Python Popularity",
    description: "Python is used by 85% of data scientists worldwide - it's the Swiss Army knife of programming!",
    icon: "🐍"
  }
];

export function AICompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [showFact, setShowFact] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [showSkillsCloud, setShowSkillsCloud] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSkillVisualizer, setShowSkillVisualizer] = useState(false);
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [showMLDemo, setShowMLDemo] = useState(false);
  const [showAIDemo, setShowAIDemo] = useState(false);
  const [showAIQuiz, setShowAIQuiz] = useState(false);
  const [showCareerPredictor, setShowCareerPredictor] = useState(false);
  const [skillQuery, setSkillQuery] = useState('');
  const [theme, setTheme] = useState('cool');
  const [personalizedInsights, setPersonalizedInsights] = useState<string[]>([]);
  
  const { session, trackInteraction, getNextSuggestion, getRelatedProjects } = useUserInteractions();

  // Surprise features rotation with guided suggestions
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      const random = Math.random();
      const suggestion = getNextSuggestion();
      
      if (random < 0.2) {
        setShowFact(true);
        setCurrentFact(Math.floor(Math.random() * aiFacts.length));
        setTimeout(() => setShowFact(false), 4000);
      } else if (random < 0.4) {
        setShowSkillsCloud(true);
        setTimeout(() => setShowSkillsCloud(false), 3000);
      } else if (random < 0.6 && suggestion.message !== messages[messages.length - 1]?.content) {
        // Add guided suggestion as bot message
        const suggestionMessage: AIMessage = {
          type: 'bot',
          content: suggestion.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, suggestionMessage]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpen, getNextSuggestion, messages]);

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Enhanced introduction when first opening
    if (isFirstMessage) {
      setIsFirstMessage(false);
      trackInteraction({ type: 'first_interaction', data: { timestamp: new Date() } });
      return "🙏 Namaste! I'm Medhasa (मेधासा), Srinivas's AI assistant and your personal portfolio guide. I'm powered by the same AI principles that drive his projects!\n\n✨ **I can help you:**\n• Explore his technical skills & expertise\n• Dive deep into his innovative projects\n• Understand his achievements & background\n• Try live AI demos & interactive tools\n• Generate tailored resumes for different roles\n• Challenge you with AI/ML quizzes\n• Show future career predictions\n\n🚀 Ready to discover what makes Srinivas an exceptional AI/ML enthusiast and developer? What interests you most?";
    }
    
    // Track the interaction
    trackInteraction({ type: 'skill_query', data: { query: input } });
    
    // Adaptive theme change based on context
    if (lowerInput.includes('ai') || lowerInput.includes('ml') || lowerInput.includes('machine')) {
      setTheme('ai');
      document.documentElement.style.setProperty('--primary', '262 83% 58%'); // Purple for AI
    } else if (lowerInput.includes('data') || lowerInput.includes('analysis')) {
      setTheme('data');
      document.documentElement.style.setProperty('--primary', '174 72% 56%'); // Teal for Data
    } else if (lowerInput.includes('project')) {
      setTheme('projects');
      document.documentElement.style.setProperty('--primary', '25 95% 58%'); // Orange for Projects
    }
    
    // Easter egg - Sanskrit wisdom with AI context
    if (lowerInput.includes('inspire me') || lowerInput === 'inspire me') {
      const inspirationalQuotes = [
        "🕉️ **Bhagavad Gita**: 'विद्या ददाति विनयं' - Knowledge gives humility. Just as neural networks learn from each data point with patience, true wisdom comes from continuous learning and staying humble before the vastness of AI possibilities.",
        "🌟 **Bhagavad Gita**: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन' - You have the right to perform action, but not to the fruits of action. In machine learning, focus on perfecting your algorithms and models; success will follow naturally.",
        "💡 **Upanishads**: 'सत्यमेव जयते' - Truth alone triumphs. In data science, let authentic insights emerge when we allow the data to speak its truth, free from our biases and preconceptions.",
        "🚀 **Mahabharata**: 'धर्मे चार्थे च कामे च मोक्षे च भरतर्षभ' - Balance dharma (purpose), artha (resources), kama (passion), and moksha (liberation). In AI development, balance ethical responsibility, practical utility, creative passion, and the freedom to innovate.",
        "🧠 **Upanishads**: 'यत्र नान्यत्पश्यति नान्यच्छृणोति नान्यद्विजानाति स भूमा' - Where one sees nothing else, hears nothing else, knows nothing else, that is infinite. Like AI approaching AGI, true understanding transcends individual data points to grasp the universal patterns.",
        "⚡ **Mahabharata**: 'अभ्यासे वश इच्छन्ति' - Mastery comes through practice. Like training deep neural networks through countless epochs, consistent practice and iteration lead to breakthrough understanding."
      ];
      trackInteraction({ type: 'easter_egg', data: { trigger: 'inspire_me' } });
      return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    }
    
    // Handle skill visualization queries
    if (lowerInput.includes('show') && (lowerInput.includes('skill') || lowerInput.includes('vs') || lowerInput.includes('compare'))) {
      setSkillQuery(input);
      setShowSkillVisualizer(true);
      return "🎯 Opening the AI-powered skill visualizer! Compare technologies and see real-time proficiency analysis with predictive insights.";
    }
    
    // Handle resume generation requests
    if (lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('generate')) {
      setShowResumeGenerator(true);
      return "📄 Launching the intelligent Resume Generator! AI will craft role-specific resumes optimized for ATS systems and recruiter preferences.";
    }
    
    // Handle AI demo requests
    if (lowerInput.includes('demo') || lowerInput.includes('try my ai') || lowerInput.includes('audio') || lowerInput.includes('sentiment') || lowerInput.includes('genre')) {
      setShowAIDemo(true);
      return "🎵 Opening Try My AI section! Experience live music genre classification and sentiment analysis demos.";
    }
    
    // Handle ML demo requests
    if (lowerInput.includes('ml demo') || lowerInput.includes('classifier') || lowerInput.includes('machine learning')) {
      setShowMLDemo(true);
      return "🤖 Starting the live ML playground! Experience real-time classification with feature importance analysis and model interpretability.";
    }
    
    // Handle quiz challenges with memory tracking
    if (lowerInput.includes('quiz') || lowerInput.includes('challenge') || lowerInput.includes('test') || lowerInput.includes('challenge medhasa')) {
      setShowAIQuiz(true);
      trackInteraction({ type: 'feature_access', data: { feature: 'ai_quiz' } });
      return "🎯 Challenge accepted! Let's test your AI/ML knowledge with an interactive quiz featuring real-time scoring, streak tracking, and detailed explanations. Ready to compete with Medhasa's intelligence?";
    }
    
    // Handle career predictions with enhanced messaging
    if (lowerInput.includes('career') || lowerInput.includes('future') || lowerInput.includes('predict') || lowerInput.includes('growth') || lowerInput.includes('where') && lowerInput.includes('skills') && lowerInput.includes('lead')) {
      setShowCareerPredictor(true);
      trackInteraction({ type: 'feature_access', data: { feature: 'career_predictor' } });
      return "🔮 Activating AI-powered career forecasting! Analyzing Srinivas's current trajectory to project skill evolution, salary growth, and strategic career opportunities over the next 5 years. Want to see where his skills lead?";
    }
    
    // Enhanced projects queries with memory tracking
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio') || lowerInput.includes('what has he built')) {
      trackInteraction({ type: 'section_visit', data: { section: 'projects' } });
      if (lowerInput.includes('diabetes')) {
        return "🏥 The Diabetes Prediction project is truly impressive! Srinivas built a comprehensive ML pipeline using Python, Pandas, and Scikit-learn. The model achieved 85% accuracy through careful data preprocessing, feature engineering, and hyperparameter tuning. It includes data visualization, correlation analysis, and model comparison between Random Forest, Logistic Regression, and SVM. Want to explore the technical implementation?";
      }
      
      if (lowerInput.includes('music') || lowerInput.includes('genre')) {
        return "🎵 The Music Genre Classification project showcases Srinivas's expertise in deep learning and audio processing! Using TensorFlow, he implemented a CNN model that processes audio spectrograms to classify music into genres like Rock, Pop, Jazz, and Classical. The project includes feature extraction using librosa, data augmentation, and model optimization techniques!";
      }
      
      if (lowerInput.includes('ecommerce') || lowerInput.includes('e-commerce')) {
        return "🛒 The E-commerce Platform demonstrates full-stack development skills! Built with React.js frontend, it features user authentication, product catalog, shopping cart, and payment integration. The project showcases modern web development practices with responsive design and state management.";
      }
      
      if (lowerInput.includes('weather')) {
        return "🌤️ The Weather Application shows API integration skills! Using React and external weather APIs, it provides real-time weather data, forecasts, and location-based services. Clean UI design with dynamic weather icons and responsive layout!";
      }
      
      const projectTitles = projects.map(p => p.title).join(', ');
      return `💼 Srinivas has crafted an impressive portfolio of ${projects.length} projects showcasing diverse technical skills:\n\n🤖 **AI/ML Projects:**\n• Diabetes Prediction (85% accuracy)\n• Music Genre Classification (Deep Learning)\n\n💻 **Full-Stack Development:**\n• E-commerce Platform (React + Backend)\n• Social Security Management System\n• Task Management Application\n\n🌐 **API & Integration:**\n• Weather App with live data\n• AI Code Generator interface\n\nWhich project would you like to explore in detail?`;
    }
    
    // Enhanced skills and expertise queries
    if (lowerInput.includes('skill') || lowerInput.includes('python') || lowerInput.includes('java') || lowerInput.includes('machine learning') || lowerInput.includes('what can he do') || lowerInput.includes('technologies')) {
      if (lowerInput.includes('python')) {
        return "🐍 Python is one of Srinivas's strongest skills! He's proficient in data analysis with Pandas & NumPy, ML with TensorFlow & Scikit-learn, visualization with Matplotlib & Seaborn, and web development with Flask & Django. His Python expertise spans from data preprocessing to deploying production ML models. Want to see a detailed breakdown?";
      }
      
      if (lowerInput.includes('java')) {
        return "☕ Java expertise includes object-oriented programming, data structures & algorithms, and enterprise application development. Srinivas has solid fundamentals in Java with practical project experience in building scalable applications and understanding of design patterns!";
      }
      
      if (lowerInput.includes('machine learning') || lowerInput.includes('ai')) {
        return "🤖 AI/ML is Srinivas's passion! He specializes in supervised learning, classification models, data preprocessing, feature engineering, and model evaluation. His expertise includes TensorFlow, Scikit-learn, ensemble methods, and deep learning. Check out his diabetes prediction and music genre classification projects to see these skills in action!";
      }
      
      const allSkills = skills.flatMap(category => category.technologies.map(tech => tech.name));
      return `🎯 Srinivas is skilled in ${allSkills.length} technologies across ${skills.length} categories: ${skills.map(s => s.category).join(', ')}. His expertise spans from Python data science to full-stack development. Try asking "Show me Python vs Java" to see the interactive skill visualizer with real-time comparisons!`;
    }
    
    
    if (lowerInput.includes('achievement') || lowerInput.includes('award') || lowerInput.includes('competition')) {
      trackInteraction({ type: 'section_visit', data: { section: 'achievements' } });
      return `🏆 Srinivas has achieved remarkable success with ${achievements.length} major achievements including ${achievements.map(a => a.title).join(', ')}. These showcase his excellence in AI and data science competitions! Each achievement represents dedication to continuous learning and innovation.`;
    }
    
    if (lowerInput.includes('certification') || lowerInput.includes('certificate')) {
      trackInteraction({ type: 'section_visit', data: { section: 'certifications' } });
      return `🎓 Srinivas holds ${certifications.length} professional certifications from leading organizations. These validate his expertise in AI, ML, and data science domains, demonstrating commitment to formal learning and industry standards.`;
    }
    
    if (lowerInput.includes('about') || lowerInput.includes('who')) {
      return `${personalInfo.bio} He's passionate about AI, machine learning, and data analysis, constantly learning and building innovative solutions.`;
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('reach')) {
      return `You can reach Srinivas at ${personalInfo.email} or connect with him on LinkedIn. He's always open to discussing AI, ML projects, and collaboration opportunities!`;
    }
    
    // Personalized AI responses based on user journey
    const userProgress = session.visitedSections.size;
    const projectsClicked = session.clickedProjects.length;
    
    let personalizedResponse = "";
    if (userProgress > 3 && projectsClicked > 1) {
      personalizedResponse = "I see you're thoroughly exploring! Based on your interests, you might enjoy the AI Quiz challenge. ";
    } else if (userProgress === 1) {
      personalizedResponse = "Welcome to my AI-powered tour! I'll adapt my responses based on what interests you most. ";
    }
    
    const suggestion = getNextSuggestion();
    return `${personalizedResponse}That's an interesting question! I can tell you about Srinivas's projects, skills, achievements, certifications. Or try:\n\n🎯 "Challenge me with a quiz"\n🔮 "Show career predictions"\n🎵 "Try my AI demos"\n💡 Type "inspire me" for wisdom\n\n${suggestion.message}`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMessage: AIMessage = {
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: AIMessage = {
        type: 'bot',
        content: getAIResponse(userInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    "Tell me about his projects",
    "Show me Python vs Java skills", 
    "Generate a resume",
    "Try my AI demos",
    "Challenge me with a quiz",
    "Show career predictions",
    "What are his achievements?",
    "Inspire me"
  ];

  return (
    <>
      {/* Floating AI Orb */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen && messages.length === 0) {
              // Add enhanced welcome message when first opening
              setTimeout(() => {
                setMessages([{
                  type: 'bot',
                  content: "🙏 Namaste! I'm Medhasa (मेधासा), Srinivas's AI assistant and your personal portfolio guide. I'm powered by the same AI principles that drive his projects!\n\n✨ **I can help you:**\n• Explore his technical skills & expertise\n• Dive deep into his innovative projects\n• Understand his achievements & background\n• Try live AI demos & interactive tools\n• Generate tailored resumes for different roles\n\n🚀 Ready to discover what makes Srinivas an exceptional AI/ML enthusiast and developer? What interests you most?",
                  timestamp: new Date()
                }]);
              }, 500);
            }
          }}
          className="w-16 h-16 rounded-full bg-gradient-primary shadow-glow hover:shadow-lg transition-all duration-300 border-0 relative overflow-hidden group"
        >
          {/* AI Orb Visual Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
          <div className="absolute inset-2 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-4 bg-gradient-to-r from-teal-400/40 to-blue-400/40 rounded-full animate-ping" />
          
          {isOpen ? (
            <X className="h-6 w-6 text-white z-10 relative" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <img 
                src={medhasaLogo} 
                alt="Medhasa" 
                className="w-8 h-8 rounded-full animate-pulse"
              />
            </div>
          )}
          
          {/* Thinking Indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-w-[90vw]"
          >
            <Card className="h-full card-gradient border-0 shadow-xl backdrop-blur-sm">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-border/10 bg-gradient-to-r from-primary/5 to-purple/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden">
                      <img 
                        src={medhasaLogo} 
                        alt="Medhasa AI Assistant" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Medhasa</h3>
                      <p className="text-xs text-muted-foreground">मेधासा - My AI Assistant</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-primary text-white'
                            : 'bg-muted/50 text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="p-2 border-t border-border/10">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUserInput(question);
                          setTimeout(handleSendMessage, 100);
                        }}
                        className="text-xs h-7 bg-muted/30 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about Srinivas..."
                      className="flex-1 px-3 py-2 bg-muted/30 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button size="sm" onClick={handleSendMessage} className="bg-gradient-primary border-0">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* AI Features Quick Access */}
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowSkillVisualizer(true)}
                      className="text-xs bg-blue/10 text-blue hover:bg-blue/20"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Skills
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowResumeGenerator(true)}
                      className="text-xs bg-green/10 text-green hover:bg-green/20"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowAIDemo(true)}
                      className="text-xs bg-purple/10 text-purple hover:bg-purple/20"
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      Try AI
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Fact Popup */}
            <AnimatePresence>
              {showFact && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="absolute -top-32 right-0 w-80"
                >
                  <Card className="card-gradient border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{aiFacts[currentFact].icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm text-primary flex items-center gap-1">
                            <Sparkles className="h-4 w-4" />
                            {aiFacts[currentFact].title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {aiFacts[currentFact].description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skills Cloud */}
            <AnimatePresence>
              {showSkillsCloud && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute -top-48 right-0 w-80"
                >
                  <Card className="card-gradient border-0 shadow-lg">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm text-primary flex items-center gap-1 mb-3">
                        <Tags className="h-4 w-4" />
                        Skills Spotlight
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {skills.flatMap(category => 
                          category.technologies.slice(0, 3).map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge 
                                variant="outline" 
                                className={`text-xs border-0 ${
                                  index % 4 === 0 ? 'bg-primary/10 text-primary' :
                                  index % 4 === 1 ? 'bg-purple/10 text-purple' :
                                  index % 4 === 2 ? 'bg-teal/10 text-teal' :
                                  'bg-orange/10 text-orange'
                                }`}
                              >
                                {skill.name}
                              </Badge>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Additional AI Features */}
            <SkillVisualizer 
              isOpen={showSkillVisualizer} 
              onClose={() => setShowSkillVisualizer(false)}
              query={skillQuery}
            />
            <ResumeGenerator 
              isOpen={showResumeGenerator} 
              onClose={() => setShowResumeGenerator(false)}
            />
            <MLDemo 
              isOpen={showMLDemo} 
              onClose={() => setShowMLDemo(false)}
            />
            <AIDemo 
              isOpen={showAIDemo} 
              onClose={() => setShowAIDemo(false)}
            />
            <AIQuiz 
              isOpen={showAIQuiz} 
              onClose={() => setShowAIQuiz(false)}
            />
            <CareerPredictor 
              isOpen={showCareerPredictor} 
              onClose={() => setShowCareerPredictor(false)}
            />
    </>
  );
}