import React from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const hasDiscount = product.discount > 0 && product.discount < product.price;

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleSolicitar = () => {
        navigate(`/solicitar/${product.id}`);
    };

    const handleAlternativas = () => {
        navigate(`/products?categoria=${encodeURIComponent(product.category)}`);
    };

    const renderBoton = () => {
        if (product.stock >= 1) {
            return (
                <button onClick={handleClick} className="mt-2 bg-[#D4A017] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#B48C14]">
                    Comprar
                </button>
            );
        } else if (product.stock >= -4) {
            return (
                <button onClick={handleSolicitar} className="mt-2 bg-[#A47551] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#916546]">
                    Solicitar a Don Berriondo
                </button>
            );
        } else {
            return (
                <button onClick={handleAlternativas} className="mt-2 bg-[#7D7D7D] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#6A6A6A]">
                    Ver Alternativas
                </button>
            );
        }
    };


    return (
        <div className="border border-gray-400 rounded-lg shadow-lg bg-white p-4 flex flex-col items-center text-center">
            <img src={`${BASE_URL}${product.imageRoute}`} alt={product.name} className="w-full h-32 object-contain mb-4"/>
            <p className="text-sm font-semibold">{product.name}</p>

            <div className="flex items-center gap-2 mt-1">
                {hasDiscount && (
                    <span className="line-through text-gray-500 text-sm">
                        ${product.price.toLocaleString()}
                    </span>
                )}
                <span className="text-sm font-bold text-black">
                    ${hasDiscount ? product.discount.toLocaleString() : product.price.toLocaleString()}
                </span>
            </div>


            <p className="text-xs text-gray-600 mt-1">Stock: {product.stock}</p>

            {renderBoton()}
        </div>
    );
};

export default ProductCard;

