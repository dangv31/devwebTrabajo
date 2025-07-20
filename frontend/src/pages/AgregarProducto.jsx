import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from "../context/AuthContext";


function AgregarProducto() {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);
  const { products, addProduct, editProduct } = useContext(ShopContext);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);


  const [tieneDescuento, setTieneDescuento] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioDescuento, setPrecioDescuento] = useState('');

  useEffect(() => {
  if (isEdit && products.length > 0) {
    const productoAEditar = products.find(p => p.id === parseInt(id));
    if (productoAEditar) {
      setNombre(productoAEditar.name);
      setStock(productoAEditar.stock);
      setCategoria(productoAEditar.category);
      setDescripcion(productoAEditar.description || '');
      setImagen(productoAEditar.image?.[0] || null);

      if (productoAEditar.oldPrice != null) {
        setTieneDescuento(true);
        setPrecio(productoAEditar.oldPrice);       // precio original
        setPrecioDescuento(productoAEditar.price);       // con descuento
      } else {
        setTieneDescuento(false);
        setPrecio(productoAEditar.price);          // único precio
        setPrecioDescuento('');
      }
    }
  }
}, [isEdit, id, products]);


  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }


  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda: Imagen */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-40 h-40 border border-gray-300 bg-white flex items-center justify-center rounded">
            {imagen ? (
              <img src={imagen} alt="Producto" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-2xl text-gray-400">❌</span>
            )}
          </div>

          <label className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14] mt-2">
            {imagen ? "Cambiar foto" : "Agregar foto"}
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
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              {tieneDescuento ? 'Precio original:' : 'Precio:'}
            </label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
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
            <label className="block font-medium mb-1">Precio con descuento:</label>
            <input
              type="text"
              value={precioDescuento}
              onChange={(e) => setPrecioDescuento(e.target.value)}
              disabled={!tieneDescuento}
              className="w-full border px-3 py-2 rounded bg-white disabled:bg-gray-100"
            />
          </div>


          <div>
            <label className="block font-medium mb-1">Stock:</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Categoría:</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Columna derecha: Descripción */}
        <div className="flex-1">
          <label className="block font-medium mb-1">Descripción:</label>
          <textarea
            rows="10"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
          onClick={() => {
            if (isEdit) {
                const productoParaEditar = {
                  name: nombre,
                  description: descripcion,
                  price: Number(precio),
                  discount: tieneDescuento ? Number(precioDescuento) : 0,
                  imageRoute: "/images/products/imagen_ejemplo.jpg", // Cambiar cuando subas imágenes reales
                  categoryName: categoria,
                  bestSeller: false,
                  stock: Number(stock),
                };

                fetch(`http://localhost:8080/products/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(productoParaEditar),
                })
                  .then((res) => {
                    if (!res.ok) throw new Error("Error al editar el producto");
                    return res.json();
                  })
                  .then(() => {
                    alert("Producto editado correctamente");
                    navigate("/admin");
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("Hubo un problema al editar el producto");
                  });

            } else {
              if (!nombre || !precio || !categoria || !stock) {
                alert("Por favor complete todos los campos obligatorios.");
                return;
              }

              const productoParaEnviar = {
                name: nombre,
                description: descripcion,
                price: Number(precio),
                discount: tieneDescuento ? Number(precioDescuento) : 0,
                imageRoute: "/images/products/imagen_ejemplo.jpg", // Ajusta esto si subes imágenes
                categoryName: categoria,
                bestSeller: false,
                stock: Number(stock)
              };

              fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productoParaEnviar)
              })
                .then(res => {
                  if (!res.ok) throw new Error("Error al agregar el producto");
                  return res.json();
                })
                .then(() => {
                  alert("Producto agregado correctamente");
                  navigate("/admin");
                })
                .catch(err => {
                  console.error(err);
                  alert("Hubo un problema al agregar el producto");
                });
            }
            }
          }
          className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14]"
        >
          {isEdit ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
      </div>
    </div>
  );
}

export default AgregarProducto;

