import React, { useEffect, useState } from 'react';

const VerOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const ordenesGuardadas = JSON.parse(localStorage.getItem("pedidos")) || [];
    setOrdenes(ordenesGuardadas);
  }, []);

  const colorEstado = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'text-yellow-600 font-semibold';
      case 'Entregado':
        return 'text-green-600 font-semibold';
      case 'Cancelado':
        return 'text-red-600 font-semibold';
      default:
        return '';
    }
  };

  const ordenesOrdenadas = [...ordenes].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        ¡Bienvenido, mijo! Aquí puede echarle un ojito a las órdenes que han llegado.
      </h1>

      {ordenes.length > 0 && (
        <button
          onClick={() => {
            localStorage.removeItem("pedidos");
            setOrdenes([]);
          }}
          className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 cursor-pointer rounded shadow"
        >
          Borrar todas las órdenes
        </button>
      )}

      {ordenes.length === 0 ? (
        <p className="text-gray-600">No hay órdenes todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left bg-white shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b"># Orden</th>
                <th className="px-4 py-2 border-b">Cliente</th>
                <th className="px-4 py-2 border-b">Productos</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Fecha</th>
                <th className="px-4 py-2 border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenesOrdenadas.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>{orden.cliente || "Invitado"}</td>
                  <td>{orden.productos.map(p => p.nombre).join(', ')}</td>
                  <td>${orden.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toLocaleString()}</td>
                  <td>{new Date(orden.fecha).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      }</td>
                  <td className={colorEstado(orden.estado)}>{orden.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerOrdenes;
