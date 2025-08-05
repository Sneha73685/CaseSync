import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import {
  Mic,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Users,
  Type,
  Languages,
  Download,
  Edit,
  Wand2,
  Clock,
  FileText,
  Headphones
} from 'lucide-react';

interface TranscriptionToolsProps {
  selectedFiles: string[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const TranscriptionTools = ({ selectedFiles, onAction }: TranscriptionToolsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [language, setLanguage] = useState('en');
  const [speakerCount, setSpeakerCount] = useState(2);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [transcriptionText, setTranscriptionText] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'bn', name: 'Bengali' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'ur', name: 'Urdu' }
  ];

  const sampleTranscription = `[00:00:15] Speaker 1: The incident occurred at approximately 9:30 PM on December 15th, 2023.

[00:00:28] Speaker 2: Can you describe what you witnessed at the jewelry store?

[00:00:35] Speaker 1: I saw two individuals wearing dark clothing. They appeared to be carrying bags when they exited the store.

[00:00:48] Speaker 2: Did you notice any distinguishing features about the suspects?

[00:00:55] Speaker 1: One was taller, approximately 5'8". The other was shorter. Both had their faces covered.

[00:01:05] Speaker 2: What happened immediately after they left the store?

[00:01:12] Speaker 1: They got on a dark-colored motorcycle and drove away towards the main road.`;

  const handleStartTranscription = () => {
    onAction('Transcription', 'Start transcription', { 
      language, 
      speakerCount, 
      files: selectedFiles 
    });
    setTranscriptionText(sampleTranscription);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onAction('Audio Player', isPlaying ? 'Pause' : 'Play');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Audio/Video Player & Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Media Player & Transcription Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Player Interface */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Evidence_Recording_001.mp3</h4>
              <Badge>03:42</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="bg-background rounded p-2">
                <div className="h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Audio Waveform Visualization</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" onClick={() => onAction('Player', 'Skip back')}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => onAction('Player', 'Skip forward')}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>00:15</span>
                  <span>03:42</span>
                </div>
                <Slider value={[currentTime]} max={222} className="w-full" />
              </div>
            </div>
          </div>

          {/* Transcription Settings */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Transcription Settings
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Speakers</label>
                <Select value={speakerCount.toString()} onValueChange={(v) => setSpeakerCount(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Speaker</SelectItem>
                    <SelectItem value="2">2 Speakers</SelectItem>
                    <SelectItem value="3">3 Speakers</SelectItem>
                    <SelectItem value="4">4+ Speakers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Playback Speed: {playbackSpeed[0]}x</label>
              <Slider 
                value={playbackSpeed} 
                onValueChange={setPlaybackSpeed}
                min={0.5} 
                max={2} 
                step={0.1} 
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleStartTranscription}>
                <Mic className="h-4 w-4 mr-2" />
                Start Transcription
              </Button>
              <Button variant="outline" onClick={() => onAction('Transcription', 'Auto-punctuation')}>
                <Type className="h-4 w-4 mr-2" />
                Auto-Punctuation
              </Button>
              <Button variant="outline" onClick={() => onAction('Transcription', 'Speaker identification')}>
                <Users className="h-4 w-4 mr-2" />
                Speaker ID
              </Button>
              <Button variant="outline" onClick={() => onAction('Transcription', 'Timestamp sync')}>
                <Clock className="h-4 w-4 mr-2" />
                Sync Timestamps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcription Editor */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Transcription Editor
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Export')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Smart edit')}>
                <Wand2 className="h-4 w-4 mr-2" />
                Smart Edit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Transcription Text Area */}
            <Textarea
              value={transcriptionText}
              onChange={(e) => setTranscriptionText(e.target.value)}
              placeholder="Transcription will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            
            {/* Transcription Tools */}
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Find and replace')}>
                <Edit className="h-4 w-4 mr-2" />
                Find & Replace
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Grammar check')}>
                <Type className="h-4 w-4 mr-2" />
                Grammar Check
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Add speaker')}>
                <Users className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Insert timestamp')}>
                <Clock className="h-4 w-4 mr-2" />
                Insert Timestamp
              </Button>
            </div>

            {/* Transcription Quality Metrics */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-3">Quality Metrics</h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-xs text-muted-foreground">Speakers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">03:42</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>

            {/* Additional Tools */}
            <div className="space-y-2">
              <h5 className="font-medium">Advanced Tools</h5>
              <div className="grid grid-cols-1 gap-2">
                <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Translate')}>
                  <Languages className="h-4 w-4 mr-2" />
                  Translate to English
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Summary')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Summary
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction('Transcription', 'Keywords')}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Extract Keywords
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptionTools;