
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Download, FileText, File, BookOpen, Newspaper, Video } from "lucide-react";
import { Resource } from "@/hooks/use-resources";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-5 w-5" />;
      case "paper":
        return <File className="h-5 w-5" />;
      case "book":
        return <BookOpen className="h-5 w-5" />;
      case "article":
        return <Newspaper className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {getResourceIcon(resource.category)}
            </div>
            <div className="text-sm font-medium">
              {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
            </div>
          </div>
        </div>
        <CardTitle className="mt-3 text-lg">
          {resource.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {resource.description || "No description provided"}
        </p>
        <div className="mt-4 text-xs text-muted-foreground">
          Uploaded on {new Date(resource.created_at).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-4">
            <div className="flex items-center text-sm">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {0}
            </div>
            <div className="flex items-center text-sm">
              <Download className="h-4 w-4 mr-1" />
              {resource.downloads}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => window.open(resource.file_url || "#", "_blank")}
            disabled={!resource.file_url}
          >
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
