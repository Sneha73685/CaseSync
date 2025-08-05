
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import RecordingCard from '@/components/transcribe/RecordingCard';
import FileUploadCard from '@/components/transcribe/FileUploadCard';
import TranscriptionCard from '@/components/transcribe/TranscriptionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Transcribe = () => {
  const [activeTab, setActiveTab] = useState('record');
  
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Record & Transcribe</h2>
          <p className="text-muted-foreground">
            Record audio or upload media files for automatic transcription
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="record">Record Audio</TabsTrigger>
                <TabsTrigger value="upload">Upload Media</TabsTrigger>
              </TabsList>
              <TabsContent value="record">
                <RecordingCard />
              </TabsContent>
              <TabsContent value="upload">
                <FileUploadCard />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <TranscriptionCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Transcribe;
