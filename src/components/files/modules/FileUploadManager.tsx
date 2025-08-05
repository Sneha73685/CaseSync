import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Upload,
  FileAudio,
  FileVideo,
  FileText,
  FileImage,
  Download,
  Trash2,
  Edit,
  Share,
  FolderPlus,
  Tag,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadManagerProps {
  files: any[];
  setFiles: (files: any[]) => void;
  selectedFiles: string[];
  setSelectedFiles: (files: string[]) => void;
  onAction: (tool: string, action: string, data?: any) => void;
}

const FileUploadManager = ({
  files,
  setFiles,
  selectedFiles,
  setSelectedFiles,
  onAction
}: FileUploadManagerProps) => {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles);
  }, []);

  const handleFileUpload = async (fileList: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const newFile = {
        id: `file-${Date.now()}-${i}`,
        name: file.name,
        type: getFileType(file.type),
        size: file.size,
        uploadDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: 'processing',
        caseId: 'CS-2024-NEW',
        tags: [],
        metadata: {
          originalType: file.type,
          originalSize: file.size
        }
      };

      setFiles([...files, newFile]);
      setUploadProgress(((i + 1) / fileList.length) * 100);
      
      // Simulate processing
      setTimeout(() => {
      setFiles((prev: any[]) => prev.map(f => 
        f.id === newFile.id ? { ...f, status: 'completed' } : f
      ));
      }, 2000);
    }

    setUploading(false);
    toast({
      title: "Files Uploaded",
      description: `${fileList.length} files uploaded successfully`,
    });
    onAction('Upload', 'Files uploaded', { count: fileList.length });
  };

  const getFileType = (mimeType: string) => {
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('image/')) return 'image';
    return 'document';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio': return <FileAudio className="h-5 w-5 text-blue-500" />;
      case 'video': return <FileVideo className="h-5 w-5 text-purple-500" />;
      case 'image': return <FileImage className="h-5 w-5 text-green-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(
      selectedFiles.includes(fileId)
        ? selectedFiles.filter(id => id !== fileId)
        : [...selectedFiles, fileId]
    );
  };

  const selectAllFiles = () => {
    setSelectedFiles(selectedFiles.length === files.length ? [] : files.map(f => f.id));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload Evidence Files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              <Button variant="outline" onClick={() => onAction('Upload', 'Bulk upload')}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
            <input
              id="file-input"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
            />
            
            {uploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Management Tools */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>File Management</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Folder', 'Create folder')}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('Tag', 'Bulk tag')}>
                <Tag className="h-4 w-4 mr-2" />
                Tag Files
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Operations Bar */}
          {selectedFiles.length > 0 && (
            <div className="bg-primary/10 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {selectedFiles.length} files selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onAction('Download', 'Bulk download')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onAction('Share', 'Bulk share')}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onAction('Delete', 'Bulk delete')}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-3 grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-1">
                <Checkbox
                  checked={selectedFiles.length === files.length && files.length > 0}
                  onCheckedChange={selectAllFiles}
                />
              </div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            <div className="divide-y">
              {files.map((file) => (
                <div key={file.id} className="p-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/50">
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => toggleFileSelection(file.id)}
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div className="min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">Case: {file.caseId}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline">{file.type}</Badge>
                  </div>
                  <div className="col-span-2 text-sm">
                    {formatFileSize(file.size)}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    <span className="text-sm capitalize">{file.status}</span>
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onAction('View', 'File details', file)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('Download', 'Single download', file)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('Edit', 'Edit metadata', file)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('Share', 'Share file', file)}>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => onAction('Delete', 'Delete file', file)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
            
            {files.length === 0 && (
              <div className="p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No files uploaded yet</p>
                <p className="text-sm text-muted-foreground">Upload evidence files to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadManager;