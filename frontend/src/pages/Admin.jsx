import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { ShopContext } from "../context/ShopContext.jsx";

function Admin() {
  const [ordenesRecientes, setOrdenesRecientes] = useState([]);

  useEffect(() => {
    const ordenesGuardadas = JSON.parse(localStorage.getItem("pedidos")) || [];
    const ordenadas = [...ordenesGuardadas].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    setOrdenesRecientes(ordenadas.slice(0, 3));
  }, []);

  const colorEstado = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'text-yellow-600';
      case 'Entregado':
        return 'text-green-600';
      case 'Cancelado':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">¡Bienvenido, mijo!</h1>
      <p className="text-gray-700 mb-8">
        Estás en el panel de control de <strong>Variedades Don Berriondo</strong>.
      </p>

      {/* Pedidos recientes */}
      <h2 className="text-xl font-semibold mb-4">Pedidos recientes:</h2>
      {ordenesRecientes.length === 0 ? (
        <p className="text-gray-500 mb-6">No hay pedidos recientes todavía.</p>
      ) : (
        ordenesRecientes.map((orden) => (
          <div key={orden.id} className="flex items-center gap-4 bg-gray-100 p-4 rounded shadow mb-4">
            <div>
              <p className="font-semibold">Orden #{orden.id}</p>
              <p className="text-sm text-gray-600">
                Estado:{' '}
                <span className={`font-medium ${colorEstado(orden.estado)}`}>
                  {orden.estado}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Valor:{' '}
                <span className="font-bold">
                  ${orden.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 flex-wrap">
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

        <Link to="/admin/ordenes">
          <button className="flex items-center gap-2 bg-[#7D7D7D] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#6A6A6A]">
            <FaClipboardList className="text-white" /> Ver Órdenes
          </button>
        </Link>

        <Link to="/admin/categorias">
          <button className="flex items-center gap-2 bg-[#347571] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#2C615E]">
            <FaClipboardList className="text-white" /> Categorías
          </button>
        </Link>

        <Link to="/admin/solicitudes">
          <button className="flex items-center gap-2 bg-[#A47551] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#916546]">
            <FaClipboardList className="text-white" /> Ver Solicitudes Especiales
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Admin;
