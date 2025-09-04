import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { MessageHistory } from "@/components/MessageHistory";
import { MessageInput } from "@/components/MessageInput";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
}

const Index = () => {
  const [targetIP, setTargetIP] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!targetIP.trim()) {
      toast({
        title: "Invalid IP",
        description: "Please enter a valid IP address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate connection for demo purposes
    setIsConnected(true);
    toast({
      title: "Connected",
      description: `Connected to ${targetIP}`,
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Connection closed",
    });
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date(),
      isSent: true,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate receiving a reply (for demo purposes)
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Echo: ${messageText}`,
        timestamp: new Date(),
        isSent: false,
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Peerist App</h1>
          <p className="text-muted-foreground">Simple peer-to-peer messaging</p>
        </div>

        {/* Connection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConnected ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
              Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter target IP address (e.g., 192.168.1.100)"
                value={targetIP}
                onChange={(e) => setTargetIP(e.target.value)}
                disabled={isConnected}
                className="flex-1"
              />
              <Button 
                onClick={isConnected ? handleDisconnect : handleConnect}
                variant={isConnected ? "destructive" : "default"}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>
            <ConnectionStatus isConnected={isConnected} targetIP={targetIP} />
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MessageHistory messages={messages} />
            <MessageInput 
              onSendMessage={handleSendMessage} 
              isConnected={isConnected} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;