// src/components/Navbar.jsx

import React,{useState} from 'react'; // Se elimina useState porque ya no se usa aquí
import { assets } from '../assets/assets.js';
import {Link, useLocation, useNavigate} from 'react-router-dom'; // <--- 1. IMPORTAR useLocation
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };
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
                        <input type="text" placeholder="Buscar Producto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} className="outline-none w-full"/>
                    </div>

                    {/* Categorías + Botones */}
                    <div className="flex items-center gap-4 relative">
                        {/* Barra de búsqueda en móvil */}
                        <FaSearch className="w-5 cursor-pointer sm:hidden" />
                        
                        {/* Botón Categorías */}
                        <div className="group relative cursor-pointer">
                            Categorías ▾
                            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                                <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                    <Link to="/categoria/Tecnologia" className="cursor-pointer hover:text-black">Tecnología</Link>
                                    <Link to="/categoria/Electrodomesticos" className="cursor-pointer hover:text-black">Electrodomésticos</Link>
                                    <Link to="/categoria/Hogar" className="cursor-pointer hover:text-black">Hogar</Link>
                                    <Link to="/categoria/Oficina" className="cursor-pointer hover:text-black">Oficina</Link>
                                    <Link to="/categoria/Decoracion" className="cursor-pointer hover:text-black">Decoración</Link>
                                    <Link to="/categoria/Muebles" className="cursor-pointer hover:text-black">Muebles</Link>
                                    <Link to="/categoria/Salud" className="cursor-pointer hover:text-black">Salud</Link>
                                    <Link to="/categoria/Ropa" className="cursor-pointer hover:text-black">Ropa</Link>
                                    <Link to="/categoria/Aseo" className="cursor-pointer hover:text-black">Aseo</Link>
                                    <Link to="/categoria/Papeleria" className="cursor-pointer hover:text-black">Papelería</Link>
                                    <Link to="/categoria/Jugueteria" className="cursor-pointer hover:text-black">Juguetería</Link>
                                    <Link to="/categoria/Herramientas" className="cursor-pointer hover:text-black">Herramientas</Link>
                                    <Link to="/categoria/Cocina" className="cursor-pointer hover:text-black">Cocina</Link>
                                    <Link to="/categoria/Iluminacion" className="cursor-pointer hover:text-black">Iluminación</Link>
                                    <Link to="/categoria/Mascotas" className="cursor-pointer hover:text-black">Mascotas</Link>
                                </div>
                            </div>
                        </div>

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