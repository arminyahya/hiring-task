import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext({
    isWalletConnected: false,
    setWalletConnect: (input: boolean) => {}
});

export const AppProvider = ({ children }: { children: React.ReactNode}) => {
    const [isWalletConnected, setWalletConnect] = useState(false);
    return (
        <AppContext.Provider value={{ isWalletConnected, setWalletConnect }}>
            {children}
        </AppContext.Provider>
    );
};