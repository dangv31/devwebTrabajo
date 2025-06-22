import {createContext, useEffect, useState} from "react";
import { products } from '../assets/assets.js';
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const[search, setSearch] = useState("");
    const[showSearch, setShowSearch] = useState(false);
    const[cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        const product = products.find(p => p.id === itemId);

        if (!product) {
            toast.error("Producto no encontrado.");
            return;
        }

        const cantidadEnCarrito = cartItems[itemId] || 0;
        const totalSolicitado = cantidadEnCarrito + 1;

        if (product.stock - totalSolicitado < -4) {
            toast.error("No hay suficiente stock para agregar más unidades.");
            return;
        }

        const cartData = structuredClone(cartItems);
        cartData[itemId] = totalSolicitado;
        setCartItems(cartData);
    };




    useEffect(() => {
        console.log("Carrito actualizado:", cartItems);

    }, [cartItems]);

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, cantidad) => acc + cantidad, 0);
    };

    const updateQuantity = (itemId, quantity) => {
        const product = products.find(p => p.id === parseInt(itemId));
        if (!product) return;

        const parsedQty = quantity === 0 ? 0 : parseInt(quantity) || 1;

        const stockProyectado = product.stock - parsedQty;

        if (stockProyectado < 0) {
            toast.error("Superaste el límite de unidades disponibles para este producto.");
            return;
        }

        const cartData = structuredClone(cartItems);
        cartData[itemId] = parsedQty;
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            const product = products.find(p => p.id === parseInt(itemId));

            if (product) {
                totalAmount += product.price * quantity;
            }
        }

        return totalAmount;
    };
    const getTotalSavings = () => {
        let savings = 0;

        for (const productId in cartItems) {
            const quantity = cartItems[productId];
            const product = products.find(p => p.id === parseInt(productId));

            if (product && product.oldPrice && product.oldPrice > product.price && quantity > 0) {
                const ahorroPorUnidad = product.oldPrice - product.price;
                savings += ahorroPorUnidad * quantity;
            }
        }

        return savings;
    };


    const value = {
        products, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, getTotalSavings
    }
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;