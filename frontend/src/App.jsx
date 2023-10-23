import React, { useState } from "react";
import Header from './components/Header';
import ZipCode from './components/ZipCode';
import ItemList from './components/ItemList';
import Footer from "./components/Footer";
import StoreCard from "./components/StoreCard";

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
        console.log("Received data: ", data);
        setData(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (

      <div>
        <Header />
        <ItemList items={items} setItems={setItems} />
        <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />        

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
      )}
      
  <Footer/>
      </div>
  );
}
export default App;