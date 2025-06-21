// src/components/Navbar.jsx

import React from 'react'; // Se elimina useState porque ya no se usa aquí
import { assets } from '../assets/assets.js';
import { Link, useLocation } from 'react-router-dom'; // <--- 1. IMPORTAR useLocation
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className={`w-full flex items-center py-5 font-medium ${
            isLoginPage ? 'justify-center' : 'justify-between'
        }`}>
            <Link to="/">
                <img src={assets.logo} className="w-20 cursor-pointer" alt="logo" />
            </Link>

            {!isLoginPage && (
                <>
                    {/* Barra de búsqueda */}
                    <div className="hidden sm:flex items-center bg-white rounded px-2 py-1 w-1/3 border ">
                        <FaSearch className="mr-2" />
                        <input type="text" placeholder="Buscar Producto" className="outline-none w-full"/>
                    </div>

                    {/* Categorías + Botones */}
                    <div className="flex items-center gap-4 relative">
                        {/* Barra de búsqueda en móvil */}
                        <FaSearch className="w-5 cursor-pointer sm:hidden" />
                        
                        {/* Botón Categorías */}
                        <div className="group relative cursor-pointer">
                            Categorías ▾
                            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                    <p className="cursor-pointer hover:text-black"> Sillas </p>
                                    <p className="cursor-pointer hover:text-black"> Mesas </p>
                                    <p className="cursor-pointer hover:text-black"> Oficina </p>
                                </div>
                            </div>
                        </div>

                        {/* Otros botones */}
                        <Link to="/login" className="bg-black text-white px-3 py-1 rounded text-sm">
                            Iniciar Sesión
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