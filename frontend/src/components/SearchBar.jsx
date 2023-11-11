import React from 'react';
import { SlMagnifier } from "react-icons/sl";
import "../styles/header.css"

const SearchBar = () => {
    return ( 
        <div className="middle">
            <form className="search-form">
                <span className="magnifying-glass"><SlMagnifier /></span>
                <input type="text" placeholder="Search item..." className="search-bar" />
            </form>
        </div>
    );
}
export default SearchBar;