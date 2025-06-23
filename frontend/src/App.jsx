import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import VerOrdenes from './pages/VerOrdenes';
import Profile from './pages/Profile';

import MisPedidos from "./pages/MisPedidos";

import SolicitarProducto from './pages/SolicitarProducto.jsx';

import Admin from './pages/Admin';
import AgregarProducto from './pages/AgregarProducto';
import VerProductos from './pages/VerProductos';
import AdminCategorias from "./pages/AdminCategorias.jsx";
import Collection from "./pages/Collection.jsx";
import SearchBar from "./components/SearchBar.jsx";
import AdminRoute from './components/AdminRoute.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <div className="bg-[#f2af4c] w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Navbar/>
            </div>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <SearchBar/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/products" element={<Collection />} />
                    <Route path="/product/:productId" element={<Product/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/mis-pedidos" element={<MisPedidos />} />
                    <Route path="/solicitar/:id" element={<SolicitarProducto />} />

                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/agregar" element={<AgregarProducto />} />
                        <Route path="/admin/editar/:id" element={<AgregarProducto />} />
                        <Route path="/admin/productos" element={<VerProductos />} />
                        <Route path="/admin/ordenes" element={<VerOrdenes />} />
                        <Route path="/admin/categorias" element={<AdminCategorias />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default App;