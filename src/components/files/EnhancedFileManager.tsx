import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Import all tool modules
import FileUploadManager from './modules/FileUploadManager';
import TranscriptionTools from './modules/TranscriptionTools';
import EnhancementTools from './modules/EnhancementTools';
import RedactionTools from './modules/RedactionTools';
import AnnotationTools from './modules/AnnotationTools';
import CaseManagement from './modules/CaseManagement';
import CollaborationTools from './modules/CollaborationTools';
import AIAnalysisTools from './modules/AIAnalysisTools';
import MetadataViewer from './modules/MetadataViewer';
import ReportGenerator from './modules/ReportGenerator';
import BulkOperations from './modules/BulkOperations';
import AuditTrail from './modules/AuditTrail';

import {
  Search,
  Upload,
  Settings,
  FileText,
  Video,
  Mic,
  Shield,
  Eye,
  Users,
  Brain,
  MapPin,
  FileDown,
  FolderOpen,
  History,
  Filter
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'audio' | 'video' | 'document' | 'image';
  size: number;
  uploadDate: string;
  lastModified: string;
  status: 'processing' | 'completed' | 'error' | 'pending';
  caseId: string;
  tags: string[];
  metadata: any;
  transcription?: string;
  annotations?: any[];
  redactions?: any[];
  analysis?: any;
}

const EnhancedFileManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleToolAction = (tool: string, action: string, data?: any) => {
    toast({
      title: `${tool} Tool`,
      description: `${action} executed successfully`,
    });
    console.log(`Tool: ${tool}, Action: ${action}`, data);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Main Toolbar */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">CaseSync Evidence Management</CardTitle>
              <p className="text-muted-foreground">Complete digital evidence processing platform</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Evidence
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files, cases, metadata..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {files.length} Files
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {selectedFiles.length} Selected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs Interface */}
      <Card className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <CardHeader className="pb-3">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-1 h-auto p-1">
              <TabsTrigger value="files" className="flex flex-col gap-1 h-12">
                <FolderOpen className="h-4 w-4" />
                <span className="text-xs">Files</span>
              </TabsTrigger>
              <TabsTrigger value="transcription" className="flex flex-col gap-1 h-12">
                <Mic className="h-4 w-4" />
                <span className="text-xs">Transcribe</span>
              </TabsTrigger>
              <TabsTrigger value="enhancement" className="flex flex-col gap-1 h-12">
                <Settings className="h-4 w-4" />
                <span className="text-xs">Enhance</span>
              </TabsTrigger>
              <TabsTrigger value="redaction" className="flex flex-col gap-1 h-12">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Redact</span>
              </TabsTrigger>
              <TabsTrigger value="annotation" className="flex flex-col gap-1 h-12">
                <Eye className="h-4 w-4" />
                <span className="text-xs">Annotate</span>
              </TabsTrigger>
              <TabsTrigger value="cases" className="flex flex-col gap-1 h-12">
                <FileText className="h-4 w-4" />
                <span className="text-xs">Cases</span>
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex flex-col gap-1 h-12">
                <Users className="h-4 w-4" />
                <span className="text-xs">Collaborate</span>
              </TabsTrigger>
              <TabsTrigger value="ai-analysis" className="flex flex-col gap-1 h-12">
                <Brain className="h-4 w-4" />
                <span className="text-xs">AI Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="metadata" className="flex flex-col gap-1 h-12">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Metadata</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex flex-col gap-1 h-12">
                <FileDown className="h-4 w-4" />
                <span className="text-xs">Reports</span>
              </TabsTrigger>
              <TabsTrigger value="bulk" className="flex flex-col gap-1 h-12">
                <Upload className="h-4 w-4" />
                <span className="text-xs">Bulk Ops</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex flex-col gap-1 h-12">
                <History className="h-4 w-4" />
                <span className="text-xs">Audit</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="flex-1">
            <TabsContent value="files" className="mt-0 h-full">
              <FileUploadManager 
                files={files}
                setFiles={setFiles}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="transcription" className="mt-0 h-full">
              <TranscriptionTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="enhancement" className="mt-0 h-full">
              <EnhancementTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="redaction" className="mt-0 h-full">
              <RedactionTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="annotation" className="mt-0 h-full">
              <AnnotationTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="cases" className="mt-0 h-full">
              <CaseManagement 
                files={files}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="collaboration" className="mt-0 h-full">
              <CollaborationTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="ai-analysis" className="mt-0 h-full">
              <AIAnalysisTools 
                selectedFiles={selectedFiles}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="metadata" className="mt-0 h-full">
              <MetadataViewer 
                selectedFiles={selectedFiles}
                files={files}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="reports" className="mt-0 h-full">
              <ReportGenerator 
                selectedFiles={selectedFiles}
                files={files}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="bulk" className="mt-0 h-full">
              <BulkOperations 
                selectedFiles={selectedFiles}
                files={files}
                onAction={handleToolAction}
              />
            </TabsContent>

            <TabsContent value="audit" className="mt-0 h-full">
              <AuditTrail 
                files={files}
                onAction={handleToolAction}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EnhancedFileManager;