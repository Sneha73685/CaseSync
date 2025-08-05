import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart3, TrendingUp, Users, FileText, Clock, MapPin, Eye } from 'lucide-react';

const Analytics = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor case processing metrics and evidence handling statistics
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evidence Files</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,392</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-15%</span> average improvement
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">8</span> online now
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Case Processing Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Case trend visualization</p>
                  <p className="text-sm text-muted-foreground">Interactive chart will display here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Evidence Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Audio Files</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video Files</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documents</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/3 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">33%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Images</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-4/5 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Case Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Badge variant="outline" className="mb-2">North Zone</Badge>
                <div className="text-2xl font-bold">342</div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge variant="outline" className="mb-2">Central Zone</Badge>
                <div className="text-2xl font-bold">456</div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge variant="outline" className="mb-2">South Zone</Badge>
                <div className="text-2xl font-bold">289</div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button>
            Generate Report
          </Button>
          <Button variant="outline">
            Export Data
          </Button>
          <Button variant="outline">
            Schedule Analysis
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;