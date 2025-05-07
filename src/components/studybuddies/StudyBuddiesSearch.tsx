
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

interface StudyBuddiesSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const StudyBuddiesSearch = ({ searchTerm, setSearchTerm }: StudyBuddiesSearchProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search by name or subject..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default StudyBuddiesSearch;
