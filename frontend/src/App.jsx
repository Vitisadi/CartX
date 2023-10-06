import React, { useState } from "react";
import Body from './components/Body';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ZipCode from './components/ZipCode';
import ItemList from './components/ItemList';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = () => {  
      // First API call to nearbyStores
      fetch("http://localhost:8080/nearbyStores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode }),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data from nearbyStores");
        }
      })
      .then(data1 => {
        console.log("Received data from nearbyStores:", data1);
      
        // Second API call to getData
        return fetch("http://localhost:8080/getData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stores: data1.stores, 
            items: items
          }),  
        });
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data from getData");
        }
      })
      .then(data2 => {
        console.log("Received data from getData:", data2);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div>  
      <Header/>
      <Body/>
      <ItemList items={items} setItems={setItems} />
      <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />
      <SearchBar/>
    </div>
  );
}

export default App;
