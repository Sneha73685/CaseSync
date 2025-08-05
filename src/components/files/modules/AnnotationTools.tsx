import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Eye,
  MousePointer,
  Type,
  ArrowUp,
  Circle,
  Square,
  Highlighter,
  Clock,
  MapPin,
  MessageSquare,
  Palette,
  Save,
  Download
} from 'lucide-react';

interface AnnotationToolsProps {
  selectedFiles: string[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const AnnotationTools = ({ selectedFiles, onAction }: AnnotationToolsProps) => {
  const [activeTool, setActiveTool] = useState('pointer');
  const [annotationColor, setAnnotationColor] = useState('#ff0000');
  const [strokeWidth, setStrokeWidth] = useState([3]);
  const [annotations, setAnnotations] = useState<any[]>([]);

  const tools = [
    { id: 'pointer', label: 'Select', icon: MousePointer },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'arrow', label: 'Arrow', icon: ArrowUp },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'highlight', label: 'Highlight', icon: Highlighter }
  ];

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
    '#ff00ff', '#00ffff', '#ffffff', '#000000'
  ];

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
    onAction('Annotation', `Activate ${toolId} tool`);
  };

  const handleAddAnnotation = (type: string) => {
    const newAnnotation = {
      id: Date.now(),
      type,
      timestamp: new Date().toISOString(),
      color: annotationColor,
      strokeWidth: strokeWidth[0],
      text: type === 'text' ? 'Sample annotation' : undefined
    };
    setAnnotations([...annotations, newAnnotation]);
    onAction('Annotation', `Add ${type} annotation`, newAnnotation);
  };

  return (
    <div className="space-y-6">
      {/* Annotation Canvas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Annotation Canvas
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onAction('Annotation', 'Save annotations')}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" onClick={() => onAction('Annotation', 'Export annotated')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden">
            <span className="text-muted-foreground">Media with annotations</span>
            
            {/* Sample annotations */}
            <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
              <ArrowUp className="h-6 w-6 text-red-500" />
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                Suspect vehicle
              </div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/3">
              <Circle className="h-8 w-8 text-blue-500 fill-transparent stroke-2" />
              <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs mt-1">
                Evidence location
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-yellow-500/80 px-2 py-1 rounded">
                <span className="text-xs font-bold">TIMESTAMP: 21:35:42</span>
              </div>
            </div>
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <Badge variant="outline" className="mr-2">
                {selectedFiles.length} files selected
              </Badge>
              <span className="text-sm">Ready for annotation</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Annotation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drawing Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Drawing Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tool Selection */}
            <div className="space-y-3">
              <h4 className="font-medium">Tool Selection</h4>
              <div className="grid grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={activeTool === tool.id ? 'default' : 'outline'}
                    onClick={() => handleToolSelect(tool.id)}
                    className="flex flex-col gap-1 h-16"
                  >
                    <tool.icon className="h-5 w-5" />
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-3">
              <h4 className="font-medium">Color</h4>
              <div className="grid grid-cols-8 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      annotationColor === color ? 'border-primary' : 'border-muted'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAnnotationColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Width */}
            <div className="space-y-3">
              <h4 className="font-medium">Stroke Width: {strokeWidth[0]}px</h4>
              <Slider 
                value={strokeWidth} 
                onValueChange={setStrokeWidth}
                min={1}
                max={10}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleAddAnnotation('text')}>
                <Type className="h-4 w-4 mr-2" />
                Add Text
              </Button>
              <Button variant="outline" onClick={() => handleAddAnnotation('timestamp')}>
                <Clock className="h-4 w-4 mr-2" />
                Timestamp
              </Button>
              <Button variant="outline" onClick={() => handleAddAnnotation('location')}>
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button variant="outline" onClick={() => handleAddAnnotation('comment')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Annotation List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Annotations ({annotations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add Text Annotation */}
              <div className="p-4 border rounded-lg space-y-3">
                <h5 className="font-medium">Add Text Annotation</h5>
                <Input placeholder="Annotation title..." />
                <Textarea placeholder="Detailed description..." rows={3} />
                <div className="flex gap-2">
                  <Select defaultValue="evidence">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evidence">Evidence</SelectItem>
                      <SelectItem value="suspect">Suspect</SelectItem>
                      <SelectItem value="witness">Witness</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="time">Timestamp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => handleAddAnnotation('custom-text')}>
                    Add Annotation
                  </Button>
                </div>
              </div>

              {/* Existing Annotations */}
              <div className="space-y-2">
                <h5 className="font-medium">Current Annotations</h5>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {annotations.length > 0 ? (
                    annotations.map((annotation) => (
                      <div key={annotation.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {annotation.type}
                            </Badge>
                            {annotation.text && (
                              <p className="text-sm">{annotation.text}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {new Date(annotation.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: annotation.color }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No annotations yet</p>
                      <p className="text-xs">Add annotations to mark important details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Annotation Features */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Annotation Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onAction('Smart Annotation', 'Auto-timestamp')}
            >
              <Clock className="h-6 w-6" />
              <span>Auto Timestamp</span>
              <span className="text-xs text-muted-foreground">Add time markers</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onAction('Smart Annotation', 'Object tracking')}
            >
              <Eye className="h-6 w-6" />
              <span>Object Tracking</span>
              <span className="text-xs text-muted-foreground">Track movement</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onAction('Smart Annotation', 'Scene detection')}
            >
              <Square className="h-6 w-6" />
              <span>Scene Detection</span>
              <span className="text-xs text-muted-foreground">Auto-segment</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onAction('Smart Annotation', 'Template overlay')}
            >
              <Highlighter className="h-6 w-6" />
              <span>Template Overlay</span>
              <span className="text-xs text-muted-foreground">Standard markers</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnotationTools;
