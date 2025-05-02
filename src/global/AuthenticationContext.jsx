import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
        setIsLoading(false); 
    }, []);

    const onLogin = (response) => {
        const userWithToken = { ...response.user, accessToken: response.access_Token };
        setUser(userWithToken);
        
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('access_token', response.access_Token);
    };

    const onLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
