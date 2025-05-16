
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";
import ChatMessages from "./ai-assistant/ChatMessages";
import ChatInputForm from "./ai-assistant/ChatInputForm";
import AIAssistantSettings from "./ai-assistant/AIAssistantSettings";
import CreateStudyEvent from "./ai-assistant/CreateStudyEvent";

const AIStudyAssistant = () => {
  const {
    question,
    setQuestion,
    isLoading,
    apiKey,
    setApiKey,
    messages,
    handleSaveApiKey,
    handleSendMessage
  } = useAIChat();

  const handleEventCreated = (event: any) => {
    // Format the event details as a message
    const eventDate = event.date ? new Date(event.date) : new Date();
    const formattedDate = eventDate.toLocaleDateString();
    
    const eventMessage = `
📚 New Study Event Created 📚
Title: ${event.title}
Description: ${event.description}
Date: ${formattedDate}
Time: ${event.time}
Location: ${event.location}
`;
    
    // Add the event as a message and trigger the AI response
    setQuestion(eventMessage);
    
    // Use setTimeout to ensure the question state is updated before sending
    setTimeout(() => {
      const fakeEvent = new Event('submit') as any;
      handleSendMessage(fakeEvent);
    }, 100);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>AI Study Assistant</CardTitle>
              <p className="text-sm text-muted-foreground">Ask questions and get help with your studies</p>
            </div>
          </div>
          <AIAssistantSettings 
            apiKey={apiKey}
            setApiKey={setApiKey}
            handleSaveApiKey={handleSaveApiKey}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-4 space-y-4">
        <CreateStudyEvent onEventCreated={handleEventCreated} />
        
        <div className="h-full overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <ChatInputForm
          question={question}
          setQuestion={setQuestion}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default AIStudyAssistant;
