import { Badge } from "@/components/ui/badge";

interface ConnectionStatusProps {
  isConnected: boolean;
  targetIP: string;
}

export const ConnectionStatus = ({ isConnected, targetIP }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-online-indicator' : 'bg-offline-indicator'
          }`}
        />
        <Badge variant={isConnected ? "default" : "secondary"}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>
      {targetIP && (
        <span className="text-sm text-muted-foreground">
          Target: {targetIP}
        </span>
      )}
    </div>
  );
};