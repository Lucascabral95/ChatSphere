import { useState } from "react";
import axios, { AxiosError } from "axios";

interface UseSendTestMessageReturn {
  sendMessage: (emisor: string, mensaje: string) => Promise<boolean>;
  sending: boolean;
  error: string | null;
}

export const useSendTestMessage = (): UseSendTestMessageReturn => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (emisor: string, mensaje: string): Promise<boolean> => {
    if (!emisor.trim() || !mensaje.trim()) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    setSending(true);
    setError(null);

    try {
      const response = await axios.post("/api/prueba", {
        emisor,
        mensaje,
      });

      if (response.status === 200 || response.status === 201) {
        return true;
      }

      return false;
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        if (status === 404 || status === 400) {
          setError(data.error || "Error al enviar mensaje");
        } else {
          setError("Error desconocido, por favor intenta de nuevo.");
        }
      } else {
        setError("Error de conexión");
      }

      console.error("Error al enviar mensaje:", err);
      return false;
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending, error };
};
