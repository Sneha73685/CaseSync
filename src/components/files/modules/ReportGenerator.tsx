import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { FileDown, FileText, Image, BarChart3, Calendar, Users } from 'lucide-react';

interface ReportGeneratorProps {
  selectedFiles: string[];
  files: any[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const ReportGenerator = ({ selectedFiles, files, onAction }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          onAction('Report', 'Generated successfully');
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Court-Ready Report Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive Evidence Report</SelectItem>
                <SelectItem value="summary">Executive Summary</SelectItem>
                <SelectItem value="technical">Technical Analysis Report</SelectItem>
                <SelectItem value="court">Court Submission Package</SelectItem>
              </SelectContent>
            </Select>
            
            {isGenerating && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground">Generating report... {progress}%</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => onAction('Report', 'Preview')}>
                <Image className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;