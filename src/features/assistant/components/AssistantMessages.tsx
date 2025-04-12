
import { useRef, useEffect } from "react";
import { Bot, User, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../types";

interface AssistantMessagesProps {
  messages: Message[];
  isTyping: boolean;
  apiError: string;
}

export const AssistantMessages = ({ messages, isTyping, apiError }: AssistantMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="p-6 pt-2 h-[350px]">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "assistant" ? "items-start" : "items-start justify-end"
            }`}
          >
            {message.role === "assistant" && (
              <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-vendeai-gold" />
              </div>
            )}
            
            <div
              className={`rounded-lg p-3 max-w-[85%] ${
                message.role === "assistant"
                  ? "bg-vendeai-gray/10 text-white"
                  : "bg-vendeai-gold/10 text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                {new Date(message.timestamp).toLocaleTimeString()}
                {message.context && (
                  <span className="ml-2 bg-vendeai-gold/10 px-1.5 py-0.5 rounded-full text-xs">
                    {message.context}
                  </span>
                )}
              </div>
            </div>
            
            {message.role === "user" && (
              <div className="bg-vendeai-gold h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-4 w-4 text-black" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="bg-vendeai-gold/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="h-4 w-4 text-vendeai-gold" />
            </div>
            <div className="rounded-lg p-3 max-w-[85%] bg-vendeai-gray/10 text-white">
              <div className="flex space-x-1 items-center">
                <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="h-2 w-2 bg-vendeai-gold/50 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        {apiError && (
          <div className="flex items-start gap-3">
            <div className="bg-red-500/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <div className="rounded-lg p-3 max-w-[85%] bg-red-500/10 text-white">
              <p className="text-sm">{apiError}</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
