// src/pages/SolicitudesEspeciales.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function SolicitudesEspeciales() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8080/products/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener solicitudes");
        return res.json();
      })
      .then((data) => setSolicitudes(data))
      .catch((err) => {
        console.error("Error al cargar solicitudes:", err);
        setError("No se pudieron cargar las solicitudes");
      });
  }, [token]);

  const notificarDisponibilidad = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/products/requests/${requestId}/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newStock: 5 }),
      });

      if (!response.ok) throw new Error("Error al notificar disponibilidad");

      alert(`Solicitud ${requestId} notificada correctamente`);
    } catch (error) {
      console.error("Error al notificar solicitud:", error);
      alert("No se pudo notificar la disponibilidad");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Solicitudes Especiales</h2>

      {error && <p className="text-red-500">{error}</p>}

      {solicitudes.length === 0 && !error ? (
        <p className="text-gray-500">No hay solicitudes especiales registradas.</p>
      ) : (
        solicitudes.map((s) => (
          <div key={s.requestId} className="border rounded p-4 mb-4 shadow">
            <div className="flex items-center gap-4 mb-2">
              <img
                src={s.productImageRoute}
                alt={s.productName}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{s.productName}</h3>
                <p><strong>Cantidad:</strong> {s.quantity}</p>
                <p><strong>Email:</strong> {s.requestedByEmail}</p>
                <p><strong>Comentario:</strong> {s.comment}</p>
                <p><strong>Fecha:</strong> {s.requestDate}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className={`font-medium ${s.status === 'COMPLETADA' ? 'text-green-600' : 'text-blue-600'}`}>
                    {s.status}
                  </span>
                </p>
              </div>

              {s.status !== 'COMPLETADA' && (
                <button
                  onClick={() => notificarDisponibilidad(s.requestId)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Notificar disponibilidad
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SolicitudesEspeciales;
