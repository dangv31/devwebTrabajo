import React, { useContext, useEffect, useState } from "react";
import { MdOutlineCampaign } from "react-icons/md";
import { ShopContext } from "../context/ShopContext";
import ProductInfo from "../components/ProductInfo";

const Hero = () => {
    const [producto, setProducto] = useState(null);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        if (products && products.length > 0) {
            const productosConStock = products.filter(p => p.stock > 0);
            if (productosConStock.length > 0) {
                const randomIndex = Math.floor(Math.random() * productosConStock.length);
                setProducto(productosConStock[randomIndex]);
            }
        }
    }, [products]);
    if (!producto) return null;

    return (
        <div>
            <div className="flex items-center gap-2 mt-4 text-[#414141]">
                <MdOutlineCampaign className="text-2xl" />
                <h1 className="font-bold text-sm md:text-base text-black">
                    ¡Producto más pedido por los que no sabían que lo querían!
                </h1>
            </div>
            <h1 className="text-sm md:text-base text-black mb-4">
                Artículo berriondo del día: ¡Pídalo ya, que esto vuela más que la pensión!
            </h1>

            <ProductInfo product={producto} />
        </div>
    );
};

export default Hero;
