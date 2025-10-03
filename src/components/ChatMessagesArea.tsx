import { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessagesArea = ({ messages, isLoading }: ChatMessagesAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 overflow-y-auto">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3 p-4 rounded-lg bg-card max-w-[85%]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm font-medium text-foreground/80">
                AI SAKERNAS
              </p>
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessagesArea;