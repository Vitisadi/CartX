import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const shopriteCart = cart.filter(item => item.store === 'shoprite');
    const targetCart = cart.filter(item => item.store === 'target');
    const cvsCart = cart.filter(item => item.store === 'cvs');

    const clearCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([])); // Clear the cart in localStorage as well
    };    

    return (
        <div>
            <Header />
            <h1>Your Cart</h1>
            <button onClick={clearCart}>Clear Cart</button> {/* Add this button */}

            {shopriteCart.length > 0 && (
                <div>
                    <h2>ShopRite</h2>
                    <div className="products-container">
                        {shopriteCart.map((cartItem, index) => (
                            <ShopRiteCard key={index} product={cartItem} />
                        ))}
                    </div>
                </div>
            )}

            {targetCart.length > 0 && (
                <div>
                    <h2>Target</h2>
                    <div className="products-container">
                        {targetCart.map((cartItem, index) => (
                            <TargetCard key={index} product={cartItem} />
                        ))}
                    </div>
                </div>
            )}

            {cvsCart.length > 0 && (
                <div>
                    <h2>CVS</h2>
                    <div className="products-container">
                        {cvsCart.map((cartItem, index) => (
                            <CvsCard key={index} product={cartItem} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;