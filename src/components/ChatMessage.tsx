import { Bot, User, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // Import toast from sonner

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Pesan disalin ke clipboard!");
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg transition-all duration-200",
        isUser ? "bg-primary/5 ml-auto max-w-[85%]" : "bg-card max-w-[85%]"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className="flex-1 space-y-2 pt-1">
        <p className="text-sm font-medium text-foreground/80">
          {isUser ? "Anda" : "AI SAKERNAS"}
        </p>
        <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
        {!isUser && content.length > 0 && ( // Only show copy button for assistant messages with content
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Salin pesan"
          >
            <Copy className="w-3 h-3" />
            Salin
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;