import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from "../context/AuthContext";


function AgregarProducto() {
  const [imagenFile, setImagenFile] = useState(null); // archivo real para subir
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);
  const { products, addProduct, editProduct, fetchProducts } = useContext(ShopContext);

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
      setCategoria(productoAEditar.categoryName);
      setDescripcion(productoAEditar.description || '');
      setImagen(productoAEditar.imageRoute); // ✅ Cargar imagen desde URL

      if (productoAEditar.discount != 0) {
        setTieneDescuento(true);
        setPrecio(productoAEditar.price);
        setPrecioDescuento(productoAEditar.discount);
      } else {
        setTieneDescuento(false);
        setPrecio(productoAEditar.price);
        setPrecioDescuento('');
      }
    }
  }
}, [isEdit, id, products]);

const subirImagen = async () => {
  if (!imagenFile) return null;

  const formData = new FormData();
  formData.append("file", imagenFile);

  const res = await fetch("http://localhost:8080/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al subir imagen");
  const data = await res.json();
  return data.fileUrl; // URL absoluta
};



  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file); // Guardamos el archivo real
      setImagen(URL.createObjectURL(file)); // Vista previa
    }
  };

  const getFullImageUrl = (imageRoute) => {
    const baseUrl = "http://localhost:8080";
    if (!imageRoute) return "";

    // 👉 No modificar si es una URL completa o un blob
    if (
      imageRoute.startsWith("http://") ||
      imageRoute.startsWith("https://") ||
      imageRoute.startsWith("blob:")
    ) {
      return imageRoute;
    }

    // 👉 Si es una ruta relativa, prepender la base URL
    return `${baseUrl}${imageRoute}`;
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
              <img src={getFullImageUrl(imagen)} alt="producto" className="max-w-full max-h-full object-contain" />
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
          onClick={async () => {
            if (!nombre || !precio || !categoria || !stock) {
              alert("Por favor complete todos los campos obligatorios.");
              return;
            }

            try {
              let imageUrlFinal = imagen; // si es edición y no se cambió la imagen

              if (imagenFile) {
                imageUrlFinal = await subirImagen(); // Subimos imagen nueva
              }

              const body = {
                name: nombre,
                description: descripcion,
                price: Number(precio),
                discount: tieneDescuento ? Number(precioDescuento) : 0,
                imageRoute: imageUrlFinal, // ✅ guardamos el link recibido
                categoryName: categoria,
                bestSeller: false,
                stock: Number(stock),
              };

              const url = isEdit
                ? `http://localhost:8080/products/${id}`
                : "http://localhost:8080/products";

              const method = isEdit ? "PUT" : "POST";

              const res = await fetch(url, {
                method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
              });

              if (!res.ok) throw new Error("Error al guardar producto");

              await fetchProducts();
              
              alert(isEdit ? "Producto editado correctamente" : "Producto agregado correctamente");
              navigate("/admin");
            } catch (err) {
              console.error(err);
              alert("Hubo un problema al guardar el producto");
            }
          }}

          className="bg-[#D4A017] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#B48C14]"
        >
          {isEdit ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
      </div>
    </div>
  );
}

export default AgregarProducto;

