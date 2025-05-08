
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudyBuddies, type StudyBuddy as StudyBuddyType } from "@/lib/mockData";
import { Users, Brain } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import StudyBuddiesHeader from "@/components/studybuddies/StudyBuddiesHeader";
import StudyBuddiesContent from "@/components/studybuddies/StudyBuddiesContent";

const StudyBuddies = () => {
  const { isAuthenticated, login } = useAuth();
  const [buddies, setBuddies] = useState<StudyBuddyType[]>(mockStudyBuddies);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("buddies");

  const handleAuthModalOpen = () => {
    setShowAuthModal(true);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleAuthenticated = (user: { email: string; id: string }) => {
    login(user);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <StudyBuddiesHeader onOpenAuthModal={handleAuthModalOpen} />

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
              
              <StudyBuddiesContent buddies={buddies} defaultTab={activeTab} />
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
