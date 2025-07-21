import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        if (!user || !token) return;

        const response = await fetch("http://localhost:8080/orders/my-orders", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener los pedidos");
        }

        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setPedidos([]);
      }
    };

    fetchPedidos();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-600">No hay pedidos registrados todavía.</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.orderId} className="border rounded p-4 shadow">
              <div className="mb-2 font-semibold flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <div>
                  Orden #{pedido.orderId} -{" "}
                  <span className="text-sm text-gray-500">
                    {pedido.orderDate}
                  </span>
                </div>
                <span
                  className={`text-xs sm:text-sm px-2 py-1 rounded font-medium
                    ${pedido.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : pedido.status === "Entregado"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}
                  `}
                >
                  {pedido.status}
                </span>
              </div>

              <div className="space-y-2">
                {pedido.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm border-b pb-1">
                    <span>{item.productName}</span>
                    <span>Cant: {item.quantity}</span>
                    <span>
                      ${(item.quantity * item.priceAtPurchase).toLocaleString("es-CO")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-right mt-3 font-bold text-black">
                Total: ${pedido.totalAmount.toLocaleString("es-CO")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPedidos;
