import React, { useRef, useEffect, useState } from 'react';
// import { DataProvider, useData } from '../Pages/DataHolder';
import "../styles/address.css"
import {TiTimes} from "react-icons/ti";
import { SlMagnifier} from "react-icons/sl";

function AddressPopup(props) {
    const body = document.querySelector('body');
    const inputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [enteredAddress, setEnteredAddress] = useState('');

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const bing_key = process.env.REACT_APP_BING_KEY;
        console.log(bing_key)

        if (query.length > 0) {
        let response;
        try{
            response = await fetch(`https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=${bing_key}&maxResults=4`);
            if (!response.ok)
                throw new Error(`Network response was not ok (${response.status})`);
        

        const suggestion = await response.json();

        let allSuggestions= suggestion.resourceSets[0].resources[0].value;
        let addresses = []
        for (let i = 0; i < allSuggestions.length; i++){
            addresses.push(allSuggestions[i].address.formattedAddress);
        }

        setSuggestions(addresses);
        } catch(e){
            console.log('Error:', e);
        }
        
        
        } else {
        setSuggestions([]); // Clear suggestions if the search query is empty
        }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Populate the input with selected suggestion
    setSuggestions([]); // Clear suggestions
  };
  
  const handleAddressSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setEnteredAddress(enteredAddress); // Set the single item (passed down from App.jsx
    console.log("Submitted address:", enteredAddress); // Logs the current input value
    };

    const buttonClick = () => {
        if (searchQuery) {
          setSearchQuery('');
          inputRef.current.focus();
        } else {
          inputRef.current.focus();
        }
      };
    useEffect(() => {
        if (props.trigger){
            body.style.overflow = 'hidden';
            inputRef.current.focus();
        }
        else{
            body.style.overflow = '';
        }
    }); 
    return (
        <div className={`overlay ${props.trigger ? 'show' : ''}`}>
            <div className={`address-popup ${props.trigger ? 'show' : ''}`}>
                <div className="top">
                    <button className="close-address" onClick={() => props.setTrigger(false)}>
                    <TiTimes size={30} color="rgb(101, 101, 101)"/>
                    
                    </button>
                {props.children}   
                
                <h1 className="header">Choose Address</h1>
                </div>
                <form onSubmit={handleAddressSubmit}>
                <div className="search-container">
                    <input ref={inputRef} 
                        type="text" 
                        placeholder="Search for an address..." 
                        className="address-search"
                        value={searchQuery}
                        onChange={handleInputChange}/>


                    <button onClick={buttonClick} className="search-button">
                        {searchQuery ? <TiTimes size ={20}/> : <SlMagnifier/>}
                    </button>  
                </div>
                </form>
                
                
                <div className="suggestions-container">
                {searchQuery.length > 3 &&
                    <div className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion_line"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                            {suggestion}
                            </div>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddressPopup;