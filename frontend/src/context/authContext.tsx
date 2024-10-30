import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log(isAuthenticated);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};