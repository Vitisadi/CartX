import React, { useState } from "react";
import Header from './components/Header';
import ZipCode from './components/ZipCode';
import ItemList from './components/ItemList';
// import Footer from "./components/Footer";
import ShopRiteDisplay from "./pages/ShopRiteDisplay";
import TargetCardDisplay from "./pages/TargetDisplay";

import AddressPopup from "./components/AddressPopup";

import './styles/index.css'; 

function App() {
  const [zipCode, setZipCode] = useState('');
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [addressButton, setAddressButton] = useState(false);

  const handleSubmit = () => {  
      // First API call to nearbyStores
      fetch("http://localhost:8080/getData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          userAddress: zipCode
        }), 
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to gather data");
        }
      })
      .then(data => {
        console.log("Received data from stores: ", data);
        setData(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // filters the shop rite data
  const shopriteData = data ? data["shoprite"] : null;
  const targetData = data ? data["target"] : null;

  return (

      <div>
        <Header trigger={addressButton} setTrigger={setAddressButton}/>
        <br></br>
        <ItemList items={items} setItems={setItems} />
        <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />        

        {shopriteData &&  <ShopRiteDisplay shopriteData={shopriteData} />}
        {targetData && <TargetCardDisplay targetData={targetData} />}

        {/* address popup */}
        <AddressPopup trigger={addressButton} setTrigger={setAddressButton}/>
      
      {/* 
        {data && (
        <div>
          <ul>
            {Object.entries(data).map(([storeName, storeData], storeIndex) => (
              <li key={storeName}>
                <StoreCard storeName={storeName} storeData={storeData} />
              </li>
            ))}
          </ul>
        </div>
        )} */}
      </div> 
  );
}
export default App;



      