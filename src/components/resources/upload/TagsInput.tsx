
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  currentTag: string;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function TagsInput({ 
  tags, 
  currentTag, 
  onTagChange, 
  onAddTag, 
  onRemoveTag, 
  onKeyDown 
}: TagsInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <div className="flex gap-2">
        <Input
          id="currentTag"
          name="currentTag"
          value={currentTag}
          onChange={onTagChange}
          onKeyDown={onKeyDown}
          placeholder="Add tags"
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onAddTag}
          disabled={!currentTag}
        >
          Add
        </Button>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="px-2 py-1 flex items-center gap-1"
            >
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onRemoveTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
