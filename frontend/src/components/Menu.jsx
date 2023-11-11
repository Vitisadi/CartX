import React from 'react';
import { SlMenu } from "react-icons/sl";
import "../styles/header.css"

const Menu = () => {
    return ( 
        <button className="hamburger-button">
            <SlMenu />
        </button>
     );
}
 
export default Menu;