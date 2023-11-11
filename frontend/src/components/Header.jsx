import React from 'react';
import logo from '../assets/cartx.png';
import "../styles/header.css"
import SearchBar from './SearchBar';
import Cart from './Cart';
import Address from './Address';
import Menu from './Menu';

const Header = () => {
    return (
        <header className="site-header">
            <div className="left">
                <Menu />
                <img src={logo} alt="Logo" className="header-logo" />             
            </div>

            <SearchBar />
        
            <div className="right">
                <Address />
                <Cart />
            </div>

        </header>
    );
}
 
export default Header;