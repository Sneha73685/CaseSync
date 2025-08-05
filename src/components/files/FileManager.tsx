
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  FileAudio,
  FileVideo,
  FileText,
  MoreVertical,
  Download,
  Trash,
  Edit,
  Share,
  FileUp,
  SlidersHorizontal,
  Clock,
  ChevronDown,
} from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  type: 'audio' | 'video' | 'document';
  size: string;
  date: string;
  status: 'Transcribed' | 'Pending' | 'In Progress' | 'Error';
  case: string;
}

const sampleFiles: MediaFile[] = [
  {
    id: '1',
    name: 'Witness_Statement_Kumar.mp3',
    type: 'audio',
    size: '4.2 MB',
    date: '2023-12-15',
    status: 'Transcribed',
    case: 'CS-2023-0458'
  },
  {
    id: '2',
    name: 'Crime_Scene_Evidence.mp4',
    type: 'video',
    size: '32.5 MB',
    date: '2023-12-14',
    status: 'Transcribed',
    case: 'CS-2023-0457'
  },
  {
    id: '3',
    name: 'Interview_Suspect_01.mp3',
    type: 'audio',
    size: '7.8 MB',
    date: '2023-12-12',
    status: 'Transcribed',
    case: 'CS-2023-0456'
  },
  {
    id: '4',
    name: 'Victim_Testimony.mp3',
    type: 'audio',
    size: '5.1 MB',
    date: '2023-12-10',
    status: 'Pending',
    case: 'CS-2023-0455'
  },
  {
    id: '5',
    name: 'Traffic_Camera_Footage.mp4',
    type: 'video',
    size: '54.2 MB',
    date: '2023-12-08',
    status: 'In Progress',
    case: 'CS-2023-0454'
  },
  {
    id: '6',
    name: 'Field_Notes_Officer_Patel.docx',
    type: 'document',
    size: '0.8 MB',
    date: '2023-12-05',
    status: 'Transcribed',
    case: 'CS-2023-0453'
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'audio':
      return <FileAudio className="h-6 w-6 text-blue-500" />;
    case 'video':
      return <FileVideo className="h-6 w-6 text-purple-500" />;
    case 'document':
      return <FileText className="h-6 w-6 text-green-500" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Transcribed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50">Transcribed</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50">Pending</Badge>;
    case 'In Progress':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50">In Progress</Badge>;
    case 'Error':
      return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900/50">Error</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const FileManager = () => {
  const [files, setFiles] = useState<MediaFile[]>(sampleFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredFiles = files.filter(file => {
    // Filter by search query
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.case.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by file type (tab)
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return file.type === activeTab && matchesSearch;
    }
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>File Manager</CardTitle>
            <CardDescription>Manage your media files and transcriptions</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <FileUp className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full grid grid-cols-3 sm:w-auto sm:grid-cols-3">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Name</div>
            <div className="col-span-2 hidden sm:block">Case</div>
            <div className="col-span-1 hidden md:block">Size</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 hidden sm:block">Date</div>
          </div>
          
          <div className="divide-y">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/50 cursor-pointer"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="col-span-2 hidden sm:block text-sm text-muted-foreground">
                    {file.case}
                  </div>
                  <div className="col-span-1 hidden md:block text-sm text-muted-foreground">
                    {file.size}
                  </div>
                  <div className="col-span-2">
                    {getStatusBadge(file.status)}
                  </div>
                  <div className="col-span-2 hidden sm:flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{file.date}</span>
                  </div>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No files match your search</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-muted-foreground">
            Showing {filteredFiles.length} of {files.length} files
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
            <Button variant="ghost" size="sm" className="ml-2">
              <span>10 per page</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileManager;
