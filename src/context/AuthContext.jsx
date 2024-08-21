import React, { createContext, useState, useContext } from 'react';



const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return !!localStorage.getItem('authToken')
    });
    console.log(user)
    const login = (token) => {
        localStorage.setItem('authToken', token)
        setUser(true)
    };


    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);