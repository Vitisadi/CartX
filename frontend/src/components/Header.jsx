import React from 'react';
import logo from '../assets/cartx.png';
import "../styles/header.css"

const Header = () => {
    return (
        <header className="site-header">
            <div class="logo-container">
                <img src={logo} alt="Logo" className="header-logo" />
            </div>
            <div className="search-container">
                <form className="search-form">
                    <span className="search-icon">&#x1F50D;</span>
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button type="submit" className="search-button">+</button>
                </form>
            </div>
            <div class="address-container">

            </div>
        </header>
    );
}
 
export default Header;