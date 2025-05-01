import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const onLogin = (response) => {
        const userWithToken = { ...response.data, accessToken: response.access_Token };
        setUser(userWithToken);
        
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('access_token', response.access_Token);
    };

    const onLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');  
    };

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
