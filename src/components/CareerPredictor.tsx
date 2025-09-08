import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, Brain, Briefcase, DollarSign, Zap, Star, ArrowRight } from 'lucide-react';

interface CareerPredictorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CareerProjection {
  year: number;
  role: string;
  skills: string[];
  salary: number;
  probability: number;
  description: string;
}

const careerProjections: CareerProjection[] = [
  {
    year: 2025,
    role: "Senior ML Engineer",
    skills: ["Advanced Python", "TensorFlow", "MLOps", "Cloud Platforms"],
    salary: 120000,
    probability: 85,
    description: "Leading ML model development and deployment in production environments"
  },
  {
    year: 2027,
    role: "AI Research Scientist",
    skills: ["Research Methodology", "Publications", "Advanced Mathematics", "Novel Algorithms"],
    salary: 160000,
    probability: 72,
    description: "Conducting cutting-edge AI research and contributing to breakthrough innovations"
  }
];

export function CareerPredictor({ isOpen, onClose }: CareerPredictorProps) {
  const [selectedView, setSelectedView] = useState<'timeline' | 'skills' | 'analysis'>('timeline');

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-green-500';
    if (probability >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            Future Career Path Predictor
            <Badge variant="secondary" className="ml-auto">AI-Powered Forecasting</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-6">
          <Button 
            variant={selectedView === 'timeline' ? 'default' : 'outline'}
            onClick={() => setSelectedView('timeline')}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Career Timeline
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Projected Career Evolution</h3>
            <p className="text-muted-foreground">Based on current skills, market trends, and growth trajectory</p>
          </div>

          <div className="space-y-6">
            {careerProjections.map((projection, index) => (
              <motion.div
                key={projection.year}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-start gap-6 mb-8"
              >
                <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {projection.year}
                </div>
                
                <Card className="flex-1 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{projection.role}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getProbabilityColor(projection.probability)}>
                          {projection.probability}% likely
                        </Badge>
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {(projection.salary / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{projection.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {projection.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Predictions based on current trajectory, market trends, and AI analysis
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}