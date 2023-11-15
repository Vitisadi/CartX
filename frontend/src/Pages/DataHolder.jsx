import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const handleSetData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, handleSetData }}>
      {children}
    </DataContext.Provider>
  );
};