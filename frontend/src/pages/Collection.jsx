import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductCard from "../components/ProductCard";
import SortOptions from "../components/SortOptions.jsx";
import SidebarFilters from "../components/SideBarFilters.jsx";

import { useLocation } from 'react-router-dom';


const Collection = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoriaDesdeURL = queryParams.get("categoria");

    const { products, search, showSearch } = useContext(ShopContext);
    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState({
        offers: new Set(),
        price: { max: 20000000 },
        categories: categoriaDesdeURL ? new Set([categoriaDesdeURL]) : new Set()
    });

    useEffect(() => {
        if (categoriaDesdeURL) {
            setFilters(prev => ({
                ...prev,
                categories: new Set([categoriaDesdeURL])
            }));
        }
    }, [categoriaDesdeURL]);

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((p) => {
            const matchPrice = p.price <= filters.price.max;
            const matchCategory = filters.categories.size === 0 || filters.categories.has(p.category);
            const ofertaBerrionda = filters.offers.has("Ofertas Berriondas") ? p.discount != 0 : true;
            const matchSearch = search.trim() === "" ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());

            return matchPrice && ofertaBerrionda && matchCategory && matchSearch;
        });

        if (sortBy === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [products, filters, sortBy, search]);

    return (
        <div className="flex flex-col gap-5 pt-10 border-t">
            <h1 className="text-2xl font-bold text-center">
                ¡Mire, escoja y llévese lo que más le cuadre, que aquí hay pa’ todos!
            </h1>
            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <SidebarFilters filters={filters} setFilters={setFilters} showCat={true} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
