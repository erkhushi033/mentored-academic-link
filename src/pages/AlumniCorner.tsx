
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageCircle, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Alumni {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  graduationYear: string;
  bio: string;
  location: string;
  expertise: string[];
  availability: string;
  mentoringTopics: string;
}

const mockAlumni: Alumni[] = [
  {
    id: "1",
    name: "Dr. Michael Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=4",
    title: "Data Scientist",
    company: "TechCorp Analytics",
    graduationYear: "2018",
    bio: "Ph.D. in Computer Science with a focus on machine learning algorithms. Currently working on developing predictive models for customer behavior at TechCorp Analytics.",
    location: "San Francisco, CA",
    expertise: ["Computer Science", "Machine Learning", "Data Analysis"],
    availability: "Evenings and weekends",
    mentoringTopics: "Mentorship, Research Collaboration, Industry Insights"
  },
  {
    id: "2",
    name: "Lisa Chang",
    avatar: "https://i.pravatar.cc/150?img=9",
    title: "Software Engineer",
    company: "InnovateTech",
    graduationYear: "2020",
    bio: "Former CS club president with a passion for creating accessible software. Currently working on developing enterprise-level web applications.",
    location: "Seattle, WA",
    expertise: ["Software Engineering", "Web Development", "Mobile Apps"],
    availability: "Weekends",
    mentoringTopics: "Career Guidance, Technical Interviews, Open Source"
  },
  {
    id: "3",
    name: "Prof. James Wilson",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Associate Professor",
    company: "City University",
    graduationYear: "2010",
    bio: "Mathematics alumnus who returned to academia after a brief industry career. Research focuses on statistical modeling and applications in public health.",
    location: "Boston, MA",
    expertise: ["Mathematics", "Statistics", "Data Science"],
    availability: "Weekdays",
    mentoringTopics: "Academic Career, Research Methods, Grant Writing"
  },
  {
    id: "4",
    name: "Sarah Jefferson",
    avatar: "https://i.pravatar.cc/150?img=10",
    title: "Product Manager",
    company: "Global Innovations",
    graduationYear: "2015",
    bio: "Business major with a minor in Computer Science. Leveraging technical knowledge and business acumen to lead product development teams.",
    location: "Austin, TX",
    expertise: ["Business", "Product Development", "UX Design"],
    availability: "Tuesday and Thursday evenings",
    mentoringTopics: "Product Management, Career Transitions, Leadership"
  }
];

const AlumniCard = ({ alumni }: { alumni: Alumni }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={alumni.avatar} />
              <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-xl font-semibold">{alumni.name}</h3>
              <Badge className="w-fit" variant="outline">Class of {alumni.graduationYear}</Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {alumni.title} at {alumni.company}
            </p>
            <p className="mt-3 text-sm">{alumni.bio}</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Expertise:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {alumni.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location:</p>
                  <p className="text-sm">{alumni.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Availability:</p>
                  <p className="text-sm">{alumni.availability}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Mentoring:</p>
                  <p className="text-sm">{alumni.mentoringTopics}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-5 flex flex-col xs:flex-row gap-2">
              <Button variant="default" size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AlumniCorner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("mentors");
  const [alumni, setAlumni] = useState<Alumni[]>(mockAlumni);
  
  const filteredAlumni = alumni.filter(alum => 
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-muted py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Alumni Corner</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Connect with alumni, explore career opportunities, and access helpful resources
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button variant={activeFilter === "mentors" ? "default" : "outline"} onClick={() => setActiveFilter("mentors")}>
                  Mentors
                </Button>
                <Button variant={activeFilter === "opportunities" ? "default" : "outline"} onClick={() => setActiveFilter("opportunities")}>
                  Opportunities
                </Button>
                <Button variant={activeFilter === "resources" ? "default" : "outline"} onClick={() => setActiveFilter("resources")}>
                  Resources
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for alumni mentors by name, title, or field..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Button variant="ghost" className="absolute right-2 top-1.5" onClick={() => setSearchTerm("")}>
                  {searchTerm && "Clear"}
                </Button>
              </div>

              {/* Alumni list */}
              {activeFilter === "mentors" && filteredAlumni.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredAlumni.map((alum) => (
                    <AlumniCard key={alum.id} alumni={alum} />
                  ))}
                </div>
              ) : activeFilter === "mentors" ? (
                <div className="text-center py-12">
                  <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No alumni mentors found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search criteria or check back later.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-muted-foreground flex items-center justify-center">
                    {activeFilter === "opportunities" ? (
                      <Briefcase className="h-12 w-12" />
                    ) : (
                      <GraduationCap className="h-12 w-12" />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    {activeFilter === "opportunities" ? 
                      "Career opportunities coming soon" : 
                      "Alumni resources coming soon"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We're working on bringing you valuable {activeFilter} from our alumni network.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlumniCorner;
