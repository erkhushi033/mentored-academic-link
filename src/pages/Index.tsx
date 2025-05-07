
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-background">
          <div className="connected-gradient absolute top-0 left-0 right-0 h-2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary">Connect</span> and <span className="text-secondary">Collaborate</span> in Your Academic Journey
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                ConnectEd brings together students, professors, researchers, and alumni 
                to create meaningful academic connections and foster collaborative learning.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/resources">
                  <Button size="lg" className="w-full sm:w-auto">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Explore Resources
                  </Button>
                </Link>
                <Link to="/studybuddies">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Users className="h-5 w-5 mr-2" />
                    Find Study Buddies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">Unlock the Power of Academic Networking</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ConnectEd provides all the tools you need to excel in your academic journey
                through meaningful connections and valuable resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Match-Making</h3>
                <p className="text-muted-foreground">
                  Connect with mentors, study buddies, and research assistants that match your interests and goals.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resource Sharing</h3>
                <p className="text-muted-foreground">
                  Access and share notes, papers, and study materials to enhance your learning experience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
                <p className="text-muted-foreground">
                  Chat with peers, mentors, and collaborators directly within the platform.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Academic Calendar</h3>
                <p className="text-muted-foreground">
                  Discover and join academic events, webinars, study sessions, and faculty talks.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookUser className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Alumni Network</h3>
                <p className="text-muted-foreground">
                  Connect with graduates for mentorship, career advice, and professional opportunities.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Study Assistant</h3>
                <p className="text-muted-foreground">
                  Get help with studying and revision through our intelligent AI assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-xl overflow-hidden shadow-lg">
              <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    Ready to enhance your academic experience?
                  </h2>
                  <p className="mt-2 text-lg text-primary-foreground/90 max-w-2xl">
                    Join thousands of students and faculty who are already using ConnectEd.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Link to="/resources">
                    <Button size="lg" variant="secondary">
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
