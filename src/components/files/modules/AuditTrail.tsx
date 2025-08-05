import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Download, Eye, Clock, User } from 'lucide-react';

interface AuditTrailProps {
  files: any[];
  onAction: (tool: string, action: string, data?: any) => void;
}

const AuditTrail = ({ files, onAction }: AuditTrailProps) => {
  const auditLogs = [
    { id: 1, action: 'File uploaded', user: 'Officer Patel', timestamp: '2024-01-15 21:45', file: 'Evidence_001.mp3' },
    { id: 2, action: 'Transcription completed', user: 'System', timestamp: '2024-01-16 09:15', file: 'Evidence_001.mp3' },
    { id: 3, action: 'File downloaded', user: 'Detective Kumar', timestamp: '2024-01-16 14:30', file: 'Evidence_001.mp3' },
    { id: 4, action: 'Annotation added', user: 'Analyst Singh', timestamp: '2024-01-17 10:20', file: 'Crime_Scene.mp4' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Audit Trail & Activity Log
            </CardTitle>
            <Button size="sm" onClick={() => onAction('Audit', 'Export log')}>
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 border rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.file}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{log.user}</Badge>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrail;