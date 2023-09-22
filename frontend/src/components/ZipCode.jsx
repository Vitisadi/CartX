import React, { useState } from "react";
import "../styles/index.css";

const SearchBar = () => {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // First API call to nearbyStores
    fetch("http://localhost:8080/nearbyStores", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zipCode }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data from nearbyStores");
      }
    })
    .then(data1 => {
      console.log("Received data from nearbyStores:", data1);
    
      // Second API call to getData
      return fetch("http://localhost:8080/getData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stores: data1.stores }),  
      });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data from getData");
      }
    })
    .then(data2 => {
      console.log("Received data from getData:", data2);
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
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
