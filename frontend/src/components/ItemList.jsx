import React, { useState } from "react";

const ItemList = ({ items, setItems }) => {
  const [currentItem, setCurrentItem] = useState('');

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      setItems([...items, currentItem]);
      setCurrentItem('');
    }
  };

  return (
    <div>
      <form onSubmit={handleItemSubmit}>
        <input
          value={currentItem}
          onChange={e => setCurrentItem(e.target.value)}
          placeholder="Add item"
          className="custom-input"
        />
        
        <button type="submit" className="custom-button">Add to List</button>
      </form>
      
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;