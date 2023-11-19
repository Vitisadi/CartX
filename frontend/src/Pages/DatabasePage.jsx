import React, {useState} from 'react';
import Header from '../components/Header';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '../styles/database.css';
import { FiArrowRight } from 'react-icons/fi'; // Importing an arrow icon from react-icons
import ShopRiteCard from "../Cards/ShopRiteCard";
import TargetCard from "../Cards/TargetCard";
import CvsCard from "../Cards/CvsCard";

function ProductList({ products, storeName }) {
  if (!products.length) 
    return <div className="product-list">Select a store to view products</div>;

  const renderProductCard = (product) => {
    switch (storeName.toLowerCase()) {
      case 'target':
        return <TargetCard product={product} />;
      case 'shoprite':
        return <ShopRiteCard product={product} />;
      case 'cvs':
        return <CvsCard product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="product-item">
          {renderProductCard(product)}
        </div>
      ))}
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

function DatabasePage() {

  const [products, setProducts] = useState([]);
  const [currentStore, setCurrentStore] = useState(''); // New state for the store name

 const handleMenuItemClick = async (storeName) => {
    console.log('Loading products for store:', storeName);
    setCurrentStore(storeName); // Set the current store's name

    try {
        const data = 
        [[
          "Fuji Apples - 3lb Bag - Good & Gather™",
          "Good & Gather",
          "Only at",
          " target",
          "¬",
          "4.3 out of 5 stars with 1065 ratings",
          "1065",
          "SNAP EBT eligible",
          "$4.99 ($0.10/ounce)",
          "at Latham",
          "Shipping not available",
          "Not available at Latham",
          "Check stores"
        ],
        [
          "Organic Gala Apples - 2lb Bag - Good & Gather™",
          "Good & Gather",
          "Only at",
          " target",
          "¬",
          "4.2 out of 5 stars with 561 ratings",
          "561",
          "SNAP EBT eligible",
          "$3.49 ($0.11/ounce)",
          "at Latham",
          "Get it as soon as 2pm today with Shipt",
          "Ready within 2 hours with pickup",
          "Deliver it"
        ]]

        setProducts(data);
        console.log('Products loaded:', data);
      
    } catch (error) {
        console.log('Error:', error.message);
    }
};

    return (
      <div className="database-page">
        <Header />
        <div className="content">
          <Side onMenuItemClick={handleMenuItemClick} />
          <ProductList products={products} storeName={currentStore} />
        </div>
      </div>
    );
}
export default DatabasePage;