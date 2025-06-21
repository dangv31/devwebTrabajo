// src/components/Navbar.jsx

import React, {useContext} from 'react'; // Se elimina useState porque ya no se usa aquí
import { assets } from '../assets/assets.js';
import {Link, useLocation, useNavigate} from 'react-router-dom'; // <--- 1. IMPORTAR useLocation
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import {ShopContext} from "../context/ShopContext.jsx";

const Navbar = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    const {setShowSearch} = useContext(ShopContext);
    return (
        <div className={`w-full flex items-center py-5 font-medium ${
            isLoginPage ? 'justify-center' : 'justify-between'
        }`}>
            <Link to="/">
                <img src={assets.logo} className="w-20 cursor-pointer" alt="logo" />
            </Link>

            {!isLoginPage && (
                <>
                    <div className="flex items-center gap-4 relative">
                        <Link to="/products" className="relative">
                            <FaSearch onClick={()=>setShowSearch(true)} className="w-5 cursor-pointer" />
                        </Link>
                        <Link to="/products" className="relative">
                            Productos
                        </Link>
                        {/* Otros botones */}
                        <Link to="/login" className="bg-black text-white px-3 py-1 rounded text-sm">
                            Iniciar Sesión
                        </Link>
                        <Link to="/admin" className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800">
                             Admin
                        </Link>
                        <Link to="/cart" className="relative">
                            <FiShoppingCart className="text-2xl" />
                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;