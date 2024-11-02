export class WSServer {
  private port: number;
  private mockClients: Set<WebSocket>;
  private isRunning: boolean;

  constructor(port: number) {
    this.port = port;
    this.mockClients = new Set();
    this.isRunning = false;
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      this.isRunning = true;
      console.log(`Mock WebSocket server started on port ${this.port}`);
      resolve();
    });
  }

  stop(): void {
    this.isRunning = false;
    this.mockClients.clear();
  }

  broadcast(message: string): void {
    if (!this.isRunning) return;
    
    // Simulate message echo after a short delay
    setTimeout(() => {
      const response = `Server received: ${message}`;
      // Dispatch a custom event that our context can listen to
      window.dispatchEvent(new CustomEvent('ws-message', {
        detail: { message: response, type: 'received' }
      }));
    }, 100);
  }

  getConnectedClients(): number {
    return this.isRunning ? 1 : 0;
  }
}