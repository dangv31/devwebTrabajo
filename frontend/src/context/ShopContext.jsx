import {createContext, useEffect, useState} from "react";
import { products as productsDefault } from '../assets/assets.js';
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
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

        fetchProductos();
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
    const resetProducts = () => {
        localStorage.removeItem('productos');
        setProducts(productsDefault);
        toast.success("Productos restaurados a su estado original.");
    };
    const deleteProduct = (productId) => {
        const nuevosProductos = products.filter(p => p.id !== productId);
        setProducts(nuevosProductos);
        toast.success("Producto eliminado exitosamente.");
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
        deleteProduct
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;