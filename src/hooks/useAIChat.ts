
import { useState, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import { getAIResponse, configureAIService } from "@/services/aiService";
import { useToast } from "@/components/ui/use-toast";

export const useAIChat = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    // Load API key from localStorage on component mount
    if (typeof window !== "undefined") {
      return localStorage.getItem("openai_api_key") || "";
    }
    return "";
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      content: "Hi there! I'm your AI study assistant. How can I help you with your academic needs today?", 
      isAI: true 
    }
  ]);
  
  const { toast } = useToast();

  // Set the API key when it changes
  useEffect(() => {
    if (apiKey) {
      configureAIService(apiKey);
    }
  }, [apiKey]);

  const handleSaveApiKey = () => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
      configureAIService(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved.",
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter an API key to save.",
        variant: "destructive",
      });
    }
  };

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
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant",
        variant: "destructive",
      });
      
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

  return {
    question,
    setQuestion,
    isLoading,
    apiKey,
    setApiKey,
    messages,
    handleSaveApiKey,
    handleSendMessage
  };
};
