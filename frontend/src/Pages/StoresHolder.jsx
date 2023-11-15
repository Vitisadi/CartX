import React, { createContext, useState, useContext } from 'react';

const StoreDataContext = createContext();

export const useStoreData = () => useContext(StoreDataContext);

export const StoreDataProvider = ({ children }) => {
  const [storeData, setStoreData] = useState(null);

  return (
    <StoreDataContext.Provider value={{ storeData, setStoreData }}>
      {children}
    </StoreDataContext.Provider>
  );
};