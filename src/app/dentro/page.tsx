"use client";
import { useState, FormEvent } from "react";

import { useSendTestMessage, useTestConversation } from "@/presentation/hooks";

const Dentro = () => {
  const [emisor, setEmisor] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { messages, loading } = useTestConversation();
  const { sendMessage, sending, error } = useSendTestMessage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await sendMessage(emisor, mensaje);

    if (success) {
      setMensaje("");
      setEmisor("");
    }
  };

  return (
    <div>
      <h1>Prueba de Pusher con conversaciones con persistencia de estado en Mongo DB</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emisor">Emisor</label>
        <input
          type="text"
          id="emisor"
          name="emisor"
          value={emisor}
          onChange={(e) => setEmisor(e.target.value)}
          required
          disabled={sending}
        />

        <label htmlFor="mensaje">Mensaje</label>
        <input
          type="text"
          id="mensaje"
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          disabled={sending}
        />

        <button type="submit" disabled={sending || !emisor.trim() || !mensaje.trim()}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p>Error: {error}</p>
        </div>
      )}

      <h4>Conversación en persistencia de la conversación en tiempo real:</h4>

      {loading ? (
        <p>Cargando mensajes...</p>
      ) : messages.length > 0 ? (
        messages.map((item, index) => (
          <div key={index}>
            <p>
              <strong>{item.emisor}:</strong> {item.mensaje}
            </p>
          </div>
        ))
      ) : (
        <p>No hay mensajes todavía</p>
      )}
    </div>
  );
};

export default Dentro;
