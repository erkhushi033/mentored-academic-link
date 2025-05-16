
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputFormProps {
  question: string;
  setQuestion: (question: string) => void;
  handleSendMessage: (e: FormEvent) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInputForm = ({ 
  question, 
  setQuestion, 
  handleSendMessage, 
  isLoading,
  disabled = false
}: ChatInputFormProps) => {
  return (
    <form onSubmit={handleSendMessage} className="w-full flex gap-2" aria-label="Chat input form">
      <Input
        placeholder={disabled ? "Please log in to chat" : "Ask a question..."}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-grow"
        disabled={isLoading || disabled}
        aria-label="Question input"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || disabled}
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInputForm;
