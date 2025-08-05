import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  MessageSquare,
  Share,
  UserPlus,
  Bell,
  Clock,
  Eye,
  Edit,
  Lock,
  Unlock,
  Send,
  Link,
  Download
} from 'lucide-react';

interface CollaborationToolsProps {
  selectedFiles: string[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const CollaborationTools = ({ selectedFiles, onAction }: CollaborationToolsProps) => {
  const [newComment, setNewComment] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  const teamMembers = [
    { id: 1, name: 'Officer Patel', role: 'Lead Investigator', avatar: 'OP', status: 'online' },
    { id: 2, name: 'Detective Kumar', role: 'Detective', avatar: 'DK', status: 'online' },
    { id: 3, name: 'Analyst Singh', role: 'Evidence Analyst', avatar: 'AS', status: 'away' },
    { id: 4, name: 'Legal Smith', role: 'Legal Advisor', avatar: 'LS', status: 'offline' }
  ];

  const comments = [
    {
      id: 1,
      author: 'Officer Patel',
      avatar: 'OP',
      content: 'Audio quality is excellent. Clear identification of both speakers possible.',
      timestamp: '2 hours ago',
      fileId: 'file-1'
    },
    {
      id: 2,
      author: 'Detective Kumar',
      avatar: 'DK',
      content: 'Need to enhance the video section from 2:30-3:15 for better license plate visibility.',
      timestamp: '1 hour ago',
      fileId: 'file-2'
    },
    {
      id: 3,
      author: 'Analyst Singh',
      avatar: 'AS',
      content: 'Completed transcription review. Found key evidence at timestamp 1:45.',
      timestamp: '30 minutes ago',
      fileId: 'file-1'
    }
  ];

  const accessLogs = [
    {
      id: 1,
      user: 'Officer Patel',
      action: 'Downloaded file',
      file: 'Evidence_Recording_001.mp3',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      user: 'Detective Kumar',
      action: 'Added annotation',
      file: 'Crime_Scene_Video.mp4',
      timestamp: '25 minutes ago'
    },
    {
      id: 3,
      user: 'Analyst Singh',
      action: 'Modified transcription',
      file: 'Witness_Statement.mp3',
      timestamp: '1 hour ago'
    }
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAction('Collaboration', 'Add comment', {
        content: newComment,
        files: selectedFiles
      });
      setNewComment('');
    }
  };

  const handleShareFiles = () => {
    if (shareEmail.trim()) {
      onAction('Collaboration', 'Share files', {
        email: shareEmail,
        files: selectedFiles
      });
      setShareEmail('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Collaboration
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Collaboration', 'Invite member')}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
              <Button size="sm" onClick={() => onAction('Collaboration', 'Create meeting')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Meeting
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Tabs */}
      <Tabs defaultValue="comments">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="sharing">File Sharing</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Comments */}
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments & Discussions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment about the selected files..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {selectedFiles.length > 0 ? `Commenting on ${selectedFiles.length} files` : 'Select files to comment'}
                  </div>
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                <h4 className="font-medium">Recent Comments</h4>
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        <Badge variant="outline" className="text-xs">File: {comment.fileId}</Badge>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* File Sharing */}
        <TabsContent value="sharing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5" />
                File Sharing & Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Share Files */}
              <div className="space-y-4">
                <h4 className="font-medium">Share Selected Files</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter email address..."
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Select defaultValue="view">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="comment">Can Comment</SelectItem>
                      <SelectItem value="edit">Can Edit</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleShareFiles} disabled={!shareEmail.trim() || selectedFiles.length === 0}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      Sharing {selectedFiles.length} files with specified permissions
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Share Options */}
              <div className="space-y-4">
                <h4 className="font-medium">Quick Share Options</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => onAction('Share', 'Generate link')}>
                    <Link className="h-4 w-4 mr-2" />
                    Generate Share Link
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Share', 'Email package')}>
                    <Send className="h-4 w-4 mr-2" />
                    Email Package
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Share', 'Export bundle')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Bundle
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Share', 'Court package')}>
                    <Lock className="h-4 w-4 mr-2" />
                    Court Package
                  </Button>
                </div>
              </div>

              {/* Share History */}
              <div className="space-y-4">
                <h4 className="font-medium">Recent Shares</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Evidence Package #1</p>
                      <p className="text-sm text-muted-foreground">Shared with legal@department.gov</p>
                    </div>
                    <Badge variant="outline">View Only</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Investigation Files</p>
                      <p className="text-sm text-muted-foreground">Shared with detective.kumar@pd.gov</p>
                    </div>
                    <Badge variant="outline">Can Edit</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Access Permissions & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role-based Access */}
              <div className="space-y-4">
                <h4 className="font-medium">Role-based Access Control</h4>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="edit">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="edit">Can Edit</SelectItem>
                            <SelectItem value="comment">Can Comment</SelectItem>
                            <SelectItem value="view">View Only</SelectItem>
                            <SelectItem value="none">No Access</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline">
                          {member.status === 'online' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Security Settings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Encryption</p>
                      <p className="text-sm text-muted-foreground">All files encrypted at rest and in transit</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Required for all sensitive operations</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Required</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Automatic logout after inactivity</p>
                    </div>
                    <Badge variant="outline">30 minutes</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Audit Trail & Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Activity Feed */}
              <div className="space-y-4">
                <h4 className="font-medium">Recent Activity</h4>
                <div className="space-y-3">
                  {accessLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">{log.user} {log.action}</p>
                        <p className="text-sm text-muted-foreground">{log.file}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {log.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Controls */}
              <div className="space-y-4">
                <h4 className="font-medium">Audit Controls</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => onAction('Audit', 'Download log')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Audit Log
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Audit', 'Generate report')}>
                    <Clock className="h-4 w-4 mr-2" />
                    Activity Report
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Audit', 'Set alerts')}>
                    <Bell className="h-4 w-4 mr-2" />
                    Configure Alerts
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Audit', 'Export chain')}>
                    <Link className="h-4 w-4 mr-2" />
                    Chain of Custody
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollaborationTools;