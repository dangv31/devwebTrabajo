import React, { useContext, useState, useRef, useEffect } from 'react'; // 1. IMPORTAR useRef y useEffect
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
    const { user, logout, setShowSearch, getCartCount } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const isLoginPage = location.pathname === '/login';

    const profileMenuRef = useRef(null);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); 

    return (
        <div className={`w-full flex items-center py-5 font-medium ${
            isLoginPage ? 'justify-center' : 'justify-between'
        }`}>
            <Link to="/"><img src={assets.logo} className="w-20 cursor-pointer" alt="logo" /></Link>

            {!isLoginPage && (
                <div className="flex items-center gap-4 md:gap-6 relative">
                    <FaSearch onClick={() => setShowSearch(true)} className="w-5 cursor-pointer" />
                    <Link to="/products" className="relative">Productos</Link>
                    
                    {user && user.role === 'admin' && (
                        <Link to="/admin" className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800">
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <div className="relative" ref={profileMenuRef}>
                            <FaUserCircle 
                                className="text-2xl cursor-pointer" 
                                onClick={() => setShowProfileMenu(prev => !prev)} 
                            />
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 border">
                                    <div className="py-1">
                                    <p className="px-4 py-2 text-sm text-gray-700 font-bold border-b">
                                        ¡Hola, {user.nombre}!
                                    </p>
                                    <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Mi Perfil
                                    </Link>
                                    <Link to="/mis-pedidos" onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Mis Pedidos
                                    </Link>
                                    <button onClick={handleLogout} className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Cerrar Sesión
                                    </button>
                                    </div>
                                </div>
                                )}

                        </div>
                    ) : (
                        <Link to="/login" className="bg-black text-white px-3 py-1 rounded text-sm">
                            Iniciar Sesión
                        </Link>
                    )}

                    <Link to="/cart" className="relative">
                        <FiShoppingCart className="text-2xl" />
                        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                            {getCartCount()}
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;