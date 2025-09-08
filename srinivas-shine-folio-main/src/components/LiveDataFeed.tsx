import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveDataItem {
  id: string;
  title: string;
  category: 'ai' | 'tech' | 'data' | 'crypto';
  value: string;
  change: number;
  summary: string;
  timestamp: Date;
}

export function LiveDataFeed() {
  const [dataFeed, setDataFeed] = useState<LiveDataItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate live data updates
  useEffect(() => {
    const generateMockData = (): LiveDataItem[] => [
      {
        id: '1',
        title: 'AI Job Market',
        category: 'ai',
        value: '+42%',
        change: 42,
        summary: 'ML Engineer positions increased 42% this quarter',
        timestamp: new Date()
      },
      {
        id: '2',
        title: 'Python Popularity',
        category: 'tech',
        value: '#1',
        change: 0,
        summary: 'Python remains most popular language for AI/ML',
        timestamp: new Date()
      },
      {
        id: '3',
        title: 'Data Science Salaries',
        category: 'data',
        value: '$165K',
        change: 15,
        summary: 'Average ML Engineer salary up 15% YoY',
        timestamp: new Date()
      },
      {
        id: '4',
        title: 'AI Investment',
        category: 'ai',
        value: '$50B',
        change: 28,
        summary: 'Global AI funding reached $50B this year',
        timestamp: new Date()
      },
      {
        id: '5',
        title: 'TensorFlow Downloads',
        category: 'tech',
        value: '2M+',
        change: 18,
        summary: 'Weekly TensorFlow downloads exceed 2M',
        timestamp: new Date()
      }
    ];

    setDataFeed(generateMockData());

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 5);
      // Occasionally update values to simulate real-time data
      if (Math.random() < 0.3) {
        setDataFeed(generateMockData());
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return '🤖';
      case 'tech': return '💻';
      case 'data': return '📊';
      case 'crypto': return '₿';
      default: return '📈';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'tech': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'data': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'crypto': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (dataFeed.length === 0) return null;

  const currentItem = dataFeed[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 w-80 max-w-[calc(100vw-3rem)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="card-gradient border-0 shadow-lg backdrop-blur-sm bg-card/95">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(currentItem.category)}</span>
                      <h4 className="font-semibold text-sm text-foreground">
                        {currentItem.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getCategoryColor(currentItem.category)}>
                        {currentItem.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Live
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {currentItem.value}
                  </div>
                  {currentItem.change !== 0 && (
                    <div className={`text-xs flex items-center gap-1 ${
                      currentItem.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      {currentItem.change > 0 ? '+' : ''}{currentItem.change}%
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {currentItem.summary}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  Updated just now
                </span>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-orange animate-pulse" />
                  <span className="text-xs text-orange font-medium">
                    Real-time data
                  </span>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="flex gap-1 mt-3">
                {dataFeed.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}