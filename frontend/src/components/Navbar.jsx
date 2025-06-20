import React, {useState} from 'react';
import { assets } from '../assets/assets.js';
import {Link} from 'react-router-dom';
import {FaSearch} from "react-icons/fa";
import {FiShoppingCart} from "react-icons/fi";

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between py-5 font-medium ">
            <Link to="/">
                <img src={assets.logo} className="w-20 cursor-pointer" alt="logo" />
            </Link>
            {/*Barra busqueda*/}
            <div className="hidden sm:flex items-center bg-white rounded px-2 py-1 w-1/3 border ">
                <FaSearch className="mr-2" />
                <input type="text" placeholder="Buscar Producto" className="outline-none w-full"/>
            </div>
            {/* Categorías + Botones */}
            <div className="flex items-center gap-4 relative">
                {/* Barra busqueda en móvil */}
                <FaSearch className="w-5 cursor-pointer sm:hidden" />
                {/* Botón Categorías */}
                <div className="group relative cursor-pointer">
                    Categorías ▾
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
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
        </div>
    );
};

export default Navbar;