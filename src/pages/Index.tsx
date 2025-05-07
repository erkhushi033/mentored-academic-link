
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BookUser, 
  MessageCircle, 
  GraduationCap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 lg:py-24 bg-background">
          <div className="connected-gradient absolute top-0 left-0 right-0 h-2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="text-primary">Connect</span> and <span className="text-secondary">Collaborate</span> in Your Academic Journey
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                ConnectEd brings together students, professors, researchers, and alumni 
                to create meaningful academic connections and foster collaborative learning.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/resources" className="w-full sm:w-auto">
                  <Button size={isMobile ? "default" : "lg"} className="w-full">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Explore Resources
                  </Button>
                </Link>
                <Link to="/studybuddies" className="w-full sm:w-auto">
                  <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full">
                    <Users className="h-5 w-5 mr-2" />
                    Find Study Buddies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Unlock the Power of Academic Networking</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                ConnectEd provides all the tools you need to excel in your academic journey
                through meaningful connections and valuable resources.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">Smart Match-Making</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Connect with mentors, study buddies, and research assistants that match your interests and goals.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">Resource Sharing</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Access and share notes, papers, and study materials to enhance your learning experience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">Real-time Messaging</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Chat with peers, mentors, and collaborators directly within the platform.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">Academic Calendar</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Discover and join academic events, webinars, study sessions, and faculty talks.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <BookUser className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">Alumni Network</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Connect with graduates for mentorship, career advice, and professional opportunities.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-card shadow-sm rounded-lg p-4 sm:p-6 card-hover">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">AI Study Assistant</h3>
                <p className="text-muted-foreground text-center sm:text-left">
                  Get help with studying and revision through our intelligent AI assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-xl overflow-hidden shadow-lg">
              <div className="px-6 py-10 md:p-12 md:flex md:items-center md:justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground">
                    Ready to enhance your academic experience?
                  </h2>
                  <p className="mt-2 text-base md:text-lg text-primary-foreground/90 max-w-2xl">
                    Join thousands of students and faculty who are already using ConnectEd.
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Link to="/resources">
                    <Button size={isMobile ? "default" : "lg"} variant="secondary">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
