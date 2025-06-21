import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

const Recommendation = () => {
    const { products, currency } = useContext(ShopContext);

    const recomendados = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <div className="my-10 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recomendados.map((producto, index) => (
                    <ProductCard key={index} product={producto} />
                ))}
            </div>
        </div>
    );
};

export default Recommendation;
