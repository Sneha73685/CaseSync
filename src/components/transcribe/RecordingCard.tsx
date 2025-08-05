
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Square, PauseCircle, Loader2, ArrowRight } from 'lucide-react';

const languages = [
  { value: 'hi', label: 'Hindi' },
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'bn', label: 'Bengali' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'or', label: 'Odia' },
  { value: 'as', label: 'Assamese' },
  { value: 'ur', label: 'Urdu' },
];

type RecordingState = 'idle' | 'recording' | 'paused' | 'processing';

const RecordingCard = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [language, setLanguage] = useState('hi');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const startRecording = () => {
    setRecordingState('recording');
    setRecordingTime(0);
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    setRecordingInterval(interval as NodeJS.Timeout);
  };
  
  const pauseRecording = () => {
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    setRecordingState('paused');
  };
  
  const resumeRecording = () => {
    setRecordingState('recording');
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    setRecordingInterval(interval as NodeJS.Timeout);
  };
  
  const stopRecording = () => {
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    setRecordingState('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      // In a real app, this would involve sending the recording for transcription
      setRecordingState('idle');
      setRecordingTime(0);
    }, 2000);
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Record Statement</CardTitle>
        <CardDescription>Record audio for transcription using the Bhashini API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Language</label>
          <Select value={language} onValueChange={handleLanguageChange} disabled={recordingState !== 'idle'}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col items-center justify-center py-10 space-y-4 border rounded-md bg-muted/20">
          {recordingState === 'processing' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Processing recording...</p>
            </div>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <div className={`h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  recordingState === 'recording' 
                    ? 'bg-red-100 dark:bg-red-900/30 scale-110' 
                    : 'bg-muted'
                }`}>
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                    recordingState === 'recording' 
                      ? 'bg-red-500 pulse-subtle' 
                      : 'bg-police'
                  }`}>
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                </div>
                {recordingState === 'recording' && (
                  <div className="absolute -top-2 right-0">
                    <div className="animate-pulse h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                {recordingState !== 'idle' && (
                  <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {recordingState === 'idle' && 'Click to start recording'}
                  {recordingState === 'recording' && 'Recording in progress'}
                  {recordingState === 'paused' && 'Recording paused'}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {recordingState === 'idle' ? (
          <>
            <Button variant="ghost">Cancel</Button>
            <Button onClick={startRecording}>
              <Mic className="mr-2 h-4 w-4" /> Start Recording
            </Button>
          </>
        ) : recordingState === 'recording' ? (
          <>
            <Button variant="outline" onClick={pauseRecording}>
              <PauseCircle className="mr-2 h-4 w-4" /> Pause
            </Button>
            <Button variant="destructive" onClick={stopRecording}>
              <Square className="mr-2 h-4 w-4" /> Stop
            </Button>
          </>
        ) : recordingState === 'paused' ? (
          <>
            <Button variant="outline" onClick={resumeRecording}>
              <Mic className="mr-2 h-4 w-4" /> Resume
            </Button>
            <Button variant="destructive" onClick={stopRecording}>
              <Square className="mr-2 h-4 w-4" /> Stop
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" disabled>Cancel</Button>
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecordingCard;
