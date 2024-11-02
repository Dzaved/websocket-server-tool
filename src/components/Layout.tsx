import React from 'react';
import { Layers, Send, Users, History } from 'lucide-react';
import { ConnectionPanel } from './ConnectionPanel';
import { ClientsList } from './ClientsList';
import { MessagePanel } from './MessagePanel';
import { LogPanel } from './LogPanel';
import { useWebSocket } from '../context/WebSocketContext';

export function Layout() {
  const [activeTab, setActiveTab] = React.useState('connections');
  const { isConnected } = useWebSocket();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Layers className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">WebSocket Testing Tool</h1>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-red-600">Disconnected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('connections')}
                className={`${
                  activeTab === 'connections'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Layers className="h-5 w-5 mr-2" />
                Connections
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`${
                  activeTab === 'clients'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Users className="h-5 w-5 mr-2" />
                Clients
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`${
                  activeTab === 'messages'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Send className="h-5 w-5 mr-2" />
                Messages
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`${
                  activeTab === 'logs'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <History className="h-5 w-5 mr-2" />
                Logs
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'connections' && <ConnectionPanel />}
            {activeTab === 'clients' && <ClientsList />}
            {activeTab === 'messages' && <MessagePanel />}
            {activeTab === 'logs' && <LogPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}