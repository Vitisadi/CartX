import React from 'react';
import '../styles/index.css'; // Import your CSS file

const CvsCard = ({ product }) => {
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
          <p>CVS</p>
        </div>
        
      </div>
    </div>
  );
};

const CvsDisplay = ({ cvsData }) => {
  return (
    <div className="shoprite-products">
      {cvsData && (
        <>
          <div className="shoprite-product-cards">
            {cvsData.map((product, index) => (
              <CvsCard key={index} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CvsDisplay;
