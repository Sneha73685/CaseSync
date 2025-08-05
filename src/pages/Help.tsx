import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen, 
  Video, 
  Download,
  Search,
  Users,
  Shield
} from 'lucide-react';

const Help = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactSubmit = () => {
    toast({
      title: "Support Request Sent",
      description: "Our team will contact you within 24 hours",
    });
  };

  const faqs = [
    {
      question: "How do I upload evidence files to CaseSync?",
      answer: "Navigate to File Management > Upload Evidence. You can drag and drop files or click 'Choose Files'. Supported formats include audio, video, images, and documents."
    },
    {
      question: "What languages are supported for transcription?",
      answer: "CaseSync supports 22 Indian languages through Bhashini API integration including Hindi, English, Tamil, Telugu, Bengali, Marathi, and more."
    },
    {
      question: "How do I redact sensitive information?",
      answer: "Go to the Redaction Tools tab. Select the file and use AI-powered or manual redaction tools to blur faces, mask license plates, or mute audio segments."
    },
    {
      question: "Can I collaborate with other officers on cases?",
      answer: "Yes, use the Collaboration Tools to add comments, share files securely, and track edit history with role-based access controls."
    },
    {
      question: "How do I generate court-ready reports?",
      answer: "Use the Report Generator to create PDF/Word reports with side-by-side comparisons, summaries, and proper evidence documentation for court submission."
    }
  ];

  const tutorials = [
    { title: "Getting Started with CaseSync", duration: "5 min", type: "Video" },
    { title: "Evidence Upload & Management", duration: "8 min", type: "Video" },
    { title: "Audio Transcription Guide", duration: "6 min", type: "Video" },
    { title: "Redaction Tools Tutorial", duration: "10 min", type: "Video" },
    { title: "Report Generation Walkthrough", duration: "7 min", type: "Video" }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
          <p className="text-muted-foreground">
            Get assistance with CaseSync features and troubleshooting
          </p>
        </div>
        
        {/* Search Help */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help articles, FAQs, tutorials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Help Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{tutorial.title}</p>
                          <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{tutorial.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">User Manual</p>
                      <p className="text-sm text-muted-foreground">Complete CaseSync guide</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">API Documentation</p>
                      <p className="text-sm text-muted-foreground">Integration guide</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">Security Guidelines</p>
                      <p className="text-sm text-muted-foreground">Best practices</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">Troubleshooting</p>
                      <p className="text-sm text-muted-foreground">Common issues</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Emergency Support</p>
                      <p className="text-sm text-muted-foreground">24/7 Helpline</p>
                      <p className="text-sm font-mono">1800-XXX-XXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">Technical assistance</p>
                      <p className="text-sm font-mono">support@casesync.gov.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Training Support</p>
                      <p className="text-sm text-muted-foreground">User training</p>
                      <p className="text-sm font-mono">training@casesync.gov.in</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Technical Issue</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Training Request</option>
                    <option>Account Access</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of the issue" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Provide detailed information about your issue..."
                    rows={4}
                  />
                </div>
                
                <Button onClick={handleContactSubmit} className="w-full">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CaseSync Platform</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Transcription Service</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">File Storage</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-yellow-600">Maintenance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Help;