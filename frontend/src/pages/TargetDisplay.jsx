import React from 'react';
import '../styles/index.css'; // Import your CSS file

const TargetCard = ({ product }) => {
  return (
    <div className="shoprite-card">
      <img src={product[11]} alt={product[0]} className="product-image" />
      <div className="product-details">
        <div className='product-name-box'>
          <h3>{product[0]}</h3>
        </div>

        <div className='product-price-box'>
          <p>Price: {product[5]}</p>
        </div>

        <div className='product-size-box'>
          <p>{product[3]}</p>
        </div>
      </div>
    </div>
  );
};

const TargetCardDisplay = ({ targetData }) => {
  return (
    <div className="shoprite-products">
      {targetData && (
        <div className="shoprite-product-cards">
          {targetData.map((product, index) => (
            <TargetCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TargetCardDisplay;
