
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface StudyBuddiesHeaderProps {
  onOpenAuthModal: () => void;
}

const StudyBuddiesHeader = ({ onOpenAuthModal }: StudyBuddiesHeaderProps) => {
  return (
    <section className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Study Buddies</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Find study partners and get AI help with your studies
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={onOpenAuthModal}>
              <Users className="mr-2 h-4 w-4" />
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyBuddiesHeader;
