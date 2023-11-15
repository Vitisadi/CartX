import React, { useRef, useEffect, useState } from 'react';
import "../styles/address.css"
import {TiTimes} from "react-icons/ti";
import { SlMagnifier} from "react-icons/sl";
// import  PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


function AddressPopup(props) {
    const body = document.querySelector('body');
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    const buttonClick = () => {
        if (searchText) {
          setSearchText('');
          inputRef.current.focus();
        } else {
          inputRef.current.focus();
        }
      };

    const handleInputChange = (event) =>{
        setSearchText(event.target.value);
    };


    // const handleSelect = async (selectedAddress) =>{
    //     try{
    //         const results = await geocodeByAddress(selectedAddress);
    //         const latLng = await getLatLng(results[0]);
    //         console.log('Selected Address:', selectedAddress);
    //         console.log('Latitude and Longitude:', latLng);
    //         // You can use the selected address or coordinates in your application logic.
    //     } catch (error) {
    //         console.error('Error selecting address:', error);
    //     }
    // };
        

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

                <div className="search-container">
                    {/* <PlacesAutocomplete
                        value={searchText}
                        onChange={handleInputChange}
                        onSelect={handleSelect}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input ref={inputRef} 
                           type="text" 
                           placeholder="Search..." 
                           className="address-search"
                           value={searchText}
                           onChange={handleInputChange}/>   
                        </div>
                        
                    
                    
                    
                    )}
                    
                    </PlacesAutocomplete> */}

                    <button onClick={buttonClick} className="search-button">
                        {searchText ? <TiTimes size ={20}/> : <SlMagnifier/>}
                    </button>
                </div>
                

            </div>
            

        </div>
    );
};

export default AddressPopup;