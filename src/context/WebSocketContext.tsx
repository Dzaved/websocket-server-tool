import React from 'react';
import { WSServer } from '../server/WebSocketServer';

interface Client {
  id: string;
  connected: boolean;
  connectedAt: number;
}

interface Message {
  type: 'sent' | 'received';
  content: string;
  timestamp: number;
}

interface Log {
  type: 'info' | 'error' | 'success';
  message: string;
  timestamp: number;
}

interface WebSocketContextType {
  isConnected: boolean;
  clients: Client[];
  messages: Message[];
  logs: Log[];
  startServer: (port: number) => Promise<void>;
  stopServer: () => void;
  broadcast: (message: string) => void;
}

const WebSocketContext = React.createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [server, setServer] = React.useState<WSServer | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [logs, setLogs] = React.useState<Log[]>([]);

  React.useEffect(() => {
    const handleMessage = (event: CustomEvent) => {
      const { message, type } = event.detail;
      setMessages(prev => [...prev, {
        type,
        content: message,
        timestamp: Date.now()
      }]);
    };

    window.addEventListener('ws-message' as any, handleMessage);
    return () => window.removeEventListener('ws-message' as any, handleMessage);
  }, []);

  const addLog = (message: string, type: Log['type'] = 'info') => {
    setLogs((prev) => [...prev, { message, type, timestamp: Date.now() }]);
  };

  const startServer = async (port: number) => {
    try {
      if (port < 1024 || port > 65535) {
        throw new Error('Port must be between 1024 and 65535');
      }
      
      const wsServer = new WSServer(port);
      await wsServer.start();
      
      setServer(wsServer);
      setIsConnected(true);
      addLog(`WebSocket server started on port ${port}`, 'success');
      
      setClients([{
        id: 'server',
        connected: true,
        connectedAt: Date.now()
      }]);
    } catch (error) {
      addLog(`Failed to start server: ${error}`, 'error');
    }
  };

  const stopServer = () => {
    if (server) {
      server.stop();
      setServer(null);
      setIsConnected(false);
      setClients([]);
      addLog('WebSocket server stopped', 'info');
    }
  };

  const broadcast = (message: string) => {
    if (server && isConnected) {
      server.broadcast(message);
      setMessages((prev) => [
        ...prev,
        { type: 'sent', content: message, timestamp: Date.now() }
      ]);
      addLog(`Broadcast message: ${message}`);
    } else {
      addLog('Cannot broadcast: Server is not running', 'error');
    }
  };

  const value = {
    isConnected,
    clients,
    messages,
    logs,
    startServer,
    stopServer,
    broadcast
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = React.useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}