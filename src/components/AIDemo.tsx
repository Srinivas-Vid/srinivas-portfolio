import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, FileAudio, MessageSquare, Bot, Mic, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoResult {
  genre?: string;
  confidence?: number;
  sentiment?: string;
  score?: number;
  emotions?: { [key: string]: number };
}

export function AIDemo({ isOpen, onClose }: AIDemoProps) {
  const [selectedDemo, setSelectedDemo] = useState<'genre' | 'sentiment' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sentimentText, setSentimentText] = useState("");
  const [result, setResult] = useState<DemoResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const processGenreClassification = async () => {
    if (!audioFile) return;
    
    setIsProcessing(true);
    setResult(null);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results based on common music genres
    const genres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic'];
    const selectedGenre = genres[Math.floor(Math.random() * genres.length)];
    const confidence = 0.75 + Math.random() * 0.24; // 75-99% confidence
    
    setResult({
      genre: selectedGenre,
      confidence: confidence
    });
    setIsProcessing(false);
  };

  const processSentimentAnalysis = async () => {
    if (!sentimentText.trim()) return;
    
    setIsProcessing(true);
    setResult(null);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple sentiment analysis simulation
    const text = sentimentText.toLowerCase();
    let sentiment = 'neutral';
    let score = 0.5;
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'happy', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'horrible', 'worst'];
    
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      score = 0.7 + Math.random() * 0.3;
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      score = Math.random() * 0.3;
    } else {
      score = 0.4 + Math.random() * 0.2;
    }
    
    setResult({
      sentiment,
      score,
      emotions: {
        joy: sentiment === 'positive' ? score : Math.random() * 0.3,
        sadness: sentiment === 'negative' ? score : Math.random() * 0.2,
        anger: text.includes('angry') || text.includes('mad') ? 0.6 + Math.random() * 0.4 : Math.random() * 0.2,
        fear: text.includes('scared') || text.includes('afraid') ? 0.6 + Math.random() * 0.4 : Math.random() * 0.1,
        surprise: text.includes('wow') || text.includes('amazing') ? 0.5 + Math.random() * 0.5 : Math.random() * 0.3
      }
    });
    setIsProcessing(false);
  };

  const resetDemo = () => {
    setSelectedDemo(null);
    setAudioFile(null);
    setSentimentText("");
    setResult(null);
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="card-gradient border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Try My AI</CardTitle>
                  <CardDescription>
                    Experience live AI demonstrations - Music Genre Classification & Sentiment Analysis
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!selectedDemo ? (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Music Genre Classification Demo */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-purple/5 to-blue/5 border border-purple/20"
                    onClick={() => setSelectedDemo('genre')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
                          <FileAudio className="h-5 w-5 text-purple" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Music Genre Classification</h3>
                          <p className="text-sm text-muted-foreground">Upload audio and let AI identify the genre</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Badge variant="outline" className="bg-purple/10 text-purple border-purple/20">
                          Deep Learning
                        </Badge>
                        <Badge variant="outline" className="bg-blue/10 text-blue border-blue/20">
                          Audio Processing
                        </Badge>
                        <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
                          TensorFlow
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-3">
                          Demonstrates my <strong>Genre Lab</strong> project using CNNs to classify music into Rock, Pop, Jazz, Classical, and more genres.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sentiment Analysis Demo */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-teal/5 to-green/5 border border-teal/20"
                    onClick={() => setSelectedDemo('sentiment')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal/20 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Sentiment Analysis</h3>
                          <p className="text-sm text-muted-foreground">Analyze text emotions and sentiment</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
                          NLP
                        </Badge>
                        <Badge variant="outline" className="bg-green/10 text-green border-green/20">
                          Text Analysis
                        </Badge>
                        <Badge variant="outline" className="bg-orange/10 text-orange border-orange/20">
                          Machine Learning
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-3">
                          Real-time sentiment analysis with emotion detection using <strong>Natural Language Processing</strong> techniques.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Demo Interface */}
                {selectedDemo === 'genre' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
                        <FileAudio className="h-5 w-5 text-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Music Genre Classification</h3>
                        <p className="text-sm text-muted-foreground">Upload an audio file for AI-powered genre detection</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                      {!audioFile ? (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-sm text-muted-foreground">Drag & drop an audio file or click to browse</p>
                            <p className="text-xs text-muted-foreground mt-1">Supports MP3, WAV, M4A files</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-purple/10 text-purple border-purple/20 hover:bg-purple/20"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Select Audio File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2">
                            <Mic className="h-5 w-5 text-purple" />
                            <span className="font-medium">{audioFile.name}</span>
                          </div>
                          <Button 
                            onClick={processGenreClassification}
                            disabled={isProcessing}
                            className="bg-gradient-primary text-white"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing Genre...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Classify Genre
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedDemo === 'sentiment' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Sentiment Analysis</h3>
                        <p className="text-sm text-muted-foreground">Enter text to analyze emotions and sentiment</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Textarea
                        placeholder="Enter your text here for sentiment analysis... (e.g., 'I love this amazing product! It makes me so happy.')"
                        value={sentimentText}
                        onChange={(e) => setSentimentText(e.target.value)}
                        className="min-h-24 bg-muted/30"
                      />
                      <Button 
                        onClick={processSentimentAnalysis}
                        disabled={isProcessing || !sentimentText.trim()}
                        className="bg-gradient-to-r from-teal-500 to-green-500 text-white"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing Sentiment...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Analyze Sentiment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Results */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6"
                    >
                      <Card className="bg-gradient-to-r from-primary/5 to-purple/5 border border-primary/20">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            AI Analysis Results
                          </h4>
                          
                          {selectedDemo === 'genre' && result.genre && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Detected Genre</p>
                                  <p className="text-2xl font-bold text-primary">{result.genre}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Confidence</p>
                                  <p className="text-2xl font-bold text-green">{(result.confidence! * 100).toFixed(1)}%</p>
                                </div>
                              </div>
                              <div className="w-full bg-muted/30 rounded-full h-2">
                                <div 
                                  className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${result.confidence! * 100}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {selectedDemo === 'sentiment' && result.sentiment && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Overall Sentiment</p>
                                  <div className="flex items-center gap-2">
                                    <p className={`text-2xl font-bold capitalize ${
                                      result.sentiment === 'positive' ? 'text-green' :
                                      result.sentiment === 'negative' ? 'text-red' : 'text-orange'
                                    }`}>
                                      {result.sentiment}
                                    </p>
                                    <span className="text-lg">
                                      {result.sentiment === 'positive' ? '😊' : 
                                       result.sentiment === 'negative' ? '😔' : '😐'}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Confidence Score</p>
                                  <p className="text-2xl font-bold text-primary">{(result.score! * 100).toFixed(1)}%</p>
                                </div>
                              </div>
                              
                              {result.emotions && (
                                <div>
                                  <p className="text-sm text-muted-foreground mb-3">Emotion Breakdown</p>
                                  <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(result.emotions).map(([emotion, score]) => (
                                      <div key={emotion} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                          <span className="capitalize">{emotion}</span>
                                          <span>{(score * 100).toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-muted/30 rounded-full h-1.5">
                                          <div 
                                            className="bg-gradient-to-r from-primary to-purple h-1.5 rounded-full transition-all duration-1000"
                                            style={{ width: `${score * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={resetDemo}>
                    Try Another Demo
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}