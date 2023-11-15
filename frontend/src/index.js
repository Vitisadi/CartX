import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { DataProvider } from './Pages/DataHolder';
import { StoreDataProvider } from './Pages/StoresHolder'; // Adjust the path as necessary

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DataProvider>
      <StoreDataProvider>
        <App />
      </StoreDataProvider>
    </DataProvider>
  </React.StrictMode>
);