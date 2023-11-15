import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import "../styles/header.css";

const Cart = () => {
    const navigate = useNavigate();

    const redirectToCart = () => {
        navigate('/cart'); // Replace '/cart' with the path to your Cart page
    };

    return (
        <button className="view-cart" onClick={redirectToCart}>
            <TiShoppingCart size={30} />
        </button>
    );
}

export default Cart;