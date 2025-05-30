
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import StudyBuddies from "./pages/StudyBuddies";
import Events from "./pages/Events";
import Messages from "./pages/Messages";
import AlumniCorner from "./pages/AlumniCorner";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Feedback from "./pages/Feedback";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/studybuddies" element={<StudyBuddies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/alumni" element={<AlumniCorner />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feedback" element={<Feedback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
