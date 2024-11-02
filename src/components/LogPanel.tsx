import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

export function LogPanel() {
  const { logs } = useWebSocket();
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">System Logs</h2>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Export Logs
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 h-[500px] overflow-y-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`mb-2 ${
              log.type === 'error'
                ? 'text-red-400'
                : log.type === 'success'
                ? 'text-green-400'
                : 'text-gray-300'
            }`}
          >
            <span className="text-gray-500">[{new Date(log.timestamp).toISOString()}]</span>{' '}
            {log.message}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}