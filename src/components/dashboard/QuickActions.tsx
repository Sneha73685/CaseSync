
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  FileUp, 
  FileText, 
  PlusCircle,
  FileAudio,
  FileVideo
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionButton = ({ icon, text, link }: { 
  icon: React.ReactNode; 
  text: string;
  link: string;
}) => (
  <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 px-6 w-full">
    <Link to={link}>
      {icon}
      <span className="mt-2">{text}</span>
    </Link>
  </Button>
);

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Essential tools to manage your cases and records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ActionButton 
            icon={<Mic className="h-6 w-6" />} 
            text="Record Audio" 
            link="/transcribe" 
          />
          <ActionButton 
            icon={<FileUp className="h-6 w-6" />} 
            text="Upload Files" 
            link="/files" 
          />
          <ActionButton 
            icon={<FileText className="h-6 w-6" />} 
            text="Generate FIR" 
            link="/fir" 
          />
          <ActionButton 
            icon={<PlusCircle className="h-6 w-6" />} 
            text="New Case" 
            link="/cases/new" 
          />
          <ActionButton 
            icon={<FileAudio className="h-6 w-6" />} 
            text="Audio Library" 
            link="/files?type=audio" 
          />
          <ActionButton 
            icon={<FileVideo className="h-6 w-6" />} 
            text="Video Library" 
            link="/files?type=video" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
