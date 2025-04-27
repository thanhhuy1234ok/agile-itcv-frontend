"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
  }, []);

  const onLogin = (response) => {
    try {
      const userWithToken = {
        ...response.data,
        accessToken: response.access_Token,
      };
      setUser(userWithToken);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("access_token", response.access_Token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, onLogin, onLogout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
