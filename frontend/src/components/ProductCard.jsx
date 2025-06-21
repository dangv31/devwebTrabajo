import React from "react";

const ProductCard = ({product}) => {
    return (
        <div className="border border-gray-400 rounded-lg shadow-lg bg-white p-4 flex flex-col items-center">
            <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-32 object-contain mb-4"
            />
            <p className="text-sm font-semibold text-center">{product.name}</p>
            <p className="text-sm font-bold">{product.price.toLocaleString()}</p>
        </div>
    );
};

export default ProductCard;
