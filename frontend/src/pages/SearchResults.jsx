import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q")?.toLowerCase() || "";

    const { products } = useContext(ShopContext);

    const result = products.filter(product =>
        (product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)) &&
        product.stock > -4
    );

    let recommendations = [];
    if (result.length === 0) {
        const category = products.find(product =>
            product.name.toLowerCase().includes(query)
        )?.category;

        if (category) {
            recommendations = products.filter(
                p => p.category === category && p.stock > -2
            );
        }
    }

    return (
        <div className="pt-10">
            <h1 className="text-xl font-bold text-center">
                {result.length > 0
                    ? `¡Mire, escoja y enamórese... que aquí todo lo que ve es una joyita berraca!"`
                    : `No está lo que pidió, pero pa’ qué quiere eso si esto está mejor… ¡Mire y verá!`}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {(result.length > 0 ? result : recommendations).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
