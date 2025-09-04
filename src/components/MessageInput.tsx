import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isConnected: boolean;
}

export const MessageInput = ({ onSendMessage, isConnected }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isConnected ? "Type your message..." : "Connect to start messaging"}
        disabled={!isConnected}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || !isConnected}
        className="px-4"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};