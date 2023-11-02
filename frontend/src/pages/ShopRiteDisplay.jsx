import React from 'react';
import '../styles/index.css'; // Import your CSS file

const ShopRiteCard = ({ product }) => {
  return (
    <div className="shoprite-card">

      <img src={product[4]} alt={product[0]} className="product-image" />
      <div className="product-details">

        <div className='product-name-box'>
          <h3>{product[0]}</h3>
        </div>

        <div className='product-price-box'>
          <p>Price: {product[2]}</p>
        </div>
        
        <div className='product-size-box'>
          <p>{product[3]}</p>
        </div>
        
      </div>
    </div>
  );
};

const ShopRiteDisplay = ({ shopriteData }) => {
  return (
    <div className="shoprite-products">
      {shopriteData && (
        <>
          <div className="shoprite-product-cards">
            {shopriteData.map((product, index) => (
              <ShopRiteCard key={index} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopRiteDisplay;
