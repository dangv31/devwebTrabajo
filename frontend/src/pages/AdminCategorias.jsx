// src/pages/AdminCategorias.jsx
import React, { useEffect, useState } from 'react';
import { categories as categoriasOriginales } from '../assets/assets.js';

const LOCAL_KEY = 'categoriasFijas';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [ediciones, setEdiciones] = useState({})

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    setCategorias(stored);
  }, []);

  const guardarCategorias = (nuevas) => {
    setCategorias(nuevas);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(nuevas));
  };

  const agregarCategoria = () => {
    const nueva = nuevaCategoria.trim();
    if (!nueva || categorias.includes(nueva)) return;
    guardarCategorias([...categorias, nueva]);
    setNuevaCategoria('');
  };

  const eliminarCategoria = (nombre) => {
    const nuevas = categorias.filter(cat => cat !== nombre);
    guardarCategorias(nuevas);
  };

  const editarCategoria = (index, nuevoNombre) => {
    const nuevo = nuevoNombre.trim();
    if (!nuevo) return;
    const nuevas = [...categorias];
    nuevas[index] = nuevo;
    guardarCategorias(nuevas);
  };

  const restablecerCategorias = () => {
    guardarCategorias(categoriasOriginales);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>

      <div className="mb-4 flex gap-2">
        <input
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={agregarCategoria} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Agregar
        </button>
      </div>

      <ul className="space-y-2 mb-6">
        {categorias.map((cat, index) => (
            <li key={index} className="flex items-center justify-between border p-2 rounded gap-2">
            <input
                type="text"
                value={ediciones[index] ?? cat} // Muestra lo editado o el original
                onChange={(e) =>
                setEdiciones((prev) => ({
                    ...prev,
                    [index]: e.target.value,
                }))
                }
                className="flex-grow px-2 py-1 border rounded"
            />
            <button
                onClick={() => {
                if (ediciones[index]) {
                    const nuevas = [...categorias];
                    nuevas[index] = ediciones[index];
                    setCategorias(nuevas);
                    setEdiciones((prev) => {
                    const actualizado = { ...prev };
                    delete actualizado[index];
                    return actualizado;
                    });
                }
                }}
                className="bg-blue-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
            >
                Guardar
            </button>
            <button
                onClick={() => eliminarCategoria(cat)}
                className="bg-red-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"
            >
                Eliminar
            </button>
            </li>
        ))}
        </ul>


      <button
        onClick={restablecerCategorias}
        className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800"
      >
        Restablecer categorías originales
      </button>
    </div>
  );
};

export default AdminCategorias;
