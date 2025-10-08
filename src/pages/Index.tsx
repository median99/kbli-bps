import { useEffect, useRef } from "react";
import { FileText, Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useSakernasChat } from "@/hooks/useSakernasChat";

const Index = () => {
  const { messages, isLoading, sendMessage } = useSakernasChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
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
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-foreground">
                  Selamat Datang!
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Tanya saya tentang Klasifikasi Baku Lapangan Usaha Indonesia (KBLI), 
                  Klasifikasi Baku Jenis Pekerjaan Indonesia (KBJI), atau kode-kode SAKERNAS lainnya.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-8">
                <button
                  onClick={() => sendMessage("Apa itu KBLI 2020?")}
                  className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                  disabled={isLoading}
                >
                  <p className="font-medium text-sm text-foreground">
                    Apa itu KBLI 2020?
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("Jelaskan kode industri pengolahan")}
                  className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                  disabled={isLoading}
                >
                  <p className="font-medium text-sm text-foreground">
                    Jelaskan kode industri pengolahan
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("Apa saja kategori KBJI 2014?")}
                  className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                  disabled={isLoading}
                >
                  <p className="font-medium text-sm text-foreground">
                    Apa saja kategori KBJI 2014?
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("Cari kode untuk perdagangan eceran")}
                  className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                  disabled={isLoading}
                >
                  <p className="font-medium text-sm text-foreground">
                    Cari kode untuk perdagangan eceran
                  </p>
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </main>

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
