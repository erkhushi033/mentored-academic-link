
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockStudyBuddies, getAIResponse, type StudyBuddy as StudyBuddyType } from "@/lib/mockData";
import { Users, MessageCircle, Brain, Send, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ChatMessage {
  id: number;
  content: string;
  isAI: boolean;
}

const AIStudyAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      content: "Hi there! I'm your AI study assistant. How can I help you with your academic needs today?", 
      isAI: true 
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      content: question,
      isAI: false
    };
    
    setMessages([...messages, newUserMessage]);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get AI response
      const aiResponse = getAIResponse(question);
      
      const newAIMessage: ChatMessage = {
        id: Date.now() + 1,
        content: aiResponse,
        isAI: true
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsLoading(false);
    }, 1000);
    
    setQuestion("");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Study Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Ask questions and get help with your studies</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isAI
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

const StudyBuddy = ({ buddy }: { buddy: StudyBuddyType }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={buddy.avatar} />
            <AvatarFallback>{buddy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-lg">{buddy.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="capitalize">{buddy.role}</span>
              {buddy.year && (
                <>
                  <span className="mx-1">•</span>
                  <span>Year {buddy.year}</span>
                </>
              )}
              {buddy.major && (
                <>
                  <span className="mx-1">•</span>
                  <span>{buddy.major}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Match Score</span>
            <span className="text-sm font-medium">{buddy.matchScore}%</span>
          </div>
          <Progress value={buddy.matchScore} className="h-1.5" />
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Shared Interests</h4>
            <div className="flex flex-wrap gap-2">
              {buddy.sharedInterests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Other Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {buddy.subjects
                .filter((subject) => !buddy.sharedInterests.includes(subject))
                .map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {buddy.availability.length} available timeslots
            </span>
          </div>
          <Button size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const StudyBuddies = () => {
  const [buddies, setBuddies] = useState<StudyBuddyType[]>(mockStudyBuddies);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuddies = buddies.filter((buddy) =>
    buddy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buddy.subjects.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-muted py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Study Buddies</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Find study partners and get AI help with your studies
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Update Preferences
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="buddies" className="w-full">
              <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto">
                <TabsTrigger value="buddies" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Find Study Buddies</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI Study Assistant</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buddies" className="space-y-6">
                {/* Search bar for buddies */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by name or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>

                {/* Buddies list */}
                {filteredBuddies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuddies.map((buddy) => (
                      <StudyBuddy key={buddy.id} buddy={buddy} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No study buddies found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try updating your search or academic preferences.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="ai" className="h-[calc(100vh-320px)] min-h-[500px]">
                <AIStudyAssistant />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyBuddies;
