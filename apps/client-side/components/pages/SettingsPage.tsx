import React from 'react';
import { Globe, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {Badge} from "@/components/ui/badge";

interface SettingsPageProps {
  setCurrentPage: (page: string) => void;
}

export function SettingsPage({ setCurrentPage }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setCurrentPage('dashboard')}
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Avatar */}
                <div>
                  <label className="block text-sm font-medium mb-4">Profile Picture</label>
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input defaultValue="Sarah" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input defaultValue="Johnson" />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Textarea
                    defaultValue="Senior Software Engineer and Tech Writer. Passionate about web technologies and developer experience."
                    className="min-h-24"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Brief description for your profile. Max 200 characters.
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium mb-4">Social Links</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="https://yourwebsite.com" />
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                      <Input placeholder="https://twitter.com/username" />
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <Input placeholder="https://github.com/username" />
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <Input placeholder="https://linkedin.com/in/username" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <div className="flex gap-3">
                      <Input type="email" defaultValue="sarah.johnson@example.com" className="flex-1" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <div className="flex gap-3">
                      <Input defaultValue="@sarahjohnson" className="flex-1" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <Input type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </Card>

              <Card className="p-6 border-destructive/50">
                <h3 className="font-semibold mb-2 text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Comments</p>
                        <p className="text-sm text-muted-foreground">Get notified when someone comments on your post</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Likes</p>
                        <p className="text-sm text-muted-foreground">Get notified when someone likes your post</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Followers</p>
                        <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary of your activity</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button>Enable 2FA</Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Active Sessions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage and log out your active sessions on other browsers and devices.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Chrome on macOS</p>
                        <p className="text-sm text-muted-foreground">San Francisco, US • Current session</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">San Francisco, US • 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Login Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last login</span>
                    <span>Today at 10:30 AM from San Francisco, US</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Previous login</span>
                    <span>Yesterday at 3:15 PM from San Francisco, US</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
