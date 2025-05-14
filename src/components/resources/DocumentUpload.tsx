
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FormFields } from "./upload/FormFields";
import { TagsInput } from "./upload/TagsInput";
import { FileUploadField } from "./upload/FileUploadField";
import { FormActions } from "./upload/FormActions";

interface DocumentUploadProps {
  onUploadComplete?: (resourceData: any) => void;
  onCancel?: () => void;
}

export function DocumentUpload({ onUploadComplete, onCancel }: DocumentUploadProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    fileUrl: "",
    tags: [] as string[],
    currentTag: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFileUpload = (url: string) => {
    setFormData({...formData, fileUrl: url});
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData({...formData, category: value});
  };
  
  const addTag = () => {
    if (formData.currentTag && !formData.tags.includes(formData.currentTag)) {
      setFormData({
        ...formData, 
        tags: [...formData.tags, formData.currentTag],
        currentTag: ""
      });
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formData.currentTag) {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your resource.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your resource.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.fileUrl) {
      toast({
        title: "File required",
        description: "Please upload a file.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert resource into database
      const { data, error } = await supabase
        .from('resources')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          file_url: formData.fileUrl,
          tags: formData.tags,
          created_by: user?.id
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Resource uploaded",
        description: "Your resource has been uploaded successfully.",
      });
      
      if (onUploadComplete) {
        onUploadComplete(data);
      }
      
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error saving your resource.",
        variant: "destructive",
      });
      console.error("Resource upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = Boolean(formData.fileUrl && formData.title && formData.category);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Resource</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <FormFields 
            title={formData.title}
            description={formData.description}
            category={formData.category}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
          />
          
          <TagsInput 
            tags={formData.tags}
            currentTag={formData.currentTag}
            onTagChange={handleChange}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onKeyDown={handleKeyDown}
          />
          
          <Separator />
          
          <FileUploadField 
            fileUrl={formData.fileUrl}
            onFileUpload={handleFileUpload}
          />
        </CardContent>
        
        <CardFooter>
          <FormActions 
            isSubmitting={isSubmitting}
            isValid={isFormValid}
            onCancel={onCancel}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
