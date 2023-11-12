import React, { useState, useEffect } from "react";
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";
import Header from "../components/Header";
import { useData } from '../Pages/DataHolder';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [item, setItem] = useState('');
  const { data, handleSetData } = useData(); // Using the useData hook

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

  const handleSubmit = () => {

      // First API call to nearbyStores
      fetch("http://localhost:8080/getData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: item,
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
        handleSetData(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
      <div>
        <Header item={item} setItem={setItem} zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit}/>

        {/* loop through the recieved data and print the cards */}

        { data && Object.keys(data).map((store) => (
        <div key={store} className="products-container">
          {data[store].map((product, index) => (
            <React.Fragment key={index}>
              {store === "shoprite" && <ShopRiteCard product={product} addToCart={() => addToCart(product, "shoprite")} />}
              {store === "target" && <TargetCard product={product} addToCart={() => addToCart(product, "target")} />}
              {store === "cvs" && <CvsCard product={product} addToCart={() => addToCart(product, "cvs")} />}
            </React.Fragment>
          ))}
        </div>
      ))
    }
      </div> 
  );
}
export default App;