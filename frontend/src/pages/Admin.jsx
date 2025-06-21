// src/pages/Admin.jsx
import React from 'react';
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
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/admin/agregar">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ➕ Agregar Producto
          </button>
        </Link>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          📦 Ver Productos
        </button>

        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          📑 Ver Órdenes
        </button>
      </div>
    </div>
  );
}

export default Admin;


