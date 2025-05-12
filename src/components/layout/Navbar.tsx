import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  Users,
  Calendar,
  BookUser,
  MessageSquare,
  MessageCircle
} from "lucide-react";
import { UserAccountNav } from "./UserAccountNav";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { login } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "";
  };

  const handleShowAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthenticated = (user: { email: string; id: string }) => {
    login(user.email, ""); // This won't actually be used since we're now using Supabase auth
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-connected-blue" />
              <span className="ml-2 text-xl font-bold text-primary">
                ConnectEd
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/studybuddies" className={`nav-link ${isActive("/studybuddies")}`}>
              <Users className="h-4 w-4 mr-2 inline" />
              Study Buddies
            </Link>
            <Link to="/resources" className={`nav-link ${isActive("/resources")}`}>
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Resources
            </Link>
            <Link to="/events" className={`nav-link ${isActive("/events")}`}>
              <Calendar className="h-4 w-4 mr-2 inline" />
              Events
            </Link>
            <Link to="/messages" className={`nav-link ${isActive("/messages")}`}>
              <MessageSquare className="h-4 w-4 mr-2 inline" />
              Messages
            </Link>
            <Link to="/alumni" className={`nav-link ${isActive("/alumni")}`}>
              <BookUser className="h-4 w-4 mr-2 inline" />
              Alumni Corner
            </Link>
            <Link to="/feedback" className={`nav-link ${isActive("/feedback")}`}>
              <MessageCircle className="h-4 w-4 mr-2 inline" />
              Feedback
            </Link>
            <div className="ml-4">
              <UserAccountNav onShowAuthModal={handleShowAuthModal} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block nav-link ${isActive("/")}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/studybuddies"
              className={`block nav-link ${isActive("/studybuddies")}`}
              onClick={toggleMenu}
            >
              <Users className="h-4 w-4 mr-2 inline" />
              Study Buddies
            </Link>
            <Link
              to="/resources"
              className={`block nav-link ${isActive("/resources")}`}
              onClick={toggleMenu}
            >
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Resources
            </Link>
            <Link
              to="/events"
              className={`block nav-link ${isActive("/events")}`}
              onClick={toggleMenu}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Events
            </Link>
            <Link
              to="/messages"
              className={`block nav-link ${isActive("/messages")}`}
              onClick={toggleMenu}
            >
              <MessageSquare className="h-4 w-4 mr-2 inline" />
              Messages
            </Link>
            <Link
              to="/alumni"
              className={`block nav-link ${isActive("/alumni")}`}
              onClick={toggleMenu}
            >
              <BookUser className="h-4 w-4 mr-2 inline" />
              Alumni Corner
            </Link>
            <Link
              to="/feedback"
              className={`block nav-link ${isActive("/feedback")}`}
              onClick={toggleMenu}
            >
              <MessageCircle className="h-4 w-4 mr-2 inline" />
              Feedback
            </Link>
            <div className="py-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleShowAuthModal();
                  toggleMenu();
                }}
              >
                Sign In / Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseAuthModal}
        onAuthenticated={handleAuthenticated}
      />
    </nav>
  );
};

export default Navbar;
