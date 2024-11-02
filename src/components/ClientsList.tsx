import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

export function ClientsList() {
  const { clients } = useWebSocket();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {clients.map((client) => (
            <li key={client.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 truncate">Client {client.id}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        {client.connected ? '(Connected)' : '(Disconnected)'}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <p>Connected at {new Date(client.connectedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.connected
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.connected ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}