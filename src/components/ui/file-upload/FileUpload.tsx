
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface FileUploadProps {
  bucketName: string;
  onUploadComplete: (url: string, fileData?: any) => void;
  folderPath?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
  buttonText?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export function FileUpload({
  bucketName,
  onUploadComplete,
  folderPath = "",
  acceptedFileTypes = "image/*",
  maxSizeMB = 5,
  className = "",
  buttonText = "Upload File",
  variant = "default"
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // File validation
    if (!file.type.match(acceptedFileTypes.replace("*", ""))) {
      toast({
        title: "Invalid file type",
        description: `Please upload a ${acceptedFileTypes.replace("*", "")} file.`,
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a unique file path
      const userId = user?.id || 'anonymous';
      const filePath = folderPath 
        ? `${folderPath}/${Date.now()}_${file.name}`
        : `${userId}/${Date.now()}_${file.name}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded.",
      });
      
      onUploadComplete(urlData.publicUrl, data);
      
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className={`${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedFileTypes}
      />
      <Button 
        onClick={triggerFileInput}
        disabled={isUploading}
        variant={variant}
        className="flex items-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            {acceptedFileTypes.includes('image') ? (
              <FileImage className="h-4 w-4" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{buttonText}</span>
          </>
        )}
      </Button>
    </div>
  );
}
