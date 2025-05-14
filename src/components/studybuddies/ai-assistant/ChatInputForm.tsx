
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputFormProps {
  question: string;
  setQuestion: (question: string) => void;
  handleSendMessage: (e: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const ChatInputForm = ({ 
  question, 
  setQuestion, 
  handleSendMessage, 
  isLoading 
}: ChatInputFormProps) => {
  return (
    <form onSubmit={handleSendMessage} className="w-full flex gap-2">
      <Input
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-grow"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInputForm;
