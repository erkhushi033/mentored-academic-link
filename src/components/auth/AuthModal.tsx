
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "./AuthForm";
import { GraduationCap } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: { email: string; id: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const handleAuthenticated = (user: { email: string; id: string }) => {
    onAuthenticated(user);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Welcome to ConnectEd</DialogTitle>
          <DialogDescription>
            Sign in or create an account to connect with students, professors, and alumni.
          </DialogDescription>
        </DialogHeader>
        <AuthForm onAuthenticated={handleAuthenticated} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
