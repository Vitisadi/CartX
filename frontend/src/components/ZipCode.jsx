import React from "react";

const ZipCode = ({ zipCode, setZipCode, handleSubmit }) => {

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (zipCode) {
      handleSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleZipSubmit}>
        <input
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          placeholder="Enter Zip Code"
          className="custom-input"
        />
        <button type="submit" className="custom-button">Submit</button>
      </form>
    </div>
  );
};

export default ZipCode;