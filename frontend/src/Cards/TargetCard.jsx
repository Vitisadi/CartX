import React, {useState} from 'react';
import '../styles/index.css'; // Import your CSS file
import logo from './logos/target.jpeg';
import './card.css';

const TargetCard = ({ product , addToCart, isInCartPage}) => {

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

  const [isAdded, setIsAdded] = useState(false); // State to track if added to cart

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true); // Update state to indicate product is added
  };

  // If an index with an image link is found, use it as the source
  const imageSource = imageIndex !== null ? product[imageIndex] : '';

  return (

    <div className="card">
    <div className="store-logo">
        <img className="store-logo-img" src={logo} alt="Store Logo" />
    </div>
    <div>
        <img className="product-img" src={imageSource} alt="Product" />
    </div>
    <div className="product-details">
        <h3 className="product-name">{product[0]}</h3>
        <p className="product-price">{product[priceIndex]}</p>
    </div>
   
    <button
        className={`addToCart ${isAdded || isInCartPage ? 'added' : ''}`}
        onClick={handleAddToCart}
        aria-label={isAdded || isInCartPage ? "Added to cart" : "Add to cart"}
    >
        {isAdded || isInCartPage ? '✓' : '+'}
    </button>
   
   </div>
  );
};

export default TargetCard;
