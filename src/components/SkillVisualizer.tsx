import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data/portfolio';
import { BarChart3, PieChart, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

interface SkillVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  query?: string;
}

export function SkillVisualizer({ isOpen, onClose, query }: SkillVisualizerProps) {
  const [activeChart, setActiveChart] = useState<'bar' | 'doughnut' | 'radar'>('bar');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Simulate skill proficiency levels (in a real app, this would come from your data)
  const skillProficiency: Record<string, number> = {
    'Python': 95,
    'Java': 80,
    'SQL': 90,
    'C': 75,
    'Scikit-learn': 88,
    'TensorFlow': 85,
    'Pandas': 92,
    'NumPy': 90,
    'Machine Learning': 90,
    'MySQL': 85,
    'PostgreSQL': 80,
    'Azure': 75,
    'Power BI': 82,
    'Matplotlib': 85,
    'Seaborn': 85,
    'Streamlit': 80,
    'Flask': 78,
    'Git': 85,
    'Jupyter': 88,
    'R': 70,
    'Kaggle': 85
  };

  // Parse query for skill comparisons
  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const allSkillNames = Object.keys(skillProficiency);
      
      // Check for comparison patterns like "python vs java" or "show me python java"
      const mentionedSkills = allSkillNames.filter(skill => 
        lowerQuery.includes(skill.toLowerCase())
      );
      
      if (mentionedSkills.length >= 2) {
        setComparisonMode(true);
        setSelectedSkills(mentionedSkills.slice(0, 4)); // Limit to 4 for readability
      } else if (mentionedSkills.length === 1) {
        // Show category containing this skill
        const skill = mentionedSkills[0];
        const category = skills.find(cat => 
          cat.technologies.some(tech => tech.name === skill)
        );
        if (category) {
          setSelectedCategory(category.category);
        }
      }
    }
  }, [query]);

  const getChartData = () => {
    if (comparisonMode && selectedSkills.length > 0) {
      return {
        labels: selectedSkills,
        datasets: [
          {
            label: 'Proficiency Level',
            data: selectedSkills.map(skill => skillProficiency[skill] || 70),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.8)',
              'rgba(20, 184, 166, 0.8)',
              'rgba(249, 115, 22, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(147, 51, 234)',
              'rgb(20, 184, 166)',
              'rgb(249, 115, 22)',
            ],
            borderWidth: 2,
          },
        ],
      };
    }

    const categoryData = selectedCategory === 'all' 
      ? skills.flatMap(cat => cat.technologies.map(tech => ({
          ...tech,
          category: cat.category,
          proficiency: skillProficiency[tech.name] || 70
        })))
      : skills.find(cat => cat.category === selectedCategory)?.technologies.map(tech => ({
          ...tech,
          category: selectedCategory,
          proficiency: skillProficiency[tech.name] || 70
        })) || [];

    return {
      labels: categoryData.map(skill => skill.name),
      datasets: [
        {
          label: 'Proficiency Level',
          data: categoryData.map(skill => skill.proficiency),
          backgroundColor: categoryData.map((_, index) => {
            const colors = [
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.8)',
              'rgba(20, 184, 166, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(234, 179, 8, 0.8)',
            ];
            return colors[index % colors.length];
          }),
          borderColor: categoryData.map((_, index) => {
            const colors = [
              'rgb(59, 130, 246)',
              'rgb(147, 51, 234)',
              'rgb(20, 184, 166)',
              'rgb(249, 115, 22)',
              'rgb(234, 179, 8)',
            ];
            return colors[index % colors.length];
          }),
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: comparisonMode ? 'Skill Comparison' : `Skills: ${selectedCategory === 'all' ? 'All Categories' : selectedCategory}`,
        color: '#64748b',
      },
    },
    scales: activeChart === 'bar' ? {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    } : undefined,
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const renderChart = () => {
    const data = getChartData();
    
    switch (activeChart) {
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      case 'radar':
        return <Radar data={data} options={radarOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  const quickComparisons = [
    { name: 'Python vs Java', skills: ['Python', 'Java'] },
    { name: 'ML Libraries', skills: ['Scikit-learn', 'TensorFlow', 'Pandas'] },
    { name: 'Databases', skills: ['MySQL', 'PostgreSQL', 'SQL'] },
    { name: 'Visualization', skills: ['Power BI', 'Matplotlib', 'Seaborn'] },
  ];

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
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Skill Visualizer</h2>
                      <p className="text-muted-foreground">Interactive skill analysis powered by AI</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={onClose} className="hover:bg-destructive/10">
                    ✕
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Chart Type Selector */}
                <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
                  {[
                    { type: 'bar' as const, icon: BarChart3, label: 'Bar Chart' },
                    { type: 'doughnut' as const, icon: PieChart, label: 'Doughnut' },
                    { type: 'radar' as const, icon: TrendingUp, label: 'Radar' },
                  ].map(({ type, icon: Icon, label }) => (
                    <Button
                      key={type}
                      variant={activeChart === type ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveChart(type)}
                      className={activeChart === type ? 'bg-gradient-primary text-white' : ''}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>

                {/* Quick Comparisons */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Quick Comparisons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quickComparisons.map((comparison) => (
                      <Button
                        key={comparison.name}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setComparisonMode(true);
                          setSelectedSkills(comparison.skills);
                        }}
                        className="border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                      >
                        {comparison.name}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setComparisonMode(false);
                        setSelectedCategory('all');
                      }}
                      className="border-secondary/20 hover:bg-secondary/10"
                    >
                      Show All
                    </Button>
                  </div>
                </div>

                {/* Category Filter */}
                {!comparisonMode && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        className={`cursor-pointer transition-all ${
                          selectedCategory === 'all' 
                            ? 'bg-gradient-primary text-white' 
                            : 'hover:bg-primary/10'
                        }`}
                        onClick={() => setSelectedCategory('all')}
                      >
                        All Skills
                      </Badge>
                      {skills.map((category) => (
                        <Badge
                          key={category.category}
                          variant={selectedCategory === category.category ? 'default' : 'outline'}
                          className={`cursor-pointer transition-all ${
                            selectedCategory === category.category 
                              ? 'bg-gradient-primary text-white' 
                              : 'hover:bg-primary/10'
                          }`}
                          onClick={() => setSelectedCategory(category.category)}
                        >
                          {category.category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chart */}
                <div className="h-96 bg-card/50 rounded-lg p-4">
                  {renderChart()}
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-primary/5 to-purple/5 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    🤖 AI Insights
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {comparisonMode && selectedSkills.length > 0
                      ? `Strong proficiency in ${selectedSkills[0]} (${skillProficiency[selectedSkills[0]]}%) makes it the dominant skill in this comparison. Consider leveraging this expertise for advanced projects.`
                      : selectedCategory === 'all'
                      ? "Srinivas shows exceptional versatility with 90%+ proficiency in core technologies like Python, Pandas, and SQL - ideal for end-to-end data science projects."
                      : `This category represents ${skills.find(s => s.category === selectedCategory)?.technologies.length || 0} key technologies essential for modern ${selectedCategory.toLowerCase()} workflows.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}