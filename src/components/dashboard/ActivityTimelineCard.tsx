
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Mic, 
  FileUp, 
  FileCheck, 
  ClipboardEdit, 
  User 
} from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'FIR Generated',
    description: 'Case #CS-2023-0457 FIR draft completed',
    time: '2 hours ago',
    icon: <FileText className="h-4 w-4" />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    title: 'Audio Recorded',
    description: 'New statement recorded for case #CS-2023-0458',
    time: '4 hours ago',
    icon: <Mic className="h-4 w-4" />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    title: 'Media Uploaded',
    description: 'Video evidence added to case #CS-2023-0455',
    time: 'Yesterday',
    icon: <FileUp className="h-4 w-4" />,
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 4,
    title: 'Transcript Edited',
    description: 'Witness statement transcript updated',
    time: 'Yesterday',
    icon: <ClipboardEdit className="h-4 w-4" />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    id: 5,
    title: 'Case Assigned',
    description: 'New case #CS-2023-0458 assigned to you',
    time: '2 days ago',
    icon: <User className="h-4 w-4" />,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400'
  },
];

const ActivityTimelineCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.iconBg} ${activity.iconColor}`}>
              {activity.icon}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityTimelineCard;
