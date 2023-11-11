import React, { useState } from "react";
import ZipCode from './components/ZipCode';
import ItemList from './components/ItemList';
import ShopRiteDisplay from "./pages/ShopRiteDisplay";
import TargetCardDisplay from "./pages/TargetDisplay";
import CvsDisplay from "./pages/CvsDisplay";

function App() {
  const [zipCode, setZipCode] = useState('');
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);

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
  const cvsData = data ?  data["cvs"] : null;

  return (

      <div>
        <br></br>
        <ItemList items={items} setItems={setItems} />
        <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />        

        {shopriteData &&  <ShopRiteDisplay shopriteData={shopriteData} />}
        {targetData && <TargetCardDisplay targetData={targetData} />}
        {cvsData && <CvsDisplay cvsData={cvsData} />}
      
      </div> 
  );
}
export default App;