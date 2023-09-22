import React, { useState } from "react";
import "../styles/index.css";

const SearchBar = () => {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/nearbyStores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Zip Code:
          <input
            type="text"
            name="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
        <input type="submit" value="Zip Code Submit" />
      </form>
    </div>
  );
};

export default SearchBar;
