import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                logout(); // Token expirado
            } else {
                localStorage.setItem("token", token);
                // Si ya hay user cargado, no lo vuelvas a pedir
                if (!user) {
                    if (decoded?.sub === 'admin@berriondo.com') {
                        // Ya es admin, y lo manejamos desde login
                        return;
                    } else {
                        fetchUserProfile(token);
                    }
                }
            }
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    const login = async (credentials) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/login", credentials);
            const { jwt, admin } = res.data;

            setToken(jwt);

            setUser({ admin });

            await fetchUserProfile(jwt);

        } catch (err) {
            console.error("Error en login:", err);
            throw err;
        }
    };


    const fetchUserProfile = async (jwt) => {
        try {
            const res = await axios.get("http://localhost:8080/users/profile", {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            setUser(prev => ({
                ...prev,
                ...res.data
            }));

        } catch (err) {
            console.error("Error al obtener perfil:", err);
            logout();
        }
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
