import React from 'react';
import logo from '../assets/cartx.png';
import "../styles/header.css"
import SearchBar from './SearchBar';
import Cart from './Cart';
import Address from './Address';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ZipCode from './ZipCode';

const Header = ({item,setItem, zipCode, setZipCode, handleSubmit}) => {
    const navigate = useNavigate(); // Create an instance of useNavigate

    const handleLogoClick = () => {
        navigate('/'); // Navigate to /home when the logo is clicked
    };

    return (
        <header className="site-header">
            <div className="left">
                <Menu />
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="header-logo" 
                    onClick={handleLogoClick} // Add onClick event here
                />             
            </div>

            <SearchBar item={item} setItem={setItem}/>
            <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />
        
            <div className="right">
                <Address />
                <Cart />
            </div>
        </header>
    );
}
 
export default Header;