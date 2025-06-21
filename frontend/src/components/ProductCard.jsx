import React from "react";

const ProductCard = ({ product }) => {
    const tieneDescuento = product.oldPrice && product.oldPrice > product.price;

    return (
        <div className="border border-gray-400 rounded-lg shadow-lg bg-white p-4 flex flex-col items-center h-70">
            <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-32 object-contain mb-4"
            />
            <p className="text-sm font-semibold text-center">{product.name}</p>
            <div className="flex items-center gap-2 mt-1">
                {tieneDescuento && (
                    <span className="line-through text-gray-500 text-sm">
                        ${product.oldPrice.toLocaleString()}
                    </span>
                )}
                <span className="text-sm font-bold text-black">
                    ${product.price.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
