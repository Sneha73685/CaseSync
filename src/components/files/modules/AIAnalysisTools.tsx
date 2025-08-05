import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Brain,
  Search,
  MessageSquare,
  MapPin,
  Users,
  Car,
  Eye,
  TrendingUp,
  Zap,
  Target,
  FileText,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

interface AIAnalysisToolsProps {
  selectedFiles: string[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const AIAnalysisTools = ({ selectedFiles, onAction }: AIAnalysisToolsProps) => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analysisResults = {
    entities: [
      { type: 'Person', value: 'Rajesh Kumar', confidence: 95, context: 'Witness mentioned multiple times' },
      { type: 'Location', value: 'Shivaji Nagar', confidence: 88, context: 'Crime scene location' },
      { type: 'Vehicle', value: 'Dark motorcycle', confidence: 82, context: 'Escape vehicle' },
      { type: 'Time', value: '21:30 hours', confidence: 92, context: 'Incident time' }
    ],
    keywords: [
      { word: 'jewelry', frequency: 15, relevance: 'high' },
      { word: 'suspects', frequency: 12, relevance: 'high' },
      { word: 'motorcycle', frequency: 8, relevance: 'medium' },
      { word: 'witness', frequency: 7, relevance: 'medium' },
      { word: 'bags', frequency: 5, relevance: 'low' }
    ],
    sentiment: {
      overall: 'negative',
      confidence: 87,
      breakdown: { negative: 65, neutral: 25, positive: 10 }
    },
    summary: "The evidence indicates a theft incident at a jewelry store in Shivaji Nagar at approximately 21:30 hours. Two suspects were involved, with witness Rajesh Kumar providing key testimony. The suspects escaped on a dark-colored motorcycle carrying bags."
  };

  const detectionResults = [
    { type: 'Faces', count: 3, confidence: 94, status: 'detected' },
    { type: 'License Plates', count: 1, confidence: 78, status: 'partial' },
    { type: 'Objects', count: 12, confidence: 91, status: 'detected' },
    { type: 'Text/Numbers', count: 5, confidence: 85, status: 'detected' }
  ];

  const handleStartAnalysis = (type: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          onAction('AI Analysis', type, { completed: true });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    onAction('AI Analysis', `Start ${type}`, { files: selectedFiles });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI-Powered Evidence Analysis
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleStartAnalysis('Quick Analysis')}
                disabled={selectedFiles.length === 0 || isAnalyzing}
              >
                <Zap className="h-4 w-4 mr-2" />
                Quick Analysis
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleStartAnalysis('Deep Analysis')}
                disabled={selectedFiles.length === 0 || isAnalyzing}
              >
                <Brain className="h-4 w-4 mr-2" />
                Deep Analysis
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAnalyzing && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Analyzing Evidence...</span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
            </div>
          )}
          
          {selectedFiles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedFiles.length}</div>
                <div className="text-sm text-muted-foreground">Files Selected</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-muted-foreground">AI Confidence</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-muted-foreground">Entities Found</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">Key Insights</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select files to start AI analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results Tabs */}
      <Tabs defaultValue="entities">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="entities">Entity Extraction</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="detection">Object Detection</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Entity Extraction */}
        <TabsContent value="entities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Named Entity Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResults.entities.map((entity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant="outline" className="mb-2">{entity.type}</Badge>
                          <h4 className="font-medium">{entity.value}</h4>
                        </div>
                        <Badge className={getConfidenceColor(entity.confidence)}>
                          {entity.confidence}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entity.context}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onAction('AI Analysis', 'Export entities')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export Entities
                  </Button>
                  <Button variant="outline" onClick={() => onAction('AI Analysis', 'Relationship mapping')}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Map Relationships
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords */}
        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Keyword Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {analysisResults.keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{keyword.word}</span>
                        <Badge 
                          variant={keyword.relevance === 'high' ? 'default' : 
                                  keyword.relevance === 'medium' ? 'secondary' : 'outline'}
                        >
                          {keyword.relevance}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {keyword.frequency} occurrences
                        </span>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(keyword.frequency / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onAction('AI Analysis', 'Generate word cloud')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Word Cloud
                  </Button>
                  <Button variant="outline" onClick={() => onAction('AI Analysis', 'Trend analysis')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trend Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sentiment Analysis */}
        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {analysisResults.sentiment.overall.toUpperCase()}
                  </div>
                  <Badge className={getConfidenceColor(analysisResults.sentiment.confidence)}>
                    {analysisResults.sentiment.confidence}% Confidence
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Negative</span>
                    <span className="text-sm">{analysisResults.sentiment.breakdown.negative}%</span>
                  </div>
                  <Progress value={analysisResults.sentiment.breakdown.negative} className="bg-red-100" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Neutral</span>
                    <span className="text-sm">{analysisResults.sentiment.breakdown.neutral}%</span>
                  </div>
                  <Progress value={analysisResults.sentiment.breakdown.neutral} className="bg-gray-100" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Positive</span>
                    <span className="text-sm">{analysisResults.sentiment.breakdown.positive}%</span>
                  </div>
                  <Progress value={analysisResults.sentiment.breakdown.positive} className="bg-green-100" />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium mb-2">Key Insights</h5>
                  <ul className="text-sm space-y-1">
                    <li>• High negative sentiment indicates distress in witness statements</li>
                    <li>• Emotional peaks occur during incident description</li>
                    <li>• Consistent tone suggests truthful testimony</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Object Detection */}
        <TabsContent value="detection">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Object & Pattern Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {detectionResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{result.type}</h4>
                        <Badge 
                          variant={result.status === 'detected' ? 'default' : 'secondary'}
                        >
                          {result.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold">{result.count}</span>
                        <span className={`text-sm px-2 py-1 rounded ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}%
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Objects detected with high confidence
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" onClick={() => onAction('Detection', 'Face recognition')}>
                    <Users className="h-4 w-4 mr-2" />
                    Face Recognition
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Detection', 'License plates')}>
                    <Car className="h-4 w-4 mr-2" />
                    License Plates
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Detection', 'Object tracking')}>
                    <Target className="h-4 w-4 mr-2" />
                    Object Tracking
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Detection', 'Pattern analysis')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Pattern Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium mb-2">Executive Summary</h4>
                  <p className="text-sm">{analysisResults.summary}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Key Recommendations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Enhance Video Quality</p>
                        <p className="text-sm text-muted-foreground">
                          License plate visibility can be improved using AI enhancement tools
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded">
                      <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Focus Investigation</p>
                        <p className="text-sm text-muted-foreground">
                          Rajesh Kumar appears to be a key witness with valuable information
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded">
                      <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Pattern Match</p>
                        <p className="text-sm text-muted-foreground">
                          Similar incidents detected in database - potential serial offenders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Predictive Analysis</h4>
                  <Textarea 
                    placeholder="AI-generated predictions and correlations will appear here..."
                    rows={4}
                    readOnly
                    value="Based on the evidence patterns and historical data analysis, there is an 78% probability that the suspects have committed similar crimes in the nearby areas within the last 6 months. The modus operandi suggests organized criminal activity with potential connections to three other unsolved cases in the district."
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => onAction('Insights', 'Generate full report')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Full Report
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Insights', 'Export analysis')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAnalysisTools;