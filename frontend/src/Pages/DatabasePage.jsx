import React, {useState} from 'react';
import Header from '../components/Header';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '../styles/database.css';
import { FiArrowRight } from 'react-icons/fi'; // Importing an arrow icon from react-icons
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";

function ProductList({ products, storeName, cart, setCart }) {
  const addToCart = (product, store) => {
    setCart(currentCart => [...currentCart, { ...product, store }]);
  };
  
  return (
    <div>
      {products[storeName] && (
        <div>
          {Object.keys(products[storeName]).map(category => (
            <div key={category}>
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className='product-container'>
              {products[storeName][category].map((item, index) => (
                <div key={index}>
                  {storeName === 'target' && <TargetCard product={item} isInCartPage={false} addToCart={() => addToCart(item, "target")} />} 
                  {storeName === 'shoprite' && <ShopRiteCard product={item} isInCartPage={false} addToCart={() => addToCart(item, "shoprite")} />}
                  {storeName === 'cvs' && <CvsCard product={item} isInCartPage={false} addToCart={() => addToCart(item, "cvs")} />}
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      )}
  </div>
  );
}

function Side({ onMenuItemClick }){
    return(
        <div>
            <Sidebar className='sidebar'>
              <p className='sub-heading'>Stores</p>
              <Menu className='menu'
                menuItemStyles={{
                  button: {
                    [`&.active`]: {
                      backgroundColor: '#13395e',
                      color: '#b6c8d9'},
                  },
                }}
              >
                
                <MenuItem className="menu-item" onClick={() => onMenuItemClick('target')}>
                    TARGET <FiArrowRight className='arrow' />
                </MenuItem>
                <MenuItem className="menu-item" onClick={() => onMenuItemClick('shoprite')}>
                    SHOPRITE <FiArrowRight className='arrow' />
                </MenuItem>
                <MenuItem className="menu-item" onClick={() => onMenuItemClick('cvs')}>
                    CVS <FiArrowRight className='arrow' />
                </MenuItem>

              </Menu>
          </Sidebar>;
        </div>
    );
}

function DatabasePage({ cart, setCart }) {

  const [products, setProducts] = useState([]);
  const [currentStore, setCurrentStore] = useState(''); // New state for the store name

  async function fetchStoreData(storeName) {
    fetch("http://localhost:8080/FetchData",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store: storeName,
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
      setProducts(data);
      console.log(`Received data from ${storeName}: `, data);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    })
  }

  const handleMenuItemClick = async (storeName) => {
    setCurrentStore(storeName); // Set the current store's name
    fetchStoreData(storeName);
  };

  return (
    <div className="database-page">
      <Header />
      <div className="content">
        <Side onMenuItemClick={handleMenuItemClick} />

        <div className='products'>
        {<ProductList products={products} storeName={currentStore} cart={cart} setCart={setCart} />}
        </div>

      </div>
    </div>
  );
}
export default DatabasePage;