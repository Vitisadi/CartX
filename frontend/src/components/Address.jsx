import React from 'react';
import {TiLocation} from "react-icons/ti";
import "../styles/header.css"
import { useNavigate } from 'react-router';

const Address = ({data}) => {
    const navigate = useNavigate();
    // console.log(data);

    const redirectToCart = () => {
        navigate('/stores' , {state: {data}}); // Replace '/cart' with the path to your Cart page
    };

    return ( 
        <button className="input-address" onClick={redirectToCart}>
            <TiLocation size={30} />
        </button>
    );
}
 
export default Address;