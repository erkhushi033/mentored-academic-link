
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload/FileUpload";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { File, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formData.currentTag) {
      e.preventDefault();
      addTag();
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Resource</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Resource title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the resource"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="currentTag"
                name="currentTag"
                value={formData.currentTag}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Add tags"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={addTag}
                disabled={!formData.currentTag}
              >
                Add
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="px-2 py-1 flex items-center gap-1"
                  >
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label>Upload File</Label>
            {formData.fileUrl ? (
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <File className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm truncate max-w-[200px]">
                    {formData.fileUrl.split('/').pop()}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setFormData({...formData, fileUrl: ""})}
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
                onUploadComplete={handleFileUpload}
                className="flex justify-center"
              />
            )}
            <p className="text-xs text-muted-foreground">
              Maximum file size: 10MB
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.fileUrl || !formData.title || !formData.category}
          >
            {isSubmitting ? "Saving..." : "Upload Resource"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
