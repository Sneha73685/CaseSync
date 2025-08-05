import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Shield,
  Eye,
  EyeOff,
  Square,
  Circle,
  Paintbrush,
  Type,
  Volume2,
  VolumeX,
  Scan,
  Users,
  Car,
  CreditCard,
  Wand2,
  Download,
  Undo
} from 'lucide-react';

interface RedactionToolsProps {
  selectedFiles: string[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const RedactionTools = ({ selectedFiles, onAction }: RedactionToolsProps) => {
  const [activeRedactionTool, setActiveRedactionTool] = useState('rectangle');
  const [blurIntensity, setBlurIntensity] = useState([50]);
  const [pixelationLevel, setPixelationLevel] = useState([8]);
  const [redactionOpacity, setRedactionOpacity] = useState([100]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const redactionTypes = [
    { id: 'faces', label: 'Faces', icon: Users, color: 'bg-red-500' },
    { id: 'plates', label: 'License Plates', icon: Car, color: 'bg-blue-500' },
    { id: 'documents', label: 'Documents', icon: CreditCard, color: 'bg-green-500' },
    { id: 'text', label: 'Text/Numbers', icon: Type, color: 'bg-purple-500' },
    { id: 'custom', label: 'Custom Areas', icon: Square, color: 'bg-orange-500' }
  ];

  const handleRedactionTool = (tool: string) => {
    setActiveRedactionTool(tool);
    onAction('Redaction', `Activate ${tool} tool`);
  };

  const handleAutoDetection = (type: string) => {
    onAction('Auto Detection', type, { 
      files: selectedFiles,
      settings: { blurIntensity: blurIntensity[0] }
    });
  };

  const handleApplyRedaction = () => {
    onAction('Redaction', 'Apply redactions', {
      files: selectedFiles,
      settings: {
        tool: activeRedactionTool,
        blurIntensity: blurIntensity[0],
        pixelation: pixelationLevel[0],
        opacity: redactionOpacity[0]
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Redaction Preview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Redaction Preview
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Redaction', 'Undo')}>
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </Button>
              <Button size="sm" onClick={handleApplyRedaction} disabled={selectedFiles.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Apply & Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative">
            <span className="text-muted-foreground">Media preview with redactions</span>
            
            {/* Sample redaction overlays */}
            <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-red-500/80 rounded flex items-center justify-center">
              <span className="text-xs text-white">FACE</span>
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-20 h-8 bg-blue-500/80 rounded flex items-center justify-center">
              <span className="text-xs text-white">PLATE</span>
            </div>
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex justify-between items-center">
              <div>
                <Badge variant="outline" className="mr-2">
                  {selectedFiles.length} files selected
                </Badge>
                <span className="text-sm">Ready for redaction</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Redaction Tools */}
      <Tabs defaultValue="manual">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual Tools</TabsTrigger>
          <TabsTrigger value="auto">Auto Detection</TabsTrigger>
          <TabsTrigger value="audio">Audio Redaction</TabsTrigger>
        </TabsList>

        {/* Manual Redaction Tools */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Manual Redaction Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drawing Tools */}
              <div className="space-y-4">
                <h4 className="font-medium">Drawing Tools</h4>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={activeRedactionTool === 'rectangle' ? 'default' : 'outline'}
                    onClick={() => handleRedactionTool('rectangle')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Square className="h-5 w-5" />
                    <span className="text-xs">Rectangle</span>
                  </Button>
                  <Button
                    variant={activeRedactionTool === 'circle' ? 'default' : 'outline'}
                    onClick={() => handleRedactionTool('circle')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Circle className="h-5 w-5" />
                    <span className="text-xs">Circle</span>
                  </Button>
                  <Button
                    variant={activeRedactionTool === 'brush' ? 'default' : 'outline'}
                    onClick={() => handleRedactionTool('brush')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Paintbrush className="h-5 w-5" />
                    <span className="text-xs">Brush</span>
                  </Button>
                  <Button
                    variant={activeRedactionTool === 'text' ? 'default' : 'outline'}
                    onClick={() => handleRedactionTool('text')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Type className="h-5 w-5" />
                    <span className="text-xs">Text Select</span>
                  </Button>
                </div>
              </div>

              {/* Redaction Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Redaction Settings</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Blur Intensity: {blurIntensity[0]}%</label>
                    <Slider 
                      value={blurIntensity} 
                      onValueChange={setBlurIntensity}
                      max={100} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pixelation: {pixelationLevel[0]}px</label>
                    <Slider 
                      value={pixelationLevel} 
                      onValueChange={setPixelationLevel}
                      min={4}
                      max={32} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Redaction Style</label>
                  <Select defaultValue="blur">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blur">Blur</SelectItem>
                      <SelectItem value="pixelate">Pixelate</SelectItem>
                      <SelectItem value="black">Black Box</SelectItem>
                      <SelectItem value="white">White Box</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => onAction('Redaction', 'Clear all')}>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                  <Button variant="outline" onClick={() => onAction('Redaction', 'Invert selection')}>
                    <Eye className="h-4 w-4 mr-2" />
                    Invert Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto Detection */}
        <TabsContent value="auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Automatic Detection & Redaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  AI-powered detection automatically identifies and redacts sensitive information
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {redactionTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className="h-20 flex flex-col gap-2 relative"
                      onClick={() => handleAutoDetection(type.label)}
                    >
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${type.color}`}></div>
                      <type.icon className="h-6 w-6" />
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">Auto-detect</span>
                    </Button>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium mb-2">Detection Settings</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confidence Threshold</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Slider defaultValue={[85]} max={100} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minimum Size</span>
                      <span className="text-sm font-medium">50px</span>
                    </div>
                    <Slider defaultValue={[50]} max={200} />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => onAction('Auto Detection', 'Scan all types')}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Scan All Types
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audio Redaction */}
        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <VolumeX className="h-5 w-5" />
                Audio Redaction Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Timeline */}
              <div className="space-y-4">
                <h4 className="font-medium">Audio Timeline</h4>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded mb-4 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Audio Waveform with Redaction Markers</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>00:00</span>
                    <span>01:30</span>
                    <span>03:00</span>
                  </div>
                </div>
              </div>

              {/* Audio Redaction Tools */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  onClick={() => onAction('Audio Redaction', 'Mute segment')}
                  className="h-16 flex flex-col gap-2"
                >
                  <VolumeX className="h-5 w-5" />
                  <span>Mute Segment</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => onAction('Audio Redaction', 'Beep overlay')}
                  className="h-16 flex flex-col gap-2"
                >
                  <Volume2 className="h-5 w-5" />
                  <span>Beep Overlay</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => onAction('Audio Redaction', 'White noise')}
                  className="h-16 flex flex-col gap-2"
                >
                  <Scan className="h-5 w-5" />
                  <span>White Noise</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => onAction('Audio Redaction', 'Voice modulation')}
                  className="h-16 flex flex-col gap-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Voice Modulation</span>
                </Button>
              </div>

              {/* Audio Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Redaction Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Replacement Volume</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Redaction Type</label>
                    <Select defaultValue="silence">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="silence">Silence</SelectItem>
                        <SelectItem value="beep">Beep Tone</SelectItem>
                        <SelectItem value="noise">White Noise</SelectItem>
                        <SelectItem value="reverse">Reverse Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => onAction('Audio Redaction', 'Apply audio redactions')}
              >
                Apply Audio Redactions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedactionTools;