import React, {useContext, useEffect, useState} from 'react';
import { MdOutlineCampaign } from "react-icons/md";
import { products } from '../assets/assets.js';
import {ShopContext} from '../context/ShopContext';


const Hero = () => {
    const [producto, setProducto] = useState(null);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * products.length);
        setProducto(products[randomIndex]);
    }, []);
    if (!producto) return null;
    return (
        <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg shadow-lg bg-white">
            {/* Texto izquierda */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 m-6">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2 mt-4">
                        <MdOutlineCampaign className="text-2xl" />
                        <h1 className="font-bold text-sm md:text-base text-black">¡Producto más pedido por los que no sabían que lo querían!</h1>
                    </div>
                    <h1 className="text-sm md:text-base text-black">Artículo berriondo del día: ¡Pídalo ya, que esto vuela más que la pensión!</h1>
                    {/* Info producto */}
                    <div className="flex-row items-center gap-2">
                        <h2 className="text-xl font-bold text-black mb-2">{producto.name}</h2>
                        <p className="text-sm text-black mb-4">{producto.description}</p>
                        <div className="flex items-center gap-3 mb-4">
                            {producto.oldPrice && (<span className="line-through text-gray-500 text-sm"> ${producto.oldPrice.toLocaleString()} </span>)}
                            <span className="font-bold text-black text-lg">${producto.price.toLocaleString()} </span>
                            <button className="bg-black text-white px-4 py-2 text-sm rounded cursor-pointer">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Imagen derecha */}
            <div className="w-full sm:w-1/3 flex justify-center items-center mb-4 mt-4">
                <img src={producto.image[0]} alt={producto.name} className="w-80 h-80 object-contain"/>
            </div>
        </div>
    );
};
export default Hero;