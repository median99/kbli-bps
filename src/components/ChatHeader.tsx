import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClearChat: () => void;
}

const ChatHeader = ({ onClearChat }: ChatHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              AI Agent SAKERNAS
            </h1>
            <p className="text-sm text-muted-foreground">
              Asisten Buku Kode SAKERNAS Agustus 2025
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearChat}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Bersihkan Obrolan
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;