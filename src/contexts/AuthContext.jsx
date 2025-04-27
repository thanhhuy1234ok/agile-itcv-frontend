"use client";

import { createContext, useState, useEffect } from "react";
import { authAPI } from "@/services/job-api";
import { useNavigate } from "react-router-dom";
import {
  handleLogin,
  handleRegister,
  handleLogout,
  handleUpdateProfile,
} from "./AuthContextUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return handleLogin(setLoading, setError, setUser, navigate, authAPI, {
      email,
      password,
    });
  };

  const register = async (name, email, password) => {
    return handleRegister(setLoading, setError, setUser, navigate, authAPI, {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    handleLogout(setUser, navigate);
  };

  const updateProfile = async (userData) => {
    return handleUpdateProfile(
      setLoading,
      setError,
      user,
      setUser,
      authAPI,
      userData
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
