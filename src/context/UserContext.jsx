import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOption, setUserOption] = useState(''); // состояние для тарифа

  const checkUserAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpire = localStorage.getItem('tokenExpire');
    const now = new Date();
    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
      console.log("Token expired or not found.");
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpire');
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkUserAuth, userOption, setUserOption }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
