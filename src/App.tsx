import React from 'react';
import { Layout } from './components/Layout';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
  return (
    <WebSocketProvider>
      <Layout />
    </WebSocketProvider>
  );
}

export default App;