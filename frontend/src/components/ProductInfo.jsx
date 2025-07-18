import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const ProductInfo = ({ product, showDescription = true, showButton = true }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg shadow-lg bg-white p-4 sm:gap-6">
            {/* Contenedor del Texto (Izquierda) */}
            <div className="w-full sm:w-3/5 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141] break-words max-w-lg">
                    <h2 className="text-xl font-bold text-black mb-2">{product.name}</h2>
                    {showDescription && (
                        <p className="text-sm sm:text-base text-black mb-4">{product.description}</p>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                        {product.oldPrice && (
                            <span className="line-through text-gray-500 text-sm">
                                ${product.oldPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="font-bold text-black text-lg">
                            ${product.price.toLocaleString()}
                        </span>
                        {showButton && (
                            <button onClick={() => addToCart(product.id)} className="bg-black text-white px-4 py-2 text-sm rounded cursor-pointer">
                                Agregar al carrito
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Contenedor de la Imagen (Derecha) */}
            <div className="w-full sm:w-2/5 flex justify-center items-center">
                <img
                    src={product.imageRoute}
                    alt={product.name}
                    className="w-80 h-80 object-contain"
                />
            </div>
        </div>
    );
};

export default ProductInfo;