import React, { createContext, useState } from "react";
export const LoginContext = createContext();
const Context = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useState(false);

  const ContextData = {
    isLoggedIn,
    setIsLoggedIn,
    cookie,
    setCookie,
  };

  return (
    <LoginContext.Provider value={ContextData}>
      {children}
    </LoginContext.Provider>
  );
};

export default Context;
