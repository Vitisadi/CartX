import React, { useState, useEffect } from "react";
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";
import Header from "../components/Header";
import { useData } from '../Pages/DataHolder';
import AddressPopup from "../components/AddressPopup";
import '../styles/index.css';

function App() {
  const [zipCode, setZipCode] = useState('');
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
    }
  

  return (
      <div>
        <Header item={item} setItem={setItem} trigger={addressButton} setTrigger={setAddressButton}/>
        <AddressPopup trigger={addressButton} setTrigger={setAddressButton}/>

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

  //     // gets the nearby stores
  //     fetch("http://localhost:8080/test", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         item: item,
  //         userAddress: zipCode
  //       }), 
  //     })
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("Failed to gather data");
  //       }
  //     })
  //     .then(stores_data => {
  //       console.log("NearBy Stores: ", stores_data);
  //       setStoreData(stores_data);
  //     })
  //     .catch(error => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // };