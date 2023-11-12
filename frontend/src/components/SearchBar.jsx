import React, { useState } from 'react';
import { SlMagnifier } from "react-icons/sl";
import "../styles/header.css"

const SearchBar = ( {item,setItem} ) => {
    const [currentItem, setCurrentItem] = useState('');

    const handleItemSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Submitted item:", currentItem); // Logs the current input value
        setItem(currentItem); // Set the single item (passed down from App.jsx
    };

    return ( 
        <div className="middle">
            <form className="search-form" onSubmit={handleItemSubmit}>
                <span className="magnifying-glass"><SlMagnifier /></span>
                <input 
                    type="text" 
                    placeholder="Search item..." 
                    className="search-bar" 
                    value={currentItem}
                    onChange={e => setCurrentItem(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;