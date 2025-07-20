import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // 🟨 Decodificar token para comprobar expiración
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

    // ✅ Función para iniciar sesión
    const login = async (credentials) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/login", credentials);
            const { jwt, admin, username } = res.data;

            setToken(jwt);

            if (admin) {
                // Admin: ya viene info básica
                setUser({ admin: true, nombre: username });
            } else {
                await fetchUserProfile(jwt); // Usuario normal
            }
        } catch (err) {
            console.error("Error en login:", err);
            throw err;
        }
    };

    // ✅ Obtener perfil de usuario normal
    const fetchUserProfile = async (jwt) => {
        try {
            const res = await axios.get("http://localhost:8080/user/profile", {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            const { nombre } = res.data;
            setUser({ admin: false, nombre });
        } catch (err) {
            console.error("Error al obtener perfil:", err);
            logout();
        }
    };

    // ✅ Cerrar sesión
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
