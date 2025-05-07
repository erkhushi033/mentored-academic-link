
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Menu,
  X,
  User,
  BookOpen,
  Users,
  Calendar,
  BookUser
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <Link to="/resources" className="nav-link">
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Resources
            </Link>
            <Link to="/studybuddies" className="nav-link">
              <Users className="h-4 w-4 mr-2 inline" />
              Study Buddies
            </Link>
            <Link to="/events" className="nav-link">
              <Calendar className="h-4 w-4 mr-2 inline" />
              Events
            </Link>
            <Link to="/alumni" className="nav-link">
              <BookUser className="h-4 w-4 mr-2 inline" />
              Alumni
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="ml-4">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
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
              to="/resources"
              className="block nav-link"
              onClick={toggleMenu}
            >
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Resources
            </Link>
            <Link
              to="/studybuddies"
              className="block nav-link"
              onClick={toggleMenu}
            >
              <Users className="h-4 w-4 mr-2 inline" />
              Study Buddies
            </Link>
            <Link
              to="/events"
              className="block nav-link"
              onClick={toggleMenu}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Events
            </Link>
            <Link
              to="/alumni"
              className="block nav-link"
              onClick={toggleMenu}
            >
              <BookUser className="h-4 w-4 mr-2 inline" />
              Alumni
            </Link>
            <Link
              to="/profile"
              className="block nav-link"
              onClick={toggleMenu}
            >
              <User className="h-4 w-4 mr-2 inline" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
