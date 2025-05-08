
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StudyBuddy as StudyBuddyType } from "@/lib/mockData";
import AIStudyAssistant from "./AIStudyAssistant";
import StudyBuddiesSearch from "./StudyBuddiesSearch";
import StudyBuddiesList from "./StudyBuddiesList";

interface StudyBuddiesContentProps {
  buddies: StudyBuddyType[];
  defaultTab: string;
}

const StudyBuddiesContent = ({ buddies, defaultTab }: StudyBuddiesContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuddies = buddies.filter((buddy) =>
    buddy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buddy.subjects.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsContent value="buddies" className="space-y-6">
        <StudyBuddiesSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <StudyBuddiesList buddies={filteredBuddies} />
      </TabsContent>
      
      <TabsContent value="ai" className="h-[calc(100vh-320px)] min-h-[500px]">
        <AIStudyAssistant />
      </TabsContent>
    </Tabs>
  );
};

export default StudyBuddiesContent;
