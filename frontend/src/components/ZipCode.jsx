import React from "react";
import "../styles/header.css"

const ZipCode = ({ zipCode, setZipCode, handleSubmit }) => {

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (zipCode) {
      handleSubmit();
    }
  };

  return (

    <div className="middle">
      <form className="search-form" onSubmit={handleZipSubmit}>
      <input
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          placeholder="Enter Zip Code"
          className="search-bar"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default ZipCode;