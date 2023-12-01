import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Compare from './Pages/Compare';
import DatabasePage from './Pages/DatabasePage';
import Error from './Pages/Error';
import CartPage from './Pages/CartPage';

function App() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [address, setAddress] = useState(() => {
        const savedCart = localStorage.getItem('address');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('address', JSON.stringify(address));
    }, [address]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage cart={cart} setCart={setCart} address={address} setAddress={setAddress}/>} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/database" element={<DatabasePage cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;