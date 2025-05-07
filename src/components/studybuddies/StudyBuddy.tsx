
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, MessageCircle } from "lucide-react";
import { type StudyBuddy as StudyBuddyType } from "@/lib/mockData";

interface StudyBuddyProps {
  buddy: StudyBuddyType;
}

const StudyBuddy: React.FC<StudyBuddyProps> = ({ buddy }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={buddy.avatar} />
            <AvatarFallback>{buddy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-lg">{buddy.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="capitalize">{buddy.role}</span>
              {buddy.year && (
                <>
                  <span className="mx-1">•</span>
                  <span>Year {buddy.year}</span>
                </>
              )}
              {buddy.major && (
                <>
                  <span className="mx-1">•</span>
                  <span>{buddy.major}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Match Score</span>
            <span className="text-sm font-medium">{buddy.matchScore}%</span>
          </div>
          <Progress value={buddy.matchScore} className="h-1.5" />
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Shared Interests</h4>
            <div className="flex flex-wrap gap-2">
              {buddy.sharedInterests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Other Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {buddy.subjects
                .filter((subject) => !buddy.sharedInterests.includes(subject))
                .map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {buddy.availability.length} available timeslots
            </span>
          </div>
          <Button size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudyBuddy;
