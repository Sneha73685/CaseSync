
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChevronRight, 
  FileText, 
  FileCheck,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseData {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'Processing' | 'Completed' | 'In Review' | 'New';
  type: string;
}

const recentCases: CaseData[] = [
  {
    id: 'CS-2023-0458',
    title: 'Theft at Shivaji Market',
    date: '2023-12-15',
    location: 'Central District',
    status: 'New',
    type: 'Property Crime'
  },
  {
    id: 'CS-2023-0457',
    title: 'Assault complaint by Mr. Kumar',
    date: '2023-12-14',
    location: 'East Zone',
    status: 'Completed',
    type: 'Violent Crime'
  },
  {
    id: 'CS-2023-0456',
    title: 'Traffic accident on MG Road',
    date: '2023-12-12',
    location: 'South District',
    status: 'In Review',
    type: 'Traffic Violation'
  },
  {
    id: 'CS-2023-0455',
    title: 'Missing person report - Anita Shah',
    date: '2023-12-10',
    location: 'North Zone',
    status: 'Processing',
    type: 'Missing Person'
  },
  {
    id: 'CS-2023-0454',
    title: 'Vandalism at City Park',
    date: '2023-12-08',
    location: 'West District',
    status: 'Completed',
    type: 'Property Crime'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
    case 'Processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
    case 'In Review':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400';
    case 'New':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <FileCheck className="h-4 w-4 mr-1" />;
    case 'Processing':
    case 'In Review':
      return <Clock className="h-4 w-4 mr-1" />;
    case 'New':
    default:
      return <FileText className="h-4 w-4 mr-1" />;
  }
};

const RecentCases = () => {
  return (
    <Card className="col-span-1 xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Cases</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>{caseItem.date}</TableCell>
                  <TableCell>{caseItem.location}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(caseItem.status)} flex w-fit items-center`}>
                      {getStatusIcon(caseItem.status)}
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{caseItem.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCases;
