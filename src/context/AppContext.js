import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};