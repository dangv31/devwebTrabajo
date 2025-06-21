import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import VerOrdenes from './pages/VerOrdenes';

import Admin from './pages/Admin';
import AgregarProducto from './pages/AgregarProducto';
import VerProductos from './pages/VerProductos';
import Collection from "./pages/Collection.jsx";
import SearchBar from "./components/SearchBar.jsx";

const App = () => {
    return (
        <div className="px-4 sm:px-[5vm] md:px-[7vw] lg:px-[9vw] ">
            <Navbar/>
            <SearchBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Collection />} />
                <Route path="/product/:productId" element={<Product/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/login" element={<Login/>} />


                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/agregar" element={<AgregarProducto />} />
                <Route path="/admin/productos" element={<VerProductos />} />
                <Route path="/admin/ordenes" element={<VerOrdenes />} />

            </Routes>
        </div>
    );
};

export default App;