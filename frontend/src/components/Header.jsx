import React from 'react';
import logo from '../assets/cartx.png';
import "../styles/header.css"
import SearchBar from './SearchBar';
import Cart from './Cart';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate;
import {TiLocation} from "react-icons/ti";
import Database from './Database';

const Header = ({item,setItem, onSearchClick, trigger, setTrigger, address}) => {
    const navigate = useNavigate(); // Create an instance of useNavigate
    
    let split_address = address.split(' ');

    let zipcode = split_address[split_address.length - 1];

    if (isNaN(zipcode)){
        split_address = address.split(',');
        zipcode = split_address[split_address.length - 1];
    }
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

            <SearchBar item={item} setItem={setItem} getClick={onSearchClick}/>
        
            <div className="right">
                <div className="address-container">
                    <div className="address-text">
                        {zipcode}
                    </div>
                    <button className="input-address" onClick={()=>setTrigger(true)}>
                        <TiLocation size={30} />
                    </button>
                </div>
                
                <Database size={30}/>
                <Cart />
            </div>
        </header>
    );
}
 
export default Header;