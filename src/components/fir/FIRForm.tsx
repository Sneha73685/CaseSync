
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertTriangle,
  FileText,
  Mic,
  Calendar,
  MapPin,
  BookOpen,
  Clock,
  Users,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FIRForm = () => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [generatedFIR, setGeneratedFIR] = useState('');
  
  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setGenerating(false);
      setGeneratedFIR(sampleFIR);
      toast({
        title: "FIR Generated",
        description: "First Information Report draft has been generated successfully.",
      });
    }, 2000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>FIR Details</CardTitle>
          <CardDescription>Enter case information or use transcription data to generate an FIR</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case-number">Case Number</Label>
            <Input id="case-number" placeholder="e.g. CS-2023-0458" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="incident-type">Incident Type</Label>
            <Select defaultValue="theft">
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="burglary">Burglary</SelectItem>
                <SelectItem value="robbery">Robbery</SelectItem>
                <SelectItem value="fraud">Fraud</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="traffic">Traffic Violation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date of Incident</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time of Incident</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Address where incident occurred" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="complainant">Complainant Name</Label>
            <Input id="complainant" placeholder="Full name of complainant" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sections">Applicable Sections</Label>
            <Input id="sections" placeholder="e.g. 379, 356 IPC" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Incident Description</Label>
            <Textarea 
              id="description" 
              placeholder="Detailed description of the incident"
              className="min-h-[150px]"
              defaultValue="On December 15th, 2023 at approximately 9:30 PM, two unidentified male suspects entered a jewelry store in Shivaji Nagar. As per witness testimony, the suspects were wearing dark clothes with their faces covered. After approximately 5 minutes, they were seen exiting the premises carrying bags, before escaping on a dark-colored motorcycle."
            />
          </div>
          
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-900/50">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <span className="text-xs text-yellow-800 dark:text-yellow-400">
              You can use the Record button to dictate the description
            </span>
            <Button variant="outline" size="icon" className="h-6 w-6 ml-auto">
              <Mic className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            {generating ? (
              <>Generating FIR Draft...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate FIR Draft
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Generated FIR</CardTitle>
          <CardDescription>Preview the generated First Information Report</CardDescription>
        </CardHeader>
        <CardContent>
          {generatedFIR ? (
            <div className="border rounded p-6 space-y-4 min-h-[600px] bg-card font-serif text-sm">
              <div className="text-center space-y-2 pb-4 border-b">
                <h2 className="font-bold text-lg uppercase">First Information Report</h2>
                <p>Under Section 154 Cr.P.C.</p>
                <p className="text-xs text-muted-foreground">FIR No. CS-2023-0458 | Date: 16/12/2023</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div className="flex items-start gap-2 col-span-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold">Date and Time of Occurrence:</p>
                      <p>December 15th, 2023 at approximately 21:30 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 col-span-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold">Place of Occurrence:</p>
                      <p>Jewelry store located at Shivaji Nagar, under the jurisdiction of Shivaji Nagar Police Station, Central District</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 col-span-2">
                    <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold">Offences and Sections:</p>
                      <p>Section 379 (Theft), Section 356 (Assault or criminal force in attempt to commit theft)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold">Information received at PS:</p>
                      <p>December 15th, 2023 at 22:10 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold">Complainant/Informant:</p>
                      <p>Mr. Sanjay Mehta, Shop owner</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h3 className="font-semibold text-sm">Brief Facts of the Case:</h3>
                  <p className="text-justify text-xs">
                    On December 15th, 2023 at approximately 21:30 hours, two unidentified male suspects entered 'Mehta Jewelers' located in Shivaji Nagar. As per witness testimony from Mr. Rajesh Kumar (owner of neighboring shop), the suspects were wearing dark clothes with their faces covered. After approximately 5 minutes inside the establishment, loud shouting was heard after which the suspects were seen exiting the premises carrying bags, before escaping on a dark-colored motorcycle, possibly black or dark blue with a visible dent on the side. The complainant, Mr. Sanjay Mehta, owner of the jewelry store, reported that gold and diamond jewelry worth approximately Rs. 15 lakhs was stolen during this incident. No injuries were reported. CCTV footage from the surrounding area is being collected. Investigation is ongoing.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-8 text-xs">
                <div>
                  <p className="font-semibold">Recorded By:</p>
                  <p>Officer Patel, ID: 28761</p>
                  <p>Shivaji Nagar Police Station</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Signature of Officer</p>
                  <div className="h-10"></div>
                  <p>Station House Officer</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed rounded-md h-[600px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>FIR draft will appear here after generation</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Edit Draft</Button>
          <Button disabled={!generatedFIR}>Approve & Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FIRForm;

// Sample FIR for demonstration
const sampleFIR = "Generated FIR content would appear here";
