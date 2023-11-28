import React from 'react';
import logo from '../assets/cartx.png';
import "../styles/header.css"
import SearchBar from './SearchBar';
import Cart from './Cart';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate;
import {TiLocation} from "react-icons/ti";
import Database from './Database';

const Header = ({item,setItem, onSearchClick, trigger, setTrigger}) => {
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

            <SearchBar item={item} setItem={setItem} getClick={onSearchClick}/>
        
            <div className="right">
                <button className="input-address" onClick={()=>setTrigger(true)}>
                    <TiLocation size={30} />
                </button>
                <Database size={30}/>
                <Cart />
            </div>
        </header>
    );
}
 
export default Header;