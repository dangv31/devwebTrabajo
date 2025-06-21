import React from 'react';

const VerOrdenes = () => {
  const ordenes = [
  {
    id: 1001,
    cliente: 'Carlos Pérez',
    productos: ['Silla Gamer', 'Luces LED Caleñas'],
    total: 190000,
    estado: 'Pendiente',
    fecha: '2024-06-20T14:00:00Z',
  },
  {
    id: 1002,
    cliente: 'Sandra Gómez',
    productos: ['Taza de café Chinchinense'],
    total: 50000,
    estado: 'Entregado',
    fecha: '2024-06-19T10:30:00Z',
  },
  {
    id: 1003,
    cliente: 'Don Ramón',
    productos: ['Cama Montañera XXL'],
    total: 500000,
    estado: 'Cancelado',
    fecha: '2024-06-18T09:15:00Z',
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

  const ordenesOrdenadas = [...ordenes].sort(
  (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

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
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenesOrdenadas.map((orden) => (
                <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{orden.cliente}</td>
                    <td>{orden.productos.join(', ')}</td>
                    <td>${orden.total.toLocaleString()}</td>
                    <td>{new Date(orden.fecha).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    })}</td>
                    <td className={colorEstado(orden.estado)}>{orden.estado}</td>
                </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerOrdenes;
