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

        // ✅ El stock solo permite productos si stock > -4
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

    const value = {
        products, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount
    }
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;