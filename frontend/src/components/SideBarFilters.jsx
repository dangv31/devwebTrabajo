import React, {useEffect, useState} from "react";
import { categories } from "../assets/assets.js";

const SidebarFilters = ({ filters, setFilters, showCat = true }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("categoriasFijas")) || [];
        setCategories(stored);
    }, []);

    const handleCheckboxChange = (section, value) => {
        setFilters(prev => {
            const updated = new Set(prev[section]);
            updated.has(value) ? updated.delete(value) : updated.add(value);
            return { ...prev, [section]: updated };
        });
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setFilters(prev => ({
            ...prev,
            price: { ...prev.price, max: value }
        }));
    };

    return (
        <div className="border p-4 rounded w-full sm:w-64 text-sm space-y-4 self-start">
            {/* Ofertas y descuentos */}
            <div>
                <h3 className="font-semibold mb-1">Ofertas y descuentos</h3>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={filters.offers.has("Ofertas Berriondas")}
                        onChange={() => handleCheckboxChange("offers", "Ofertas Berriondas")}
                    />
                    Ofertas Berriondas
                </label>
            </div>

            {/* Precio */}
            <div>
                <h3 className="font-semibold mb-1">Precio</h3>
                <div className="flex justify-between text-xs mb-1">
                    <span>$0</span>
                    <span>${filters.price.max.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    name="max"
                    min={0}
                    max={1000000}
                    value={filters.price.max}
                    onChange={handlePriceChange}
                    className="w-full"
                />
            </div>

            {/* Categorías */}
            {showCat && (
                <div>
                    <h3 className="font-semibold mb-1">Categorías</h3>
                    {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={filters.categories.has(cat)}
                        onChange={() => handleCheckboxChange("categories", cat)}
                        />
                        {cat}
                    </label>
                    ))}
                </div>
                )}
        </div>
    );
};

export default SidebarFilters;
