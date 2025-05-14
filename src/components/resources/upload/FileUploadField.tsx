
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload/FileUpload";
import { File, X } from "lucide-react";

interface FileUploadFieldProps {
  fileUrl: string;
  onFileUpload: (url: string) => void;
}

export function FileUploadField({ fileUrl, onFileUpload }: FileUploadFieldProps) {
  return (
    <div className="space-y-3">
      <Label>Upload File</Label>
      {fileUrl ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <File className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm truncate max-w-[200px]">
              {fileUrl.split('/').pop()}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onFileUpload("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <FileUpload
          bucketName="resources"
          acceptedFileTypes="*/*"
          maxSizeMB={10}
          buttonText="Upload File"
          onUploadComplete={onFileUpload}
          className="flex justify-center"
        />
      )}
      <p className="text-xs text-muted-foreground">
        Maximum file size: 10MB
      </p>
    </div>
  );
}
