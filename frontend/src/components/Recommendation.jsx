import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Recommendation = () => {
    const { products, currency } = useContext(ShopContext);

    const recomendados = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <div className="my-10 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recomendados.map((producto, index) => (
                    <div key={index} className="border border-gray-400 rounded-lg shadow-lg bg-white p-4 flex flex-col items-center">
                        <img
                            src={producto.image[0]}
                            alt={producto.name}
                            className="w-full h-32 object-contain mb-4"
                        />
                        <p className="text-sm font-semibold text-center">{producto.name}</p>
                        <p className="text-sm font-bold">{currency}{producto.price.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendation;
