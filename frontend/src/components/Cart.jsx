import React from 'react';
import {TiShoppingCart} from "react-icons/ti";
import "../styles/header.css"

const Cart = () => {
    return ( 
        <button className="view-cart">
            <TiShoppingCart size={30}/>
        </button>
    );
}
export default Cart;