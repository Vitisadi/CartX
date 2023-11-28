import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('address');
    if (storedData)
      setData(JSON.parse(storedData));

  }, []);

  const handleSetData = (newData) => {
    setData(newData);

    localStorage.setItem('address', JSON.stringify(newData));
  };

  return (
    <DataContext.Provider value={{ data, handleSetData }}>
      {children}
    </DataContext.Provider>
  );
};