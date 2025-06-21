import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductCard from "../components/ProductCard";
import SortOptions from "../components/SortOptions.jsx";

const CollectionCategory = () => {
    const { nombre } = useParams(); // nombre = categoría seleccionada
    const [sortBy, setSortBy] = useState('');
    const { products } = useContext(ShopContext);

    // Filtrar productos por categoría
    let productosFiltrados = products.filter(
        p => p.category.toLowerCase() === nombre.toLowerCase()
    );

    // Aplicar ordenamiento
    if (sortBy === 'price-asc') {
        productosFiltrados.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        productosFiltrados.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="flex flex-col gap-5 pt-10 border-t">
            <h1 className="text-2xl font-bold text-center">
                ¡Todo en un solo toldo, mijo! Vea y escoja, que aquí hay más productos de tipo: {nombre.toLowerCase()} que excusas pa’ no pagar el arriendo.
            </h1>

            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productosFiltrados.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CollectionCategory;
