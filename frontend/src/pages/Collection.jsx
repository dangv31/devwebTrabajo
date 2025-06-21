import React, { useContext, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductCard from "../components/ProductCard";
import SortOptions from "../components/SortOptions.jsx";
import SidebarFilters from "../components/SideBarFilters.jsx";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState({
        offers: new Set(),
        price: { max: 1000000 },
        categories: new Set()
    });

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((p) => {
            const matchPrice = p.price <= filters.price.max;
            const matchStock = p.stock > -4;
            const matchCategory = filters.categories.size === 0 || filters.categories.has(p.category);
            const ofertaBerrionda = filters.offers.has("Ofertas Berriondas") ? p.oldPrice != null : true;
            const matchSearch = search.trim() === "" ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());

            return matchPrice && ofertaBerrionda && matchStock && matchCategory && matchSearch;
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
                ¡Todo en un solo toldo, mijo! Vea el combo completo que tenemos pa’ usted.
            </h1>
            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            <div className="flex flex-col sm:flex-row gap-4">
                <SidebarFilters filters={filters} setFilters={setFilters} showCat={true} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
