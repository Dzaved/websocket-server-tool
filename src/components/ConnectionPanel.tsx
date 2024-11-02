import React from 'react';
import { Play, StopCircle } from 'lucide-react';
import { useWebSocket } from '../context/WebSocketContext';

export function ConnectionPanel() {
  const { startServer, stopServer, isConnected } = useWebSocket();
  const [port, setPort] = React.useState(8080);
  const [error, setError] = React.useState('');

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (port < 1024 || port > 65535) {
      setError('Port must be between 1024 and 65535');
      return;
    }

    if (!isConnected) {
      await startServer(port);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">WebSocket Server</h2>
        <form onSubmit={handleStart} className="space-y-4">
          <div>
            <label htmlFor="port" className="block text-sm font-medium text-gray-700">
              Port Number
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="port"
                value={port}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setPort(value);
                  }
                }}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="8080"
                min="1024"
                max="65535"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isConnected}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isConnected
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Server
            </button>
            <button
              type="button"
              onClick={stopServer}
              disabled={!isConnected}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !isConnected
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop Server
            </button>
          </div>
        </form>
      </div>

      {isConnected && (
        <div className="bg-green-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-4 w-4 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Server is running
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  WebSocket server is listening on port {port}. Clients can connect
                  using: ws://localhost:{port}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}