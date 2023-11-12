import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import { DataProvider } from './Pages/DataHolder';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);