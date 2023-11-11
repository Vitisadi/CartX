import React from 'react';
import {TiLocation} from "react-icons/ti";
import "../styles/header.css"

const Address = () => {
    return ( 
        <button className="input-address">
            <TiLocation size={30} />
        </button>
    );
}
 
export default Address;