import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Call your backend API to validate the user
    // Example: const response = await api.login(email, password);
    setUser({ email }); // Simulated login response
  };

  const logout = () => setUser(null);

  const signup = async (email, password) => {
    // Call your backend API for signup
    // Example: const response = await api.signup(email, password);
    setUser({ email }); // Simulated signup response
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
