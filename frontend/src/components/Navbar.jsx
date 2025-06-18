import React from 'react';
import { assets } from '../assets/assets.js';
import {NavLink} from 'react-router-dom';
import {FaSearch, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between py-5 font-medium ">
            <NavLink to="/">
                <img src={assets.logo} className="w-20 cursor-pointer" alt="logo" />
            </NavLink>
            {/*Barra busqueda*/}
            <div className="flex items-center bg-white rounded px-2 py-1 w-1/3 border">
                <FaSearch className="mr-2" />
                <input
                    type="text"
                    placeholder="Buscar Producto"
                    className="outline-none w-full"
                />
            </div>
            {/* Categorías + Botones */}
            <div className="flex items-center gap-4 relative">
                {/* Botón Categorías */}
                <div className="group relative">
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
                <NavLink to="/login" className="bg-black text-white px-3 py-1 rounded text-sm">
                    Iniciar Sesión
                </NavLink>
                <NavLink to="/cart">
                    <FaShoppingCart className="text-xl" />
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;