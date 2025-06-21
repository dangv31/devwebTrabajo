import React, { useState, useEffect, useContext } from 'react';
import Hero from "../components/Hero.jsx";
import Recommendation from "../components/Recommendation.jsx";
import ProductPopup from '../components/ProductPopup.jsx'; // 1. IMPORTAR EL POPUP
import { ShopContext } from '../context/ShopContext.jsx'; // 2. IMPORTAR EL CONTEXTO

const Home = () => {
    // Estados para controlar el popup
    const [showPopup, setShowPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState(null);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        // Iniciar un temporizador para mostrar el popup después de 4 segundos
        const timer = setTimeout(() => {
            if (products && products.length > 0) {
                // Seleccionar un producto al azar
                const randomIndex = Math.floor(Math.random() * products.length);
                setPopupProduct(products[randomIndex]);
                // Activar la visualización del popup
                setShowPopup(true);
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [products]); 

    return (
        <div>
            <Hero/>
            <hr className="border-t-2 border-gray-300 mb-4 mt-4" />
            <h1 className="font-bold text-sm text-center md:text-base text-black m-5 ">¡Esto no es todo, mijo! Aquí hay más productos que excusas pa' no pagar fiado!</h1>
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