import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Download,
  Upload,
  Key,
  Monitor
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    dataRetention: '90',
    language: 'en',
    timezone: 'IST'
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and system configuration
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Officer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Patel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="officer.patel@police.gov.in" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badgeNumber">Badge Number</Label>
                  <Input id="badgeNumber" defaultValue="28761" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="cyber-crime">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cyber-crime">Cyber Crime</SelectItem>
                      <SelectItem value="narcotics">Narcotics</SelectItem>
                      <SelectItem value="traffic">Traffic</SelectItem>
                      <SelectItem value="investigation">Investigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Case Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications for case status changes</p>
                  </div>
                  <Switch checked={settings.notifications} onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: checked }))
                  } />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Evidence Processing</Label>
                    <p className="text-sm text-muted-foreground">Alerts when evidence processing completes</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Maintenance</Label>
                    <p className="text-sm text-muted-foreground">Notifications for scheduled maintenance</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={settings.language} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your work</p>
                  </div>
                  <Switch checked={settings.autoSave} onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoSave: checked }))
                  } />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Retention Period (days)</Label>
                  <Input 
                    value={settings.dataRetention} 
                    onChange={(e) => setSettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Export Data</h4>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Cases
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Evidence
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Import Data</h4>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import from File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API & Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input type="password" value="cs_sk_****************************" readOnly />
                    <Button variant="outline">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Connected Services</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Bhashini API</p>
                        <p className="text-sm text-muted-foreground">Multilingual transcription service</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Court Management System</p>
                        <p className="text-sm text-muted-foreground">Case filing integration</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;