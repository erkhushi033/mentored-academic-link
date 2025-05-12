
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload } from "@/components/ui/file-upload/FileUpload";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarChange: (url: string) => void;
  size?: "sm" | "md" | "lg";
}

export function AvatarUpload({ 
  currentAvatarUrl, 
  onAvatarChange,
  size = "md"
}: AvatarUploadProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string>(currentAvatarUrl || "");
  
  // Map size prop to specific dimensions
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32"
  };
  
  const handleAvatarUpload = async (url: string) => {
    setAvatarUrl(url);
    onAvatarChange(url);
    
    // If user is authenticated, update their profile in Supabase
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', user.id);
      
      if (error) {
        toast({
          title: "Failed to update profile",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };
  
  // Generate initials for the avatar fallback
  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    
    return "U";
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className={`${sizeClasses[size]} border-2 border-primary/10`}>
        <AvatarImage src={avatarUrl} alt="Profile avatar" />
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
      
      <FileUpload
        bucketName="avatars"
        acceptedFileTypes="image/*"
        maxSizeMB={2}
        buttonText="Change Avatar"
        variant="outline"
        onUploadComplete={handleAvatarUpload}
      />
      <p className="text-xs text-muted-foreground">
        Recommended: Square image, max 2MB
      </p>
    </div>
  );
}
