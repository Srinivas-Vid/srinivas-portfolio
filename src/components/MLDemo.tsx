import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Brain, Play, RotateCcw, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MLDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple logistic regression for binary classification demo
class SimpleMLClassifier {
  private weights: number[] = [0.5, -0.3, 0.8];
  private bias: number = 0.1;

  predict(features: number[]): { probability: number; prediction: string; confidence: number } {
    const logit = features.reduce((sum, feature, i) => sum + feature * this.weights[i], this.bias);
    const probability = 1 / (1 + Math.exp(-logit));
    const prediction = probability > 0.5 ? 'Positive' : 'Negative';
    const confidence = Math.abs(probability - 0.5) * 2;
    
    return { probability, prediction, confidence };
  }

  getFeatureImportance(): { feature: string; importance: number }[] {
    const totalWeight = this.weights.reduce((sum, w) => sum + Math.abs(w), 0);
    return [
      { feature: 'Feature A', importance: Math.abs(this.weights[0]) / totalWeight },
      { feature: 'Feature B', importance: Math.abs(this.weights[1]) / totalWeight },
      { feature: 'Feature C', importance: Math.abs(this.weights[2]) / totalWeight },
    ];
  }
}

export function MLDemo({ isOpen, onClose }: MLDemoProps) {
  const [features, setFeatures] = useState([0.5, 0.3, 0.7]);
  const [result, setResult] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [classifier] = useState(new SimpleMLClassifier());
  const [predictionHistory, setPredictionHistory] = useState<any[]>([]);

  useEffect(() => {
    if (features) {
      const prediction = classifier.predict(features);
      setResult(prediction);
    }
  }, [features, classifier]);

  const handleTrain = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setTrainingProgress(i);
    }
    
    setIsTraining(false);
    
    // Add some randomness to make it look like the model improved
    const newPrediction = classifier.predict(features);
    setResult(newPrediction);
  };

  const handlePredict = () => {
    if (result) {
      setPredictionHistory(prev => [
        { features: [...features], result: { ...result }, timestamp: Date.now() },
        ...prev.slice(0, 4) // Keep last 5 predictions
      ]);
    }
  };

  const resetDemo = () => {
    setFeatures([0.5, 0.3, 0.7]);
    setPredictionHistory([]);
    setTrainingProgress(0);
  };

  const generateRandomSample = () => {
    setFeatures([
      Math.random(),
      Math.random(),
      Math.random()
    ]);
  };

  const featureNames = ['Experience Level', 'Project Complexity', 'Technology Stack'];
  const featureImportance = classifier.getFeatureImportance();

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
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="card-gradient border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Interactive ML Classifier</h2>
                      <p className="text-muted-foreground">Live demonstration of machine learning in action</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={onClose} className="hover:bg-destructive/10">
                    ✕
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Input Controls */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Input Features
                      </h3>
                      
                      {features.map((value, index) => (
                        <div key={index} className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">{featureNames[index]}</label>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {value.toFixed(2)}
                            </Badge>
                          </div>
                          <Slider
                            value={[value]}
                            onValueChange={(newValue) => {
                              const newFeatures = [...features];
                              newFeatures[index] = newValue[0];
                              setFeatures(newFeatures);
                            }}
                            max={1}
                            min={0}
                            step={0.01}
                            className="w-full"
                          />
                        </div>
                      ))}

                      <div className="flex gap-2 mt-4">
                        <Button onClick={generateRandomSample} variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Random Sample
                        </Button>
                        <Button onClick={handlePredict} size="sm" className="bg-gradient-primary">
                          <Play className="h-4 w-4 mr-2" />
                          Predict
                        </Button>
                      </div>
                    </div>

                    {/* Model Training */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-secondary" />
                        Model Training
                      </h4>
                      {isTraining ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Training Progress</span>
                            <span>{trainingProgress}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${trainingProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <Button onClick={handleTrain} variant="outline" size="sm">
                          Retrain Model
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-6">
                    {/* Current Prediction */}
                    {result && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-primary/5 to-purple/5 rounded-lg p-6"
                      >
                        <h3 className="text-lg font-semibold mb-4">Prediction Result</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Classification:</span>
                            <Badge 
                              variant={result.prediction === 'Positive' ? 'default' : 'secondary'}
                              className={result.prediction === 'Positive' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                            >
                              {result.prediction}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Probability:</span>
                              <span>{(result.probability * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${result.probability * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span>Confidence:</span>
                            <span>{(result.confidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Feature Importance */}
                    <div>
                      <h4 className="font-semibold mb-3">Feature Importance</h4>
                      <div className="space-y-2">
                        {featureImportance.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className="text-sm w-24">{item.feature}:</span>
                            <div className="flex-1 bg-background rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.importance * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-12">
                              {(item.importance * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prediction History */}
                    {predictionHistory.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Recent Predictions</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {predictionHistory.map((prediction, index) => (
                            <motion.div
                              key={prediction.timestamp}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm"
                            >
                              <span className="flex gap-1">
                                {prediction.features.map((f: number, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {f.toFixed(2)}
                                  </Badge>
                                ))}
                              </span>
                              <Badge 
                                variant={prediction.result.prediction === 'Positive' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {prediction.result.prediction}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* How It Works */}
                <div className="bg-gradient-to-r from-primary/5 to-purple/5 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    🧠 How This ML Model Works
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    This interactive demo showcases a binary classification model using logistic regression. 
                    Adjust the input features to see how the model's prediction changes in real-time. 
                    The model considers feature importance and outputs both the classification and confidence level.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button onClick={resetDemo} variant="outline">
                    Reset Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}