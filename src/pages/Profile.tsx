import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Calendar, Book, BookOpen, Users, MessageCircle, GraduationCap, Settings, Edit, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const mockUserData = {
  name: "Alex Johnson",
  username: "@alexjohnson",
  avatar: "https://github.com/shadcn.png",
  role: "Student",
  major: "Computer Science",
  year: "Junior",
  joinedDate: "August 2023",
  bio: "Computer Science student interested in AI and machine learning. Looking for study partners for advanced algorithms.",
  subjects: ["Algorithms", "Machine Learning", "Data Structures", "Web Development"],
  activityStats: {
    studySessions: 23,
    resources: 15,
    connections: 47
  },
  upcomingEvents: [
    { id: "1", title: "AI Workshop", date: "May 15, 2025", time: "10:00 AM" },
    { id: "2", title: "Study Group: Algorithms", date: "May 17, 2025", time: "2:00 PM" }
  ],
  sharedResources: [
    { id: "1", title: "Introduction to Neural Networks", type: "PDF", views: 128 },
    { id: "2", title: "Algorithm Optimization Tips", type: "Notes", views: 56 },
    { id: "3", title: "Web Dev Cheatsheet", type: "Link", views: 92 }
  ],
  studyBuddies: [
    { id: "1", name: "Emma Williams", avatar: "https://i.pravatar.cc/150?img=5", subject: "Machine Learning" },
    { id: "2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=11", subject: "Algorithms" },
    { id: "3", name: "Sarah Lopez", avatar: "https://i.pravatar.cc/150?img=20", subject: "Web Development" }
  ]
};

const Profile = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>(
    user?.user_metadata?.avatar_url || mockUserData.avatar
  );
  
  const handleAvatarChange = (url: string) => {
    setAvatarUrl(url);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <div className="h-32 md:h-48 bg-gradient-to-r from-primary/20 to-secondary/20" />
            <div className="px-4 md:px-8 pb-6 relative">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
                <div className="flex flex-col sm:flex-row sm:items-end">
                  <div className="-mt-12 sm:-mt-16 z-10">
                    <AvatarUpload 
                      currentAvatarUrl={avatarUrl} 
                      onAvatarChange={handleAvatarChange}
                      size={isMobile ? "md" : "lg"}
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4 mb-2 text-center sm:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold">{mockUserData.name}</h1>
                    <p className="text-muted-foreground">{mockUserData.username}</p>
                  </div>
                </div>
                
                <div className="flex mt-4 sm:mt-0 justify-center sm:justify-end gap-2">
                  <Link to="/settings">
                    <Button variant="outline" size={isMobile ? "sm" : "default"}>
                      <Settings className="h-4 w-4 mr-2" />
                      {!isMobile && "Settings"}
                    </Button>
                  </Link>
                  <Button variant="default" size={isMobile ? "sm" : "default"}>
                    <Edit className="h-4 w-4 mr-2" />
                    {!isMobile && "Edit Profile"}
                    {isMobile && "Edit"}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-4 justify-center sm:justify-start">
                    <Badge variant="secondary">{mockUserData.role}</Badge>
                    <Badge variant="outline">{mockUserData.major}</Badge>
                    <Badge variant="outline">{mockUserData.year}</Badge>
                    <div className="text-xs text-muted-foreground">Joined {mockUserData.joinedDate}</div>
                  </div>
                  <p className="text-center sm:text-left">{mockUserData.bio}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end text-center sm:text-right">
                  <div>
                    <p className="text-2xl font-bold">{mockUserData.activityStats.studySessions}</p>
                    <p className="text-sm text-muted-foreground">Study Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUserData.activityStats.resources}</p>
                    <p className="text-sm text-muted-foreground">Resources</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUserData.activityStats.connections}</p>
                    <p className="text-sm text-muted-foreground">Connections</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2 text-center sm:text-left">Subjects of Interest</h3>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {mockUserData.subjects.map(subject => (
                    <Badge key={subject} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="mt-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="activity">
                  <Calendar className="h-4 w-4 mr-2 inline md:hidden" />
                  <span className="hidden md:inline">Activity & Events</span>
                  <span className="md:hidden">Activity</span>
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <Book className="h-4 w-4 mr-2 inline md:hidden" />
                  <span>Resources</span>
                </TabsTrigger>
                <TabsTrigger value="connections">
                  <Users className="h-4 w-4 mr-2 inline md:hidden" />
                  <span>Connections</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Upcoming Events</h3>
                      </div>
                      {mockUserData.upcomingEvents.length > 0 ? (
                        <div className="space-y-4">
                          {mockUserData.upcomingEvents.map(event => (
                            <div key={event.id} className="flex items-start">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Calendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {event.date} at {event.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No upcoming events</p>
                      )}
                      <div className="mt-6">
                        <Link to="/events">
                          <Button variant="outline" className="w-full">View All Events</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Recent Activity</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                            <BookOpen className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Shared a new resource</h4>
                            <p className="text-sm text-muted-foreground">
                              "Algorithm Optimization Tips"
                            </p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Joined a study group</h4>
                            <p className="text-sm text-muted-foreground">
                              "Advanced Algorithms"
                            </p>
                            <p className="text-xs text-muted-foreground">5 days ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                            <MessageCircle className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Posted a question</h4>
                            <p className="text-sm text-muted-foreground">
                              "Neural network optimization methods"
                            </p>
                            <p className="text-xs text-muted-foreground">1 week ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Shared Resources</h3>
                      </div>
                      <Button size={isMobile ? "sm" : "default"} variant="outline">
                        {isMobile ? "Share" : "Share New Resource"}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {mockUserData.sharedResources.map(resource => (
                        <div key={resource.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                              <Book className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {resource.type} • {resource.views} views
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/resources">
                        <Button variant="outline" className="w-full">View All Resources</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connections" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Study Buddies</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {mockUserData.studyBuddies.map(buddy => (
                          <div key={buddy.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={buddy.avatar} />
                                <AvatarFallback>{buddy.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{buddy.name}</h4>
                                <p className="text-sm text-muted-foreground">{buddy.subject}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Link to="/studybuddies">
                          <Button variant="outline" className="w-full">Find More Study Buddies</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Network</h3>
                      </div>
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <Users className="h-10 w-10 text-muted-foreground mb-2" />
                        <h4 className="font-medium">Build Your Network</h4>
                        <p className="text-sm text-muted-foreground max-w-xs mt-1">
                          Connect with professors, researchers, and alumni to expand your academic connections
                        </p>
                        <Button className="mt-4" variant="default">
                          Explore Connections
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
