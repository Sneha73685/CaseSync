import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Link,
  Archive,
  Flag
} from 'lucide-react';

interface CaseManagementProps {
  files: any[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const CaseManagement = ({ files, onAction }: CaseManagementProps) => {
  const [selectedCase, setSelectedCase] = useState('CS-2024-001');
  const [caseFilter, setCaseFilter] = useState('all');

  const cases = [
    {
      id: 'CS-2024-001',
      title: 'Jewelry Store Theft Investigation',
      status: 'active',
      priority: 'high',
      officer: 'Officer Patel',
      dateCreated: '2024-01-15',
      lastUpdated: '2024-01-20',
      filesCount: 12,
      progress: 75,
      location: 'Shivaji Nagar',
      type: 'Theft'
    },
    {
      id: 'CS-2024-002',
      title: 'Traffic Accident Analysis',
      status: 'review',
      priority: 'medium',
      officer: 'Officer Kumar',
      dateCreated: '2024-01-18',
      lastUpdated: '2024-01-19',
      filesCount: 8,
      progress: 90,
      location: 'MG Road',
      type: 'Accident'
    },
    {
      id: 'CS-2024-003',
      title: 'Fraud Investigation',
      status: 'closed',
      priority: 'low',
      officer: 'Officer Singh',
      dateCreated: '2024-01-10',
      lastUpdated: '2024-01-17',
      filesCount: 15,
      progress: 100,
      location: 'Koregaon Park',
      type: 'Fraud'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'review': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'closed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      case 'review': return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'closed': return <Badge className="bg-green-100 text-green-800">Closed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High Priority</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const selectedCaseData = cases.find(c => c.id === selectedCase);

  return (
    <div className="space-y-6">
      {/* Case Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Management Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Case', 'Link files')}>
                <Link className="h-4 w-4 mr-2" />
                Link Files
              </Button>
              <Button size="sm" onClick={() => onAction('Case', 'Create new case')}>
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Case Statistics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Case Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-muted-foreground">Total Cases</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">1</div>
                        <div className="text-sm text-muted-foreground">In Review</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">1</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">35</div>
                        <div className="text-sm text-muted-foreground">Total Files</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Case', 'Create case')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Case
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Case', 'Link evidence')}>
                      <Link className="h-4 w-4 mr-2" />
                      Link Evidence
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Case', 'Generate report')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Case', 'Archive case')}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive Case
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="mt-6">
              <div className="space-y-6">
                {/* Workflow Stages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Case Workflow Stages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg bg-blue-50">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Draft</h4>
                        <p className="text-sm text-muted-foreground">Initial evidence collection</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-yellow-50">
                        <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <AlertCircle className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Review</h4>
                        <p className="text-sm text-muted-foreground">Evidence review & analysis</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-green-50">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Approved</h4>
                        <p className="text-sm text-muted-foreground">Ready for legal proceedings</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg bg-gray-50">
                        <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <Archive className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Closed</h4>
                        <p className="text-sm text-muted-foreground">Case completed & archived</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Case Progress */}
                {selectedCaseData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Case Progress: {selectedCaseData.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">{selectedCaseData.progress}%</span>
                          </div>
                          <Progress value={selectedCaseData.progress} className="w-full" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium">Current Status:</span>
                            <div className="mt-1">{getStatusBadge(selectedCaseData.status)}</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Priority Level:</span>
                            <div className="mt-1">{getPriorityBadge(selectedCaseData.priority)}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Case Created</p>
                        <p className="text-sm text-muted-foreground">January 15, 2024 - Initial case file opened</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Evidence Uploaded</p>
                        <p className="text-sm text-muted-foreground">January 16, 2024 - Audio and video evidence added</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Transcription Completed</p>
                        <p className="text-sm text-muted-foreground">January 18, 2024 - All audio transcribed and reviewed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Analysis Complete</p>
                        <p className="text-sm text-muted-foreground">January 20, 2024 - AI analysis and enhancement finished</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Report', 'Case summary')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Case Summary Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Report', 'Evidence chain')}>
                      <Link className="h-4 w-4 mr-2" />
                      Chain of Custody Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Report', 'Timeline report')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Timeline Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onAction('Report', 'Court ready')}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Court-Ready Package
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Report Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Investigation Report</SelectItem>
                        <SelectItem value="evidence">Evidence Analysis Report</SelectItem>
                        <SelectItem value="incident">Incident Summary Report</SelectItem>
                        <SelectItem value="court">Court Submission Package</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full" onClick={() => onAction('Report', 'Generate custom')}>
                      Generate Custom Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Cases</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search cases..." className="pl-10 w-64" />
              </div>
              <Select value={caseFilter} onValueChange={setCaseFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCase === caseItem.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedCase(caseItem.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {getStatusIcon(caseItem.status)}
                      {caseItem.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">Case ID: {caseItem.id}</p>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(caseItem.status)}
                    {getPriorityBadge(caseItem.priority)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{caseItem.officer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{caseItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{caseItem.dateCreated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{caseItem.filesCount} files</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-muted-foreground">{caseItem.progress}%</span>
                  </div>
                  <Progress value={caseItem.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseManagement;