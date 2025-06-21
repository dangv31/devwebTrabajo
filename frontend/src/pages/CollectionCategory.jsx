import React, {useContext, useMemo, useState} from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductCard from "../components/ProductCard";
import SortOptions from "../components/SortOptions.jsx";
import SidebarFilters from "../components/SideBarFilters.jsx";

const CollectionCategory = () => {
    const { products } = useContext(ShopContext);
    const { nombre } = useParams(); // nombre = categoría seleccionada
    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState({
        offers: new Set(),
        price: { max: 1000000 },
        categories: new Set()
    });

    const productosFiltrados = useMemo(() => {
        let filtrados = products.filter((p) => {
            const matchCategory = p.category.toLowerCase() === nombre.toLowerCase();
            const matchPrice = p.price <= filters.price.max;
            const matchStock = p.stock > -4;

            const ofertaBerrionda = filters.offers.has("Oferta Berrionda del día")
                ? p.oldPrice != null
                : true;

            return matchCategory && matchPrice && ofertaBerrionda && matchStock;
        });

        if (sortBy === "price-asc") {
            filtrados.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            filtrados.sort((a, b) => b.price - a.price);
        }

        return filtrados;
    }, [products, nombre, filters, sortBy]);
    return (
        <div className="flex flex-col gap-5 pt-10 border-t">
            <h1 className="text-2xl font-bold text-center">¡Todo en un solo toldo, mijo! Vea y escoja, que aquí hay más productos de tipo: {nombre.toLowerCase()} que excusas pa’ no pagar el arriendo.</h1>
            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            <div className="flex flex-col sm:flex-row gap-4">
                <SidebarFilters filters={filters} setFilters={setFilters} showCat={false}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosFiltrados.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionCategory;
