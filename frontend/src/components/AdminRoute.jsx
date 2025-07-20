import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = user && user.admin;

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;