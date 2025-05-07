
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Search, Plus, Clock, Users, MapPin, CalendarDays } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isVirtual: boolean;
  attendees: number;
  organizer: string;
  tags: string[];
}

const mockEvents: EventType[] = [
  {
    id: "1",
    title: "Machine Learning Workshop",
    description: "Hands-on workshop on implementing neural networks and deep learning algorithms.",
    date: "Thu, May 15",
    startTime: "10:00 AM",
    endTime: "16:00",
    location: "Computer Science Building, Room 401",
    isVirtual: false,
    attendees: 24,
    organizer: "AI Research Club",
    tags: ["machine learning", "workshop", "AI"]
  },
  {
    id: "2",
    title: "Mathematics Seminar Series",
    description: "Weekly seminar covering advanced topics in differential equations and their applications.",
    date: "Sat, May 10",
    startTime: "14:00",
    endTime: "16:00",
    location: "Mathematics Department, Room 203",
    isVirtual: false,
    attendees: 18,
    organizer: "Mathematics Department",
    tags: ["mathematics", "seminar", "differential equations"]
  },
  {
    id: "3",
    title: "Virtual Career Fair",
    description: "Connect with potential employers in the fields of science, technology, engineering, and mathematics.",
    date: "Tue, May 20",
    startTime: "09:00",
    endTime: "17:00",
    location: "Virtual Event",
    isVirtual: true,
    attendees: 156,
    organizer: "Career Development Center",
    tags: ["career fair", "virtual", "networking"]
  },
  {
    id: "4",
    title: "Research Symposium",
    description: "Annual symposium showcasing undergraduate and graduate research projects across all disciplines.",
    date: "Fri, May 17",
    startTime: "13:00",
    endTime: "18:00",
    location: "University Center, Grand Hall",
    isVirtual: false,
    attendees: 120,
    organizer: "Office of Research",
    tags: ["research", "symposium", "academic"]
  },
  {
    id: "5",
    title: "Study Group: Organic Chemistry",
    description: "Weekly study group for Organic Chemistry I students preparing for the final exam.",
    date: "Mon, May 13",
    startTime: "16:00",
    endTime: "18:00",
    location: "Science Building, Room 302",
    isVirtual: false,
    attendees: 12,
    organizer: "Chemistry Student Association",
    tags: ["chemistry", "study group", "organic chemistry"]
  },
  {
    id: "6",
    title: "Guest Lecture: Quantum Computing",
    description: "Distinguished lecture by Dr. Elena Vazquez on recent advances in quantum computing and their implications.",
    date: "Wed, May 22",
    startTime: "15:00",
    endTime: "17:00",
    location: "Physics Building, Auditorium",
    isVirtual: false,
    attendees: 85,
    organizer: "Physics Department",
    tags: ["quantum computing", "lecture", "physics"]
  }
];

const EventCard = ({ event }: { event: EventType }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{event.date}, {event.startTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{event.attendees} attendees • Organized by {event.organizer}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {event.tags.map((tag) => (
            <Badge key={tag} variant={tag.includes("virtual") ? "secondary" : "outline"} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="pt-3">
          <Button className="w-full" variant="default">
            RSVP
          </Button>
          {event.isVirtual && (
            <Button className="w-full mt-2" variant="outline">
              Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<EventType[]>(mockEvents);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-muted py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Academic Events</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Discover workshops, seminars, study groups, and other academic activities
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
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
                  placeholder="Search for events by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View switcher */}
              <div className="flex justify-end">
                <Tabs defaultValue="list">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Events grid */}
              <div>
                <TabsContent value="list" className="mt-0">
                  {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No events found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Try changing your search criteria or create a new event.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="calendar">
                  <div className="min-h-[500px] flex items-center justify-center border rounded-md p-8">
                    <div className="text-center">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Calendar View Coming Soon</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We're working on implementing a calendar view for events.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
