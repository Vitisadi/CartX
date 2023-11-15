import React from 'react';
import '../styles/index.css'; // Import your CSS file
import logo from './logos/target.jpeg';

const TargetCard = ({ product , addToCart }) => {

  let imageIndex = null;
  let priceIndex = null;

  // Check indices 10 through 14 to find the index with the image link
  for (let i = 1; i <= 20; i++) {
    if (product[i] && product[i].startsWith('http')) {
      imageIndex = i;
      break;
    }
  }

  for (let i = 1; i < 10; i++){
    if (product[i].includes('$')) {
      priceIndex = i;
      break;
    }
  }

  // If an index with an image link is found, use it as the source
  const imageSource = imageIndex !== null ? product[imageIndex] : '';

  return (

    <div className="product-card">
      <div className="logo">
        <img src={logo} alt="Store Logo" />
      </div>
      <div className="product-image">
        <img src={imageSource} alt="Product" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product[0]}</h3>
        <p className="price">{product[priceIndex]}</p>
        {/* <p className="size">{product[3]}</p> */}
      </div>
      <div className="add-to-cart">
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default TargetCard;
