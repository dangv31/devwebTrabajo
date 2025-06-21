// src/pages/Admin.jsx
import React from 'react';
import { FaPlusCircle, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

function Admin() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">¡Bienvenido, mijo!</h1>
      <p className="text-gray-700 mb-8">
        Estás en el panel de control de <strong>Variedades Don Berriondo</strong>.
      </p>

      {/* Pedidos recientes */}
      <h2 className="text-xl font-semibold mb-4">Pedidos recientes:</h2>
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded shadow mb-8">
        <img
          src={assets.sillagamer}
          alt="Silla Gamer"
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <p className="font-semibold">Orden #123</p>
          <p className="text-sm text-gray-600">Estado: <span className="font-medium text-yellow-600">Pendiente</span></p>
          <p className="text-sm text-gray-600">Valor: <span className="font-bold">$120.000</span></p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link to="/admin/agregar">
            <button className="flex items-center gap-2 bg-[#A47551] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#916546]">
                <FaPlusCircle className="text-white" /> Agregar Producto
            </button>
        </Link>

        <Link to="/admin/productos">
            <button className="flex items-center gap-2 bg-[#D4A017] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#B48C14]">
                <FaBoxOpen className="text-white" /> Ver Productos
            </button>
        </Link>

            <button className="flex items-center gap-2 bg-[#7D7D7D] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#6A6A6A]">
                <FaClipboardList className="text-white" /> Ver Órdenes
            </button>
        </div>

    </div>
  );
}

export default Admin;


