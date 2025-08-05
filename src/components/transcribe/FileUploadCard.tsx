
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FileUp, X, FileAudio, FileVideo, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface FileInfo {
  file: File;
  id: string;
  progress: number;
  status: UploadStatus;
  error?: string;
}

const FileUploadCard = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles: FileInfo[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const isAudioOrVideo = file.type.startsWith('audio/') || file.type.startsWith('video/');
      
      if (isAudioOrVideo) {
        newFiles.push({
          file,
          id: `file-${Date.now()}-${i}`,
          progress: 0,
          status: 'idle'
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not an audio or video file.`,
          variant: "destructive"
        });
      }
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      simulateUpload(newFiles);
    }
  };
  
  const simulateUpload = (newFiles: FileInfo[]) => {
    newFiles.forEach(fileInfo => {
      // Update status to uploading
      setFiles(prev => 
        prev.map(f => 
          f.id === fileInfo.id ? { ...f, status: 'uploading' as UploadStatus } : f
        )
      );
      
      // Simulate progress updates
      const interval = setInterval(() => {
        setFiles(prev => {
          const updatedFiles = prev.map(f => {
            if (f.id === fileInfo.id) {
              const newProgress = Math.min(f.progress + 5, 100);
              
              if (newProgress === 100) {
                clearInterval(interval);
                
                // After upload completes, simulate processing
                setTimeout(() => {
                  setFiles(prev => 
                    prev.map(f => 
                      f.id === fileInfo.id ? { ...f, status: 'success' as UploadStatus } : f
                    )
                  );
                  
                  toast({
                    title: "Upload Complete",
                    description: `${fileInfo.file.name} has been uploaded and processed.`,
                  });
                }, 1500);
                
                return { ...f, progress: newProgress, status: 'processing' as UploadStatus };
              }
              
              return { ...f, progress: newProgress };
            }
            return f;
          });
          
          return updatedFiles;
        });
      }, 300);
    });
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };
  
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('audio/')) {
      return <FileAudio className="h-6 w-6 text-blue-500" />;
    } else if (file.type.startsWith('video/')) {
      return <FileVideo className="h-6 w-6 text-purple-500" />;
    }
    return <FileUp className="h-6 w-6" />;
  };
  
  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>Upload audio or video files for transcription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*,video/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Drag & Drop Files</h3>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Drop audio or video files here, or click to browse.<br />
            Supports MP3, WAV, MP4, and other common formats.
          </p>
          <Button variant="outline" className="mt-4">
            Select Files
          </Button>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Files ({files.length})</h3>
            {files.map(fileInfo => (
              <div key={fileInfo.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(fileInfo.file)}
                    <div className="text-sm">
                      <p className="font-medium truncate max-w-[240px]">{fileInfo.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(fileInfo.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(fileInfo.status)}
                    {fileInfo.status !== 'success' && fileInfo.status !== 'processing' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(fileInfo.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {(fileInfo.status === 'uploading' || fileInfo.status === 'processing') && (
                  <div className="mt-2">
                    <Progress value={fileInfo.progress} className="h-1" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>
                        {fileInfo.status === 'uploading' ? 'Uploading' : 'Processing'}
                      </span>
                      <span>{fileInfo.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button disabled={files.length === 0}>
          Process Files
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUploadCard;
