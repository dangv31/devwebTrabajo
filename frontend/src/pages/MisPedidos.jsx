import React, { useEffect, useState } from "react";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosGuardados.reverse()); // Mostramos el más reciente primero
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-600">No hay pedidos registrados todavía.</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border rounded p-4 shadow">
                <div className="mb-2 font-semibold flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <div>
                    Orden #{pedido.id} - 
                    <span className="text-sm text-gray-500">
                    {new Date(pedido.fecha).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </span>
                    </div>
                    <span className={`text-xs sm:text-sm px-2 py-1 rounded font-medium
                    ${pedido.estado === "Pendiente" ? "bg-yellow-100 text-yellow-700" :
                        pedido.estado === "Entregado" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"}
                    `}>
                    {pedido.estado}
                    </span>
                </div>
                <div className="space-y-2">
                    {pedido.productos.map((prod, i) => (
                    <div key={i} className="flex justify-between text-sm border-b pb-1">
                        <span>{prod.nombre}</span>
                        <span>Cant: {prod.cantidad}</span>
                        <span>${(prod.precio * prod.cantidad).toLocaleString('es-CO')}</span>
                    </div>
                    ))}
                </div>
                <div className="text-right mt-3 font-bold text-black">
                    Total: ${pedido.productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0).toLocaleString('es-CO')}
                </div>
                </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPedidos;
