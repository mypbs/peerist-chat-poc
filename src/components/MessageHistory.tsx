import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
}

interface MessageHistoryProps {
  messages: Message[];
}

export const MessageHistory = ({ messages }: MessageHistoryProps) => {
  return (
    <ScrollArea className="h-96 w-full rounded-lg border p-4">
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isSent
                    ? 'bg-message-sent text-foreground'
                    : 'bg-message-received text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};