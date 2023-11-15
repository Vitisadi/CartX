import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Compare from './Pages/Compare';
import Database from './Pages/Database';
import Error from './Pages/Error';
import CartPage from './Pages/CartPage';
import StoresPage from './Pages/StoresPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/database" element={<Database />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;