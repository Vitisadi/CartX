const StoreCard = ({ storeName, storeData }) => {
    return (
      <div className="store-card">
        <p>Store Name: {storeName}</p>
        {storeData.map((product, productIndex) => (
          <div key={productIndex} className="product-card">
            <strong>Product:</strong> {product[0]}<br />
            <strong>Rating:</strong> {product[2]}<br />
            <strong>Price:</strong> {product[5]}<br />
            <br/>
          </div>
        ))}
      </div>
    );
  };

export default StoreCard;