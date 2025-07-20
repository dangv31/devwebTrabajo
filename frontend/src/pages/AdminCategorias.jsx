// src/pages/AdminCategorias.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const { token } = useContext(AuthContext);

  // Obtener categorías del backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8080/categories");
        setCategorias(res.data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // Crear nueva categoría
  const agregarCategoria = async () => {
    const nombre = nuevaCategoria.trim();
    if (!nombre || categorias.some(c => c.name.toLowerCase() === nombre.toLowerCase())) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/categories",
        { name: nombre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategorias([...categorias, res.data]);
      setNuevaCategoria("");
    } catch (err) {
      console.error("Error al crear categoría:", err);
    }
  };

  // Eliminar categoría
  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(categorias.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
    }
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
        <button
          onClick={agregarCategoria}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Agregar Categoría
        </button>
      </div>

      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{cat.name}</span>
            <button
              onClick={() => eliminarCategoria(cat.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
            >
              Borrar Categoría
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategorias;
