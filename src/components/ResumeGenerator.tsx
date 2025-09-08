import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { personalInfo, skills, projects, achievements, certifications, education, experience } from '@/data/portfolio';
import { FileText, Download, Sparkles, Target, Code, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

interface ResumeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeGenerator({ isOpen, onClose }: ResumeGeneratorProps) {
  const [selectedRole, setSelectedRole] = useState<'ai-ml' | 'data-analyst' | 'software-developer' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<any>(null);

  const roleConfigs = {
    'ai-ml': {
      title: 'AI & ML Engineer',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Machine Learning', 'Pandas', 'NumPy'],
      projects: projects.filter(p => 
        p.technologies.some(tech => 
          ['Python', 'TensorFlow', 'Scikit-learn', 'Machine Learning'].includes(tech)
        )
      ).slice(0, 3),
      summary: 'Passionate AI & ML Engineer with expertise in developing intelligent systems and machine learning models. Proven track record in implementing ML algorithms and creating data-driven solutions.',
      highlights: [
        'Expert in ML algorithms and deep learning frameworks',
        'Experience with TensorFlow, Scikit-learn, and Python ecosystem',
        'Strong background in statistical analysis and data modeling',
        'Proven ability to deploy ML models in production environments'
      ]
    },
    'data-analyst': {
      title: 'Data Analyst',
      icon: BarChart,
      color: 'bg-gradient-to-r from-blue-500 to-teal-500',
      skills: ['Python', 'SQL', 'Power BI', 'Pandas', 'Matplotlib', 'Seaborn', 'MySQL', 'PostgreSQL'],
      projects: projects.filter(p => 
        p.technologies.some(tech => 
          ['SQL', 'Power BI', 'Pandas', 'MySQL', 'PostgreSQL'].includes(tech)
        )
      ).slice(0, 3),
      summary: 'Detail-oriented Data Analyst with strong analytical skills and expertise in extracting actionable insights from complex datasets. Proficient in statistical analysis and data visualization.',
      highlights: [
        'Advanced SQL and database management skills',
        'Expert in data visualization with Power BI and Python libraries',
        'Strong statistical analysis and reporting capabilities',
        'Experience in business intelligence and dashboard creation'
      ]
    },
    'software-developer': {
      title: 'Software Developer',
      icon: Code,
      color: 'bg-gradient-to-r from-green-500 to-blue-500',
      skills: ['Python', 'Java', 'SQL', 'Flask', 'Git', 'C', 'Streamlit'],
      projects: projects.filter(p => 
        p.technologies.some(tech => 
          ['Java', 'Flask', 'Streamlit', 'Git'].includes(tech)
        )
      ).slice(0, 3),
      summary: 'Versatile Software Developer with strong programming fundamentals and experience in full-stack development. Skilled in multiple programming languages and frameworks.',
      highlights: [
        'Proficient in multiple programming languages (Python, Java, C)',
        'Experience with web frameworks and application development',
        'Strong problem-solving and algorithmic thinking skills',
        'Familiar with version control and software development lifecycle'
      ]
    }
  };

  const generateResume = async (role: keyof typeof roleConfigs) => {
    setIsGenerating(true);
    setSelectedRole(role);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const config = roleConfigs[role];
    const resume = {
      role: config.title,
      summary: config.summary,
      skills: config.skills,
      projects: config.projects,
      highlights: config.highlights,
      personalInfo,
      education,
      experience: experience.slice(0, 2), // Most relevant experience
      achievements: achievements.slice(0, 3),
      certifications: certifications.filter(cert => 
        cert.name.toLowerCase().includes('ai') || 
        cert.name.toLowerCase().includes('ml') || 
        cert.name.toLowerCase().includes('data') ||
        cert.name.toLowerCase().includes('python')
      ).slice(0, 3)
    };
    
    setGeneratedResume(resume);
    setIsGenerating(false);
  };

  const downloadPDF = () => {
    if (!generatedResume) return;

    const doc = new jsPDF();
    let yPosition = 20;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(personalInfo.name, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(generatedResume.role, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.text(`${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`, margin, yPosition);
    yPosition += 15;

    // Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Summary', margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(generatedResume.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * lineHeight + 5;

    // Skills
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Skills', margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(generatedResume.skills.join(', '), margin, yPosition);
    yPosition += lineHeight + 5;

    // Key Highlights
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Highlights', margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    generatedResume.highlights.forEach((highlight: string) => {
      doc.text(`• ${highlight}`, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 5;

    // Projects
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Featured Projects', margin, yPosition);
    yPosition += lineHeight;

    generatedResume.projects.forEach((project: any) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(project.title, margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(project.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * lineHeight;

      doc.text(`Technologies: ${project.technologies.join(', ')}`, margin, yPosition);
      yPosition += lineHeight + 3;
    });

    // Education
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', margin, yPosition);
    yPosition += lineHeight;

    education.forEach((edu: any) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.institution} | ${edu.duration}`, margin, yPosition);
      yPosition += lineHeight + 3;
    });

    doc.save(`${personalInfo.name.replace(' ', '_')}_${generatedResume.role.replace(' ', '_')}_Resume.pdf`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="card-gradient border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">AI Resume Generator</h2>
                      <p className="text-muted-foreground">Generate tailored resumes for different roles</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={onClose} className="hover:bg-destructive/10">
                    ✕
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {!generatedResume ? (
                  <>
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        Choose Your Target Role
                      </h3>
                      <p className="text-muted-foreground">
                        Our AI will customize the resume to highlight relevant skills and experience
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(roleConfigs).map(([key, config]) => {
                        const Icon = config.icon;
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                                isGenerating && selectedRole === key 
                                  ? 'border-primary shadow-primary/20' 
                                  : 'border-transparent hover:border-primary/30'
                              }`}
                              onClick={() => !isGenerating && generateResume(key as keyof typeof roleConfigs)}
                            >
                              <CardContent className="p-6 text-center space-y-4">
                                <div className={`w-16 h-16 rounded-full ${config.color} flex items-center justify-center mx-auto`}>
                                  <Icon className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold">{config.title}</h4>
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {config.skills.slice(0, 4).map(skill => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                {isGenerating && selectedRole === key && (
                                  <div className="flex items-center justify-center gap-2 text-primary">
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    <span className="text-sm">Generating...</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-purple/5 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        🤖 AI-Powered Customization
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Each resume is intelligently tailored with role-specific skills, relevant projects, 
                        and optimized summaries to match recruiter expectations.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          Resume Generated: {generatedResume.role}
                        </h3>
                        <p className="text-muted-foreground">Ready for download</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={downloadPDF}
                          className="bg-gradient-primary text-white hover:shadow-lg"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setGeneratedResume(null);
                            setSelectedRole(null);
                          }}
                        >
                          Generate Another
                        </Button>
                      </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="bg-white text-black p-8 rounded-lg shadow-inner max-h-96 overflow-y-auto border">
                      <div className="space-y-4">
                        <div className="text-center border-b pb-4">
                          <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                          <h2 className="text-lg text-gray-600">{generatedResume.role}</h2>
                          <p className="text-sm text-gray-500">
                            {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg border-b mb-2">Professional Summary</h3>
                          <p className="text-sm">{generatedResume.summary}</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg border-b mb-2">Technical Skills</h3>
                          <p className="text-sm">{generatedResume.skills.join(', ')}</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg border-b mb-2">Key Highlights</h3>
                          <ul className="text-sm space-y-1">
                            {generatedResume.highlights.map((highlight: string, index: number) => (
                              <li key={index}>• {highlight}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg border-b mb-2">Featured Projects</h3>
                          {generatedResume.projects.map((project: any, index: number) => (
                            <div key={index} className="mb-3">
                              <h4 className="font-semibold">{project.title}</h4>
                              <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                              <p className="text-xs text-gray-500">
                                Technologies: {project.technologies.join(', ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}