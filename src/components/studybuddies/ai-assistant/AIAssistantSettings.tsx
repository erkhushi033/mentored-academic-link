
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface AIAssistantSettingsProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  handleSaveApiKey: () => void;
}

const AIAssistantSettings = ({ apiKey, setApiKey, handleSaveApiKey }: AIAssistantSettingsProps) => {
  const { toast } = useToast();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">AI Assistant Preferences</h4>
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <div className="flex space-x-2">
              <Input 
                id="apiKey"
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key" 
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your OpenAI API key to use the AI Study Assistant with your own account.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AIAssistantSettings;
