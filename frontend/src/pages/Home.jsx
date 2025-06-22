import React, { useState, useEffect, useContext } from 'react';
import Hero from "../components/Hero.jsx";
import Recommendation from "../components/Recommendation.jsx";
import ProductPopup from '../components/ProductPopup.jsx';
import { ShopContext } from '../context/ShopContext.jsx';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState(null);
    const { products } = useContext(ShopContext);

    useEffect(() => {
    const interval = setInterval(() => {
        const productosConDescuento = products.filter(p => p.oldPrice);
        if (productosConDescuento.length > 0) {
            const randomIndex = Math.floor(Math.random() * productosConDescuento.length);
            setPopupProduct(productosConDescuento[randomIndex]);
            setShowPopup(true);
        }
    }, 10000); //cada 10 segundos

    return () => clearInterval(interval);
}, [products]);

    return (
        <div>
            <Hero/>
            <hr className="border-t-2 border-gray-300 mb-4 mt-4" />
            <h1 className="font-bold text-sm text-center md:text-base text-black m-5">
                ¡Esto no es todo, mijo! Aquí hay más productos que excusas pa' no pagar fiado!
            </h1>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <Recommendation/>

            {showPopup && popupProduct && (
                <ProductPopup 
                    product={popupProduct} 
                    onClose={() => setShowPopup(false)} 
                />
            )}
        </div>
    );
};

export default Home;
