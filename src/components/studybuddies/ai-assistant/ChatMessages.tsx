
import { useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4 overflow-y-auto" aria-live="polite" role="log" aria-label="Chat conversation">
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
            <div className="flex space-x-2 items-center" aria-label="Loading response">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} tabIndex={-1} />
    </div>
  );
};

export default ChatMessages;
