import React, { useState } from "react";
import Body from './components/Body';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ZipCode from './components/ZipCode';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = () => {
    console.log(zipCode);
    console.log(items);

    
  };

  return (
    <div>  
      <Header/>
      <Body/>
      <ItemList items={items} setItems={setItems} />
      <ZipCode zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />
      <SearchBar/>
    </div>
  );
}

export default App;
