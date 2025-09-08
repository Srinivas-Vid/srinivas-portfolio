import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, Target, Clock, Zap, CheckCircle, XCircle } from 'lucide-react';

interface AIQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary advantage of using Python for machine learning?",
    options: [
      "Fastest execution speed",
      "Rich ecosystem of ML libraries",
      "Lowest memory usage",
      "Best for mobile development"
    ],
    correctAnswer: 1,
    explanation: "Python's extensive libraries like scikit-learn, TensorFlow, and pandas make it ideal for ML development.",
    category: "Python",
    difficulty: 'Easy'
  },
  {
    id: 2,
    question: "In music genre classification, what type of neural network is most effective?",
    options: [
      "Recurrent Neural Network (RNN)",
      "Convolutional Neural Network (CNN)",
      "Multilayer Perceptron (MLP)",
      "Linear Regression"
    ],
    correctAnswer: 1,
    explanation: "CNNs excel at processing spectrograms and extracting features from audio data for genre classification.",
    category: "Deep Learning",
    difficulty: 'Medium'
  }
];

export function AIQuiz({ isOpen, onClose }: AIQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setIsGameComplete(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsGameComplete(false);
    setStreak(0);
    setTimeLeft(30);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-primary" />
            Challenge Medhasa Quiz
            <Badge variant="secondary" className="ml-auto">
              Question {currentQuestion + 1}/{quizQuestions.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {!isGameComplete ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                <div className="grid gap-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => !showResult && handleAnswer(index)}
                      disabled={showResult}
                      className={`p-4 text-left ${
                        showResult
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : selectedAnswer === index
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'opacity-50'
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <p className="text-sm">
                      <strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold">Quiz Complete!</h3>
              <p className="text-xl">Score: {score} / {quizQuestions.length}</p>
              
              <div className="flex gap-3 justify-center">
                <Button onClick={resetQuiz}>Play Again</Button>
                <Button variant="outline" onClick={onClose}>Close</Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}