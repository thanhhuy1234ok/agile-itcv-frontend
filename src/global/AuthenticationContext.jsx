import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  
    const [isLoading, setIsLoading] = useState(true);

    // useEffect chỉ chạy một lần khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('access_token');
        
        if (storedUser && storedAccessToken) {
            const user = JSON.parse(storedUser);
            setUser({ ...user, accessToken: storedAccessToken });
        } else {
            setUser(null);  
        }
        
        setIsLoading(false);  
    }, []);

    const onLogin = (response) => {
        const userWithToken = { ...response.user, accessToken: response.access_Token };
        setUser(userWithToken);
        
        // Lưu vào localStorage cả user và token
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('access_token', response.access_Token);
    };

    const onLogout = () => {
        setUser(null); 
        localStorage.removeItem('user'); 
        localStorage.removeItem('access_token'); 
    };

    return (
        <AuthContext.Provider value={{
            user,
            onLogin,
            onLogout,
            isAuthenticated: !!user, 
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
