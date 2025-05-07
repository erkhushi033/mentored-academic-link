
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-connected-blue" />
            <span className="ml-2 text-lg font-semibold">ConnectEd</span>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ConnectEd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
