import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Pedidos() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const obtenerOrdenes = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener las órdenes");
        }

        const data = await response.json();
        setOrdenes(data);
      } catch (error) {
        setError("Error al cargar las órdenes");
        console.error(error);
      }
    };

    if (token) {
      obtenerOrdenes();
    }
  }, [token]);

  const confirmarEnvio = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}/delivered`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al confirmar envío");
      }

      // Actualizar estado local (marcar como entregado)
      setOrdenes((prevOrdenes) =>
        prevOrdenes.map((orden) =>
          orden.orderId === orderId ? { ...orden, status: "Entregado" } : orden
        )
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo confirmar el envío");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {ordenes.length === 0 && !error && <p>No hay pedidos.</p>}
      <ul>
        {ordenes.map((orden) => (
          <li
            key={orden.orderId}
            className="border p-4 mb-4 rounded shadow bg-white"
          >
            <p><strong>ID:</strong> {orden.orderId}</p>
            <p><strong>Fecha:</strong> {orden.orderDate}</p>
            <p><strong>Estado:</strong> {orden.status}</p>
            <p>
              <strong>Productos:</strong>{" "}
              {Array.isArray(orden.items) && orden.items.length > 0 ? (
                orden.items.map((item, index) => (
                  <span key={index}>
                    {item.productName} x{item.quantity}
                    {index < orden.items.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                <span>No hay productos</span>
              )}
            </p>
            <p><strong>Total:</strong> ${orden.totalAmount}</p>
            {orden.status === "Pendiente" && (
              <button
                onClick={() => confirmarEnvio(orden.orderId)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                Confirmar envío
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedidos;
