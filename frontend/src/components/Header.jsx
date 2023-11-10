import React from 'react';
import logo from '../assets/cartx.png';
import { SlMagnifier, SlMenu } from "react-icons/sl";
import {TiShoppingCart, TiLocation} from "react-icons/ti";
import "../styles/header.css"

const Header = () => {
    return (
        <header className="site-header">
            <div class="left">
                <button className="hamburger-button">
                    <SlMenu />
                </button>
                <img src={logo} alt="Logo" className="header-logo" />             
            </div>
            <div className="middle">
                <form className="search-form">
                    <span className="magnifying-glass"><SlMagnifier /></span>
                    <input type="text" placeholder="Search..." className="search-bar" />
                </form>

            </div>
            <div class="right">
                <button className="input-address">
                    <TiLocation size={30} />
                </button>
                <button className="view-cart">
                    <TiShoppingCart size={30}/>
                </button>
            </div>
        </header>
    );
}
 
export default Header;