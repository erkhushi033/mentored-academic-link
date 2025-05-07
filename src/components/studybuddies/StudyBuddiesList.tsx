
import { StudyBuddy as StudyBuddyType } from "@/lib/mockData";
import StudyBuddy from "./StudyBuddy";
import { Users } from "lucide-react";

interface StudyBuddiesListProps {
  buddies: StudyBuddyType[];
}

const StudyBuddiesList = ({ buddies }: StudyBuddiesListProps) => {
  if (buddies.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No study buddies found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try updating your search or academic preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buddies.map((buddy) => (
        <StudyBuddy key={buddy.id} buddy={buddy} />
      ))}
    </div>
  );
};

export default StudyBuddiesList;
