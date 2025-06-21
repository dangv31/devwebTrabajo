import React from 'react';

const VerOrdenes = () => {
  const ordenes = [
    {
      id: 1001,
      cliente: 'Carlos Pérez',
      productos: ['Silla Gamer', 'Luces LED Caleñas'],
      total: 190000,
      estado: 'Pendiente',
    },
    {
      id: 1002,
      cliente: 'Sandra Gómez',
      productos: ['Taza de café Chinchinense'],
      total: 50000,
      estado: 'Entregado',
    },
    {
      id: 1003,
      cliente: 'Don Ramón',
      productos: ['Cama Montañera XXL'],
      total: 500000,
      estado: 'Cancelado',
    },
  ];

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        ¡Bienvenido, mijo! Aquí puede echarle un ojito a las órdenes que han llegado.
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b"># Orden</th>
              <th className="px-4 py-2 border-b">Cliente</th>
              <th className="px-4 py-2 border-b">Productos</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{orden.id}</td>
                <td className="px-4 py-2 border-b">{orden.cliente}</td>
                <td className="px-4 py-2 border-b">{orden.productos.join(', ')}</td>
                <td className="px-4 py-2 border-b">${orden.total.toLocaleString()}</td>
                <td className={`px-4 py-2 border-b ${colorEstado(orden.estado)}`}>
                  {orden.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerOrdenes;
