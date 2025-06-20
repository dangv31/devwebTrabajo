import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AgregarProducto() {
  const navigate = useNavigate();
  const [tieneDescuento, setTieneDescuento] = useState(false);
  const [imagen, setImagen] = useState(null);

  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Nuevo Producto</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda: Imagen */}
        <div className="flex flex-col items-center gap-2">
          {/* Cuadro blanco para mostrar imagen o X */}
          <div
            className="w-40 h-40 border border-gray-300 bg-white flex items-center justify-center rounded"
          >
            {imagen ? (
              <img src={imagen} alt="Producto" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-2xl text-gray-400">❌</span>
            )}
          </div>

          {/* Botón para subir imagen */}
          <label className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14] mt-2">
            Agregar foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenSeleccionada}
              className="hidden"
            />
          </label>
        </div>

        {/* Columna central: Campos */}
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <label className="block font-medium mb-1">Nombre:</label>
            <input type="text" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Precio:</label>
            <input type="text" className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="descuento"
              checked={tieneDescuento}
              onChange={() => setTieneDescuento(!tieneDescuento)}
            />
            <label htmlFor="descuento" className="font-medium">
              ¿Tiene descuento?
            </label>
          </div>

          <div>
            <label className="block font-medium mb-1">Descuento:</label>
            <input
              type="text"
              disabled={!tieneDescuento}
              className="w-full border px-3 py-2 rounded bg-white disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Stock:</label>
            <input type="text" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Categoría:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option value="">Seleccionar</option>
              <option value="sillas">Tecnologia</option>
              <option value="mesas">Electrodomesticos</option>
              <option value="oficina">Hogar</option>
              <option value="sillas">Oficina</option>
              <option value="mesas">Decoracion</option>
              <option value="oficina">Muebles</option>
              <option value="">Salud</option>
              <option value="sillas">Ropa</option>
              <option value="mesas">Aseo</option>
              <option value="oficina">Papeleria</option>
              <option value="sillas">Jugueteria</option>
              <option value="mesas">Herramientas</option>
              <option value="oficina">Cocina</option>
              <option value="mesas">Iluminacion</option>
              <option value="oficina">Mascotas</option>

            </select>
          </div>
        </div>

        {/* Columna derecha: Descripción */}
        <div className="flex-1">
          <label className="block font-medium mb-1">Descripción:</label>
          <textarea
            rows="10"
            className="w-full border px-3 py-2 rounded"
            placeholder="Escribe una descripción del producto..."
          />
        </div>
      </div>

      {/* Botones al pie */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => navigate('/admin')}
          className="bg-[#7D7D7D] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#6A6A6A]"
        >
          Cancelar
        </button>
        <button
          onClick={() => alert('Producto agregado (simulado)')}
          className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14]"
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
}

export default AgregarProducto;

