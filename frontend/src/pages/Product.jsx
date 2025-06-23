import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductInfo from "../components/ProductInfo.jsx";
import Recommendation from "../components/Recommendation.jsx";

const Product = () => {
    const { productId } = useParams();
    const { products } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === parseInt(productId));
        setProductData(foundProduct);
    }, [productId, products]);

    if (!productData) {
        return (
            <div className="text-center py-20 text-lg">
                Producto no encontrado.
            </div>
        );
    }

    return (
        <div>
            <ProductInfo product={productData} />
            <hr className="border-t-2 border-gray-300 mb-4 mt-4" />
            <h1 className="font-bold text-sm text-center md:text-base text-black m-5">
                Échese un ojo a estas maravillas similares, ¡ni cuenta se va a dar que no es lo que buscaba!            </h1>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <Recommendation/>
        </div>
    );
};

export default Product;
