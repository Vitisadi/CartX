import React from "react";
import image from "../styles/search.png"
import "../styles/index.css";

const SearchBar = () => {
  return (
    <div className="container">
      <form action="" className="search-bar">
        <input type="text" placeholder="search item" name="q" />
        <button type="submit">
          <img src={image} alt="Search icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
