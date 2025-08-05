
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, SaveIcon, Edit2, Copy, Volume2 } from 'lucide-react';

const sampleTranscription = `Officer: Please state your name and address for the record.

Witness: My name is Rajesh Kumar. I live at 123 Patel Street, Shivaji Nagar.

Officer: Can you tell us what you witnessed on the evening of December 15th?

Witness: Yes, I was closing my shop around 9:30 PM. I saw two young men entering the jewelry store across the street. They were wearing dark clothes and had their faces covered. About 5 minutes later, I heard some shouting and then they ran out carrying bags. They got on a motorcycle that was parked nearby and drove away very fast.

Officer: Did you get a look at their faces or the motorcycle?

Witness: I couldn't see their faces clearly, but one was taller than the other. The motorcycle was dark colored, maybe black or dark blue. I think it had a dent on the side.`;

const TranscriptionCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transcription, setTranscription] = useState(sampleTranscription);
  const [originalTranscription, setOriginalTranscription] = useState(sampleTranscription);
  const { toast } = useToast();
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const enableEditing = () => {
    setIsEditing(true);
    setOriginalTranscription(transcription);
  };
  
  const saveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Changes Saved",
      description: "The transcription has been updated.",
    });
  };
  
  const cancelEditing = () => {
    setTranscription(originalTranscription);
    setIsEditing(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    toast({
      title: "Copied",
      description: "Transcription copied to clipboard.",
      duration: 2000
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Transcription</span>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveChanges}>
                  <SaveIcon className="h-4 w-4 mr-2" /> Save
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={enableEditing}>
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Interview with witness Rajesh Kumar - Case #CS-2023-0458</span>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={togglePlayback}>
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex items-center ml-2">
              <Volume2 className="h-4 w-4 mr-1 text-muted-foreground" />
              <div className="w-16 h-1 bg-muted-foreground/30 rounded-full">
                <div className="w-10 h-1 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        ) : (
          <div className="whitespace-pre-line p-4 border rounded-md max-h-[400px] overflow-y-auto font-mono text-sm">
            {transcription}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Language: English | Duration: 4:32 | Word Count: 156
        </div>
        <Button>
          Use for FIR
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TranscriptionCard;
