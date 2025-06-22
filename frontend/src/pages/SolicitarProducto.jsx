import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function SolicitarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    const prod = products.find(p => p.id === parseInt(id));
    if (prod) setProducto(prod);
  }, [id, products]);

  const handleSubmit = () => {
    alert(`Solicitud enviada:\nProducto: ${producto.name}\nCantidad: ${cantidad}\nComentario: ${comentario}`);
    navigate('/');
  };

  if (!producto) return <p className="p-8">Cargando producto...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">¡Pida mijo que yo se lo consigo!</h1>

      <p className="mb-2 font-semibold">Producto: {producto.name}</p>

      <label className="block mb-1">Cantidad:</label>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-1">Comentario adicional:</label>
      <textarea
        rows="4"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="Como la quiere mijo? Haga sino pedir"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="mt-2 bg-[#D4A017] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#B48C14]"
        >
          Enviar solicitud
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 bg-[#7D7D7D] text-white px-4 py-2 cursor-pointer rounded hover:bg-[#6A6A6A]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default SolicitarProducto;
