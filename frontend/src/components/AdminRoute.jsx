import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useContext(ShopContext);

    const isAdmin = user && user.role === 'admin';

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;