
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Settings as SettingsIcon, Bell, Lock, Save, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileForm, setProfileForm] = useState({
    fullName: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@university.edu",
    bio: "Computer Science student interested in AI and machine learning. Looking for study partners for advanced algorithms."
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    mentions: true,
    events: false,
    studyRequests: true,
    resourceUpdates: false,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (setting: string) => {
    setNotificationSettings((prev) => ({ 
      ...prev, 
      [setting]: !prev[setting as keyof typeof notificationSettings] 
    }));
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <SettingsIcon className="h-6 w-6 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
            {/* Sidebar/Tabs Navigation */}
            <div className="md:pr-6">
              {isMobile ? (
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Alerts</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>
                </Tabs>
              ) : (
                <div className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === "privacy" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                </div>
              )}
            </div>

            {/* Settings Content */}
            <div>
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size={isMobile ? "sm" : "default"}>
                          Change Avatar
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Recommended: Square image, at least 300x300px
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName"
                            name="fullName"
                            value={profileForm.fullName}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username"
                            name="username"
                            value={profileForm.username}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Direct Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when someone sends you a message
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.messages}
                          onCheckedChange={() => handleNotificationChange('messages')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Mentions</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when you are mentioned in discussions
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.mentions}
                          onCheckedChange={() => handleNotificationChange('mentions')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Event Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about upcoming academic events
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.events}
                          onCheckedChange={() => handleNotificationChange('events')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Study Requests</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when someone requests to study with you
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.studyRequests}
                          onCheckedChange={() => handleNotificationChange('studyRequests')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Resource Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when resources you follow are updated
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.resourceUpdates}
                          onCheckedChange={() => handleNotificationChange('resourceUpdates')}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotifications}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Profile Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow other users to view your full profile
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Online Status</Label>
                          <p className="text-sm text-muted-foreground">
                            Show when you are active on the platform
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Contact Information</Label>
                          <p className="text-sm text-muted-foreground">
                            Make your email and other contact info visible
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Study History</Label>
                          <p className="text-sm text-muted-foreground">
                            Show your past study sessions and partners
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSavePrivacy}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
