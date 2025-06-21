import React from 'react';

function Admin() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <p className="mb-6 text-gray-700">Bienvenido, Admin. Aquí puedes gestionar productos, usuarios, etc.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Agregar Producto
        </button>
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

