// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContexte = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };
  const updateUserRole = (newRole) => {
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  return (
    <AuthContexte.Provider value={{ user, login, logout, updateUserRole }}>
      {children}
    </AuthContexte.Provider>
  );
};

export const useAuth = () => useContext(AuthContexte);
