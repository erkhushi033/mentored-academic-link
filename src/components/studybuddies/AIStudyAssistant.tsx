
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";
import ChatMessages from "./ai-assistant/ChatMessages";
import ChatInputForm from "./ai-assistant/ChatInputForm";
import AIAssistantSettings from "./ai-assistant/AIAssistantSettings";

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
      <CardContent className="flex-grow overflow-auto p-4">
        <ChatMessages 
          messages={messages}
          isLoading={isLoading}
        />
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
