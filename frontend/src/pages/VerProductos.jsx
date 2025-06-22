import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

function VerProductos() {
  const { products } = useContext(ShopContext);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        ¡Bienvenido, mijo! Estás viendo los productos que tenemos amontonados.
      </h1>

      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-md border px-3 py-2 rounded mb-6"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">Producto</th>
              <th className="px-4 py-2 border-b">Precio</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Ventas</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{prod.name}</td>
                <td className="px-4 py-2 border-b">${prod.price.toLocaleString()}</td>
                <td className={`px-4 py-2 border-b ${prod.stock < 0 ? 'text-red-500' : ''}`}>
                  {prod.stock}
                </td>
                <td className="px-4 py-2 border-b">{prod.ventas}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex gap-2">
                    <button className="bg-black text-white px-3 py-1 cursor-pointer rounded text-sm hover:bg-gray-800"
                      onClick={() => navigate(`/admin/editar/${prod.id}`)}
                    > 
                      Editar
                    </button>
                    <button className="bg-black text-white px-3 py-1 cursor-pointer rounded text-sm hover:bg-gray-800 ">
                      Eliminar
                    </button>
                  </div>
                </td>
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

