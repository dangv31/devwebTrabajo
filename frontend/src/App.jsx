import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";

import Admin from './pages/Admin';
import AgregarProducto from './pages/AgregarProducto';
import VerProductos from './pages/VerProductos';
import CollectionCategory from "./pages/CollectionCategory.jsx";

const App = () => {
    return (
        <div className="px-4 sm:px-[5vm] md:px-[7vw] lg:px-[9vw] ">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/categoria/:nombre" element={<CollectionCategory />} />
                <Route path="/product/:productId" element={<Product/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/login" element={<Login/>} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/agregar" element={<AgregarProducto />} />
                <Route path="/admin/productos" element={<VerProductos />} />

            </Routes>
        </div>
    );
};

export default App;