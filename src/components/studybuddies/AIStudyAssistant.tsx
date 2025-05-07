
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Send } from "lucide-react";
import { getAIResponse } from "@/services/aiService";
import { toast } from "sonner";

interface ChatMessage {
  id: number;
  content: string;
  isAI: boolean;
}

const AIStudyAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      content: "Hi there! I'm your AI study assistant. How can I help you with your academic needs today?", 
      isAI: true 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      content: question,
      isAI: false
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    try {
      // Get AI response using our service
      const aiResponse = await getAIResponse(question);
      
      const newAIMessage: ChatMessage = {
        id: Date.now() + 1,
        content: aiResponse,
        isAI: true
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get a response from the AI assistant");
      
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        isAI: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Study Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Ask questions and get help with your studies</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isAI
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
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
      </CardFooter>
    </Card>
  );
};

export default AIStudyAssistant;
