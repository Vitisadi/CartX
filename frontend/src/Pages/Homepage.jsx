import React, { useState, useEffect } from "react";
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";
import Header from "../components/Header";
import { useData } from '../Pages/DataHolder';
import AddressPopup from "../components/AddressPopup";
import '../styles/index.css'; 

function App() {
  const [item, setItem] = useState('');
  const { data, handleSetData } = useData(); // Using the useData hook
  const [addressButton, setAddressButton] = useState(false);

  // adds to cart
  const addToCart = (product, store) => {
    setCart(currentCart => [...currentCart, { ...product, store }]);
  };

  // local storage for cart
  const [cart, setCart] = useState(() => {
    // Load cart from local storage or start with an empty array
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function handleSubmit(item){
      console.log("this is the item: ", item);
      // First API call to nearbyStores
      fetch("http://localhost:8080/getData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: item,
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
        handleSetData(data);
        console.log("Data in dataHolder: ", data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
    }

  const cvsData = data && data['cvs'] ? data['cvs'] : [];
  const shopRiteData = data && data['shoprite'] ? data['shoprite'] : [];
  const targetData = data && data['target'] ? data['target'] : [];
  
  return (
    <div>
    <Header item={item} setItem={setItem} onSearchClick={handleSubmit} trigger={addressButton} setTrigger={setAddressButton}/>
    <AddressPopup trigger={addressButton} setTrigger={setAddressButton}/>
  
    {shopRiteData && shopRiteData.length > 0 && (
      <div className="products-container">
        {shopRiteData.map((product, index) => (
          <ShopRiteCard key={index} product={product} isInCartPage={false} addToCart={() => addToCart(product, "shoprite")} />
        ))}
      </div>
    )}
  
    {targetData && targetData.length > 0 && (
      <div className="products-container">
        {targetData.map((product, index) => (
          <TargetCard key={index} product={product} isInCartPage={false} addToCart={() => addToCart(product, "target")} />
        ))}
      </div>
    )}
  
    {cvsData && cvsData.length > 0 && (
      <div className="products-container">
        {cvsData.map((product, index) => (
          <CvsCard key={index} product={product} isInCartPage={false} addToCart={() => addToCart(product, "cvs")} />
        ))}
      </div>
    )}
  </div>
  
  );
}
export default App;