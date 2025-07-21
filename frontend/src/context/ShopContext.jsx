import {createContext, useEffect, useState} from "react";
import { products as productsDefault } from '../assets/assets.js';
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; 
import { useContext } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext);


    useEffect(() => {
        fetchProducts();
    }, []);


    const[search, setSearch] = useState("");
    const[showSearch, setShowSearch] = useState(false);
    const[cartItems, setCartItems] = useState({});

    // --- LÓGICA DE AUTENTICACIÓN ---
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.error("Error al parsear el usuario del localStorage", error);
            localStorage.removeItem('loggedInUser');
        }

    }, []); 

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
    };

    const addProduct = (nuevoProducto) => {
        const nuevosProductos = [...products, nuevoProducto];
        setProducts(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };
    const editProduct = (productoEditado) => {
        const actualizados = products.map(p =>
            p.id === productoEditado.id ? productoEditado : p
        );
        setProducts(actualizados);
        localStorage.setItem('productos', JSON.stringify(actualizados));
    };
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/products"); // ← Ajusta URL si usas puerto diferente
            if (!response.ok) throw new Error("Error en la respuesta del servidor");
            const data = await response.json();
            setProducts(data);
            localStorage.setItem('productos', JSON.stringify(data));
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };
    const resetProducts = () => {
        localStorage.removeItem('productos');
        setProducts(productsDefault);
        toast.success("Productos restaurados a su estado original.");
    };
    const deleteProduct = async (productId) => {
        if (!token) {
            toast.error("No estás autenticado.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                if (res.status === 403) {
                    toast.error("No tienes permisos para eliminar este producto.");
                } else {
                    toast.error("No se pudo eliminar el producto.");
                }
                return;
            }

            const nuevosProductos = products.filter(p => p.id !== productId);
            setProducts(nuevosProductos);
            toast.success("Producto eliminado exitosamente.");

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            toast.error("Error de red al eliminar el producto.");
        }
    };

    

    const addToCart = async (itemId) => {
        const product = products.find(p => p.id === itemId);
        if (!product) {
            toast.error("Producto no encontrado.");
            return;
        }
        const cantidadEnCarrito = cartItems[itemId] || 0;
        const totalSolicitado = cantidadEnCarrito + 1;
        if (totalSolicitado > product.stock) {
        toast.error("Ya no hay más unidades disponibles de este producto.");
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
                const precioActual = product.discount > 0 ? product.discount : product.price;
                totalAmount += precioActual * quantity;
            }
        }
        return totalAmount;
    };

    const getTotalSavings = () => {
        let savings = 0;
        for (const productId in cartItems) {
            const quantity = cartItems[productId];
            const product = products.find(p => p.id === parseInt(productId));
            if (product && product.discount > 0 && product.price > product.discount) {
                const ahorroPorUnidad = product.price - product.discount;
                savings += ahorroPorUnidad * quantity;
            }
        }
        return savings;
    };


    const value = {
        products,
        setProducts, 
        search, 
        setSearch, 
        showSearch, 
        setShowSearch, 
        cartItems,
        setCartItems, 
        addToCart, 
        getCartCount, 
        updateQuantity,
        getCartAmount, 
        getTotalSavings,
        user,
        login,
        logout,
        addProduct,
        editProduct,
        resetProducts,
        deleteProduct,
        fetchProducts
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;