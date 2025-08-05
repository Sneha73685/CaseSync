import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Trash2, Edit, Copy, Archive } from 'lucide-react';

interface BulkOperationsProps {
  selectedFiles: string[];
  files: any[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const BulkOperations = ({ selectedFiles, files, onAction }: BulkOperationsProps) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBulkOperation = (operation: string) => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          onAction('Bulk Operations', operation);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedFiles.length > 0 && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm">{selectedFiles.length} files selected for bulk operations</p>
            </div>
          )}
          
          {processing && (
            <div className="mb-4 space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-muted-foreground">Processing... {progress}%</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleBulkOperation('Download')}
              disabled={processing || selectedFiles.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Bulk Download
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleBulkOperation('Archive')}
              disabled={processing || selectedFiles.length === 0}
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleBulkOperation('Copy')}
              disabled={processing || selectedFiles.length === 0}
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleBulkOperation('Edit Metadata')}
              disabled={processing || selectedFiles.length === 0}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Metadata
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleBulkOperation('Delete')}
              disabled={processing || selectedFiles.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOperations;