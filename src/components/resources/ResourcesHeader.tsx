
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DocumentUpload } from "@/components/resources/DocumentUpload";
import { Resource } from "@/hooks/use-resources";

interface ResourcesHeaderProps {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (open: boolean) => void;
  handleUploadComplete: (resource: Resource) => void;
}

export function ResourcesHeader({
  isUploadDialogOpen,
  setIsUploadDialogOpen,
  handleUploadComplete
}: ResourcesHeaderProps) {
  return (
    <section className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Academic Resources</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Access and share study materials, papers, and educational content
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0">
                <DocumentUpload 
                  onUploadComplete={handleUploadComplete} 
                  onCancel={() => setIsUploadDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
