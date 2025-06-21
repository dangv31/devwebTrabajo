import React, { useState } from 'react';

function VerProductos() {
  const [busqueda, setBusqueda] = useState('');

  // Lista de productos simulados
  const productos = [
    { nombre: 'Tostadora BERRACA', precio: 50000, stock: 5, ventas: 2 },
    { nombre: 'Silla Gamer', precio: 120000, stock: 2, ventas: 10 },
    { nombre: 'Cama Montañera', precio: 500000, stock: -1, ventas: 20 },
    { nombre: 'Taza de café Chinchinense', precio: 25000, stock: 1, ventas: 50 },
    { nombre: 'Luces LED Caleñas', precio: 70000, stock: 12, ventas: 5 },
  ];

  // Filtro por nombre (ignorando mayúsculas/minúsculas)
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        ¡Bienvenido, mijo! Estás viendo los productos que tenemos amontonados.
      </h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-md border px-3 py-2 rounded mb-6"
      />

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">Producto</th>
              <th className="px-4 py-2 border-b">Precio</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Ventas</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{prod.nombre}</td>
                <td className="px-4 py-2 border-b">${prod.precio.toLocaleString()}</td>
                <td className={`px-4 py-2 border-b ${prod.stock < 0 ? 'text-red-500' : ''}`}>
                  {prod.stock}
                </td>
                <td className="px-4 py-2 border-b">{prod.ventas}</td>
              </tr>
            ))}

            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No se encontraron productos con ese nombre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerProductos;
