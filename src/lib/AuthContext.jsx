import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function AuthProvider({ children }) {
    const [ token, setToken ] = useState(null);

    const login = (newToken) => {
        setToken(newToken)
    };

    const logout = () => {
        setToken(null)
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext)
}