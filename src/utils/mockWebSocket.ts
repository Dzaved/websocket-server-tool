export class MockWebSocket extends EventTarget {
  private static NORMAL_CLOSURE = 1000;
  private _url: string;
  private _readyState: number = 0;
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  constructor(url: string) {
    super();
    this._url = url;
    this.simulateConnection();
  }

  private simulateConnection() {
    setTimeout(() => {
      this._readyState = MockWebSocket.OPEN;
      this.dispatchEvent(new Event('open'));
    }, 100);
  }

  get readyState() {
    return this._readyState;
  }

  get url() {
    return this._url;
  }

  send(data: string) {
    if (this._readyState !== MockWebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }

    // Simulate echo response
    setTimeout(() => {
      const event = new MessageEvent('message', {
        data: `Echo: ${data}`,
        origin: this._url,
        lastEventId: '',
      });
      this.dispatchEvent(event);
    }, 100);
  }

  close(code: number = MockWebSocket.NORMAL_CLOSURE) {
    if (this._readyState === MockWebSocket.CLOSED) return;
    
    this._readyState = MockWebSocket.CLOSING;
    setTimeout(() => {
      this._readyState = MockWebSocket.CLOSED;
      this.dispatchEvent(new CloseEvent('close', { code }));
    }, 100);
  }
}