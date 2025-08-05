import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Calendar,
  Camera,
  Smartphone,
  Info,
  Edit,
  Save,
  Download,
  Globe,
  Clock,
  FileText,
  Hash,
  Gauge
} from 'lucide-react';

interface MetadataViewerProps {
  selectedFiles: string[];
  files: any[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const MetadataViewer = ({ selectedFiles, files, onAction }: MetadataViewerProps) => {
  const [editMode, setEditMode] = useState(false);
  const [metadata, setMetadata] = useState({
    technical: {
      fileName: 'Evidence_Recording_001.mp3',
      fileSize: '4.2 MB',
      format: 'MP3',
      duration: '03:42',
      bitrate: '128 kbps',
      sampleRate: '44.1 kHz',
      channels: 'Stereo',
      codec: 'MPEG Audio Layer 3'
    },
    capture: {
      device: 'iPhone 13 Pro',
      software: 'Voice Memos v2.0',
      timestamp: '2024-01-15T21:35:42Z',
      timezone: 'Asia/Kolkata (UTC+5:30)',
      location: {
        coordinates: '18.5204° N, 73.8567° E',
        address: 'Shivaji Nagar, Pune, Maharashtra',
        accuracy: '±5 meters'
      }
    },
    legal: {
      caseId: 'CS-2024-001',
      evidenceId: 'EV-001-2024',
      officer: 'Officer Patel (Badge: 28761)',
      chainOfCustody: 'Verified',
      integrity: 'MD5: a1b2c3d4e5f6...',
      classification: 'Restricted'
    },
    custom: {
      priority: 'High',
      category: 'Audio Evidence',
      tags: ['witness', 'statement', 'jewelry-theft'],
      notes: 'Key witness statement regarding the jewelry store incident.'
    }
  });

  const networkAnalysis = {
    relatedCases: [
      { id: 'CS-2024-002', title: 'Similar theft incident', similarity: 85 },
      { id: 'CS-2023-456', title: 'Same location crime', similarity: 72 },
      { id: 'CS-2024-003', title: 'Witness overlap', similarity: 68 }
    ],
    connections: [
      { type: 'Person', value: 'Rajesh Kumar', cases: 3 },
      { type: 'Location', value: 'Shivaji Nagar', cases: 5 },
      { type: 'Suspect', value: 'Unknown Male 1', cases: 2 }
    ],
    timeline: [
      { date: '2024-01-10', event: 'Similar incident reported', caseId: 'CS-2024-003' },
      { date: '2024-01-15', event: 'Current incident', caseId: 'CS-2024-001' },
      { date: '2024-01-18', event: 'Follow-up investigation', caseId: 'CS-2024-002' }
    ]
  };

  const handleSaveMetadata = () => {
    setEditMode(false);
    onAction('Metadata', 'Save changes', metadata);
  };

  const handleEditField = (section: string, field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Metadata Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Evidence Metadata & EXIF Data
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setEditMode(!editMode)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
              {editMode && (
                <Button size="sm" onClick={handleSaveMetadata}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
              <Button size="sm" onClick={() => onAction('Metadata', 'Export metadata')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedFiles.length > 0 ? (
            <div className="p-4 bg-primary/10 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Selected Files: {selectedFiles.length}</span>
                <Badge variant="outline">Viewing: {metadata.technical.fileName}</Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select files to view metadata</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metadata Tabs */}
      <Tabs defaultValue="technical">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technical">Technical Data</TabsTrigger>
          <TabsTrigger value="geolocation">Geolocation</TabsTrigger>
          <TabsTrigger value="legal">Legal & Chain</TabsTrigger>
          <TabsTrigger value="network">Network Analysis</TabsTrigger>
        </TabsList>

        {/* Technical Metadata */}
        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">File Information</h4>
                  <div className="space-y-3">
                    {Object.entries(metadata.technical).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 border rounded">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {editMode ? (
                          <Input 
                            value={value} 
                            onChange={(e) => handleEditField('technical', key, e.target.value)}
                            className="w-40"
                          />
                        ) : (
                          <span className="text-muted-foreground">{value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Quality Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Audio Quality</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Signal/Noise Ratio</span>
                      <span className="text-muted-foreground">42 dB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Peak Amplitude</span>
                      <span className="text-muted-foreground">-3.2 dBFS</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Dynamic Range</span>
                      <span className="text-muted-foreground">38 dB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" onClick={() => onAction('Metadata', 'Analyze technical')}>
                  <Gauge className="h-4 w-4 mr-2" />
                  Quality Analysis
                </Button>
                <Button variant="outline" onClick={() => onAction('Metadata', 'Compare files')}>
                  <Hash className="h-4 w-4 mr-2" />
                  File Comparison
                </Button>
                <Button variant="outline" onClick={() => onAction('Metadata', 'Integrity check')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Integrity Check
                </Button>
                <Button variant="outline" onClick={() => onAction('Metadata', 'Format conversion')}>
                  <Download className="h-4 w-4 mr-2" />
                  Format Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geolocation Data */}
        <TabsContent value="geolocation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geolocation & Mapping Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Location Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Location Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Coordinates</span>
                      <span className="text-muted-foreground">{metadata.capture.location.coordinates}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Address</span>
                      <span className="text-muted-foreground">{metadata.capture.location.address}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Accuracy</span>
                      <Badge className="bg-green-100 text-green-800">{metadata.capture.location.accuracy}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">Timezone</span>
                      <span className="text-muted-foreground">{metadata.capture.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* Map Visualization */}
                <div className="space-y-4">
                  <h4 className="font-medium">Location Map</h4>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Incident Location</p>
                      <p className="text-xs text-muted-foreground">Shivaji Nagar, Pune</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Nearby Incidents</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Similar theft (CS-2023-456)</p>
                      <p className="text-sm text-muted-foreground">0.2 km away • 3 weeks ago</p>
                    </div>
                    <Badge variant="outline">Related</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Traffic incident (CS-2024-002)</p>
                      <p className="text-sm text-muted-foreground">0.5 km away • 1 week ago</p>
                    </div>
                    <Badge variant="outline">Nearby</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => onAction('Geolocation', 'Show on map')}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Show on Map
                </Button>
                <Button variant="outline" onClick={() => onAction('Geolocation', 'Find nearby')}>
                  <Globe className="h-4 w-4 mr-2" />
                  Find Nearby Cases
                </Button>
                <Button variant="outline" onClick={() => onAction('Geolocation', 'Export KML')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export KML
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal & Chain of Custody */}
        <TabsContent value="legal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Legal Metadata & Chain of Custody
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Legal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium">Legal Classification</h4>
                  <div className="space-y-3">
                    {Object.entries(metadata.legal).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 border rounded">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {editMode && key !== 'integrity' ? (
                          <Input 
                            value={value} 
                            onChange={(e) => handleEditField('legal', key, e.target.value)}
                            className="w-48"
                          />
                        ) : (
                          <span className="text-muted-foreground font-mono text-sm">{value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium">Custom Metadata</h4>
                  <div className="space-y-3">
                    {Object.entries(metadata.custom).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        {key === 'notes' ? (
                          <Textarea
                            value={value as string}
                            onChange={(e) => handleEditField('custom', key, e.target.value)}
                            readOnly={!editMode}
                            rows={3}
                          />
                        ) : key === 'tags' ? (
                          <div className="flex flex-wrap gap-2">
                            {(value as string[]).map((tag, index) => (
                              <Badge key={index} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        ) : (
                          <Input
                            value={value as string}
                            onChange={(e) => handleEditField('custom', key, e.target.value)}
                            readOnly={!editMode}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Chain of Custody Log</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 border rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Evidence Collected</p>
                      <p className="text-sm text-muted-foreground">
                        Officer Patel • Jan 15, 2024 at 21:45 • Initial collection from scene
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Evidence Logged</p>
                      <p className="text-sm text-muted-foreground">
                        Evidence Clerk • Jan 16, 2024 at 09:15 • Secured in digital vault
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Analysis Started</p>
                      <p className="text-sm text-muted-foreground">
                        Detective Kumar • Jan 18, 2024 at 14:30 • Transcription and analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Analysis */}
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Network Analysis & Case Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Related Cases */}
                <div className="space-y-4">
                  <h4 className="font-medium">Related Cases</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {networkAnalysis.relatedCases.map((relatedCase) => (
                      <div key={relatedCase.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{relatedCase.id}</h5>
                          <Badge className="bg-blue-100 text-blue-800">
                            {relatedCase.similarity}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{relatedCase.title}</p>
                        <Button size="sm" variant="outline" className="mt-2 w-full">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entity Connections */}
                <div className="space-y-4">
                  <h4 className="font-medium">Entity Connections</h4>
                  <div className="space-y-2">
                    {networkAnalysis.connections.map((connection, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <span className="font-medium">{connection.value}</span>
                          <Badge variant="outline" className="ml-2">{connection.type}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Connected to {connection.cases} cases
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Analysis */}
                <div className="space-y-4">
                  <h4 className="font-medium">Timeline Analysis</h4>
                  <div className="space-y-2">
                    {networkAnalysis.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{event.event}</p>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                            <Badge variant="outline">{event.caseId}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onAction('Network', 'Generate graph')}>
                    <Globe className="h-4 w-4 mr-2" />
                    Network Graph
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Network', 'Timeline view')}>
                    <Clock className="h-4 w-4 mr-2" />
                    Timeline View
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Network', 'Export analysis')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Analysis
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

export default MetadataViewer;