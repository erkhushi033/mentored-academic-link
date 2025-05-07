
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudyBuddies, type StudyBuddy as StudyBuddyType } from "@/lib/mockData";
import { Users, Brain } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudyBuddy from "@/components/studybuddies/StudyBuddy";
import AIStudyAssistant from "@/components/studybuddies/AIStudyAssistant";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";

const StudyBuddies = () => {
  const { isAuthenticated, login } = useAuth();
  const [buddies, setBuddies] = useState<StudyBuddyType[]>(mockStudyBuddies);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const filteredBuddies = buddies.filter((buddy) =>
    buddy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buddy.subjects.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAuthModalOpen = () => {
    setShowAuthModal(true);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleAuthenticated = (user: { email: string; id: string }) => {
    login(user);
  };

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
                <Button onClick={() => handleAuthModalOpen()}>
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
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthModalClose}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default StudyBuddies;
