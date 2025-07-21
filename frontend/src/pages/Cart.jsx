import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import { RiDeleteBin5Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal.jsx";
import { useNavigate } from 'react-router-dom';
import Recommendation from "../components/Recommendation.jsx";
import {AuthContext} from "../context/AuthContext.jsx";


const Cart = () => {
    const { products, cartItems, updateQuantity, setCartItems, fetchProducts } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();
    const {user, token} = useContext(AuthContext);

    useEffect(() => {
        const tempData = [];

        for (const productId in cartItems) {
            const quantity = cartItems[productId];

            if (quantity > 0) {
                const product = products.find(p => p.id === parseInt(productId));
                if (product) {
                    tempData.push({
                        id: productId,
                        quantity,
                        product
                    });
                }
            }
        }

        setCartData(tempData);
    }, [cartItems, products]);

    const finalizarCompra = async () => {
        if (!user || !token) {
            alert("Debe iniciar sesión para realizar una compra.");
            console.log(user)
            navigate("/login");
            return;
        }

        if (cartData.length === 0) return;

        try {
            const orderData = {
                items: cartData.map(item => ({
                    id: item.product.id.toString(),
                    quantity: item.quantity
                }))
            };

            const response = await fetch("http://localhost:8080/orders/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            if (!response.ok) {
                throw new Error("Error al enviar la orden.");
            }
            setCartItems({});
            await fetchProducts();
            navigate("/mis-pedidos");
        } catch (error) {
            console.error("Error al finalizar compra:", error);
            alert("Hubo un problema al procesar tu compra. Intenta de nuevo.");
        }
    };


    return (
        <div className="border-t border-gray-300 pt-5">
            {cartData.length === 0 ? (
                <div className="text-2xl mb-3 text-center font-bold text-gray-800">
                    Su carrito está más vacío que la billetera de un fiado.
                </div>
            ) : (
                <>
                    <div className="text-2xl mb-3 text-center font-bold text-gray-800">
                        Su carrito: ¡más cargado que chiva en feria!
                    </div>
                    <div>
                        {cartData.map((item, index) => (
                            <div key={index} className="py-4 border-gray-300 border-t border-b text-gray-800 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={item.product.imageRoute} alt="" />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{item.product.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                                {item.product.discount > 0 && item.product.discount < item.product.price && (
                                                    <p className="line-through text-sm text-gray-500">
                                                    ${item.product.price.toLocaleString('es-CO')}
                                                    </p>
                                                )}
                                                <p className="text-black font-semibold text-sm">
                                                    ${item.product.discount > 0 && item.product.discount < item.product.price ? item.product.discount.toLocaleString('es-CO') : item.product.price.toLocaleString('es-CO')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => updateQuantity(item.id, Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} max={item.product.stock} value={item.quantity} />
                                <RiDeleteBin5Line onClick={() => updateQuantity(item.id, 0)} className="text-2xl sm:text-3xl cursor-pointer" />
                            </div>
                        ))}
                        <div className="flex justify-end my-20">
                            <div className="w-full sm:w-[450px]">
                                <CartTotal/>
                            </div>

                        </div>
                        <div className="flex justify-end mb-10">
                            <button
                                onClick={finalizarCompra}
                                className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14]"
                            >
                                Finalizar compra
                            </button>
                            </div>
                    </div>
                    <h1 className="font-bold text-sm text-center md:text-base text-black m-5">
                        ¡Y ya que está empacando, mijo… mire estas joyitas pa' que no se le quede nada por fuera! Uno nunca sabe cuándo lo va a necesitar.
                    </h1>
                    <hr className="border-t-2 border-gray-300 mb-4" />
                    <Recommendation/>

                </>
            )}
        </div>
    );
};

export default Cart;
