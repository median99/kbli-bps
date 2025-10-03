import ChatInput from "@/components/ChatInput";
import ChatHeader from "@/components/ChatHeader";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatMessagesArea from "@/components/ChatMessagesArea";
import { useSakernasChat } from "@/hooks/useSakernasChat";

const Index = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useSakernasChat();

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onClearChat={clearMessages} />

      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen onSendMessage={sendMessage} isLoading={isLoading} />
        ) : (
          <ChatMessagesArea messages={messages} isLoading={isLoading} />
        )}
      </main>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;