import { useState } from "react";
import axios from "axios";

interface UseSendMessageProps {
  onSuccess: () => void;
}

export const useSendMessage = ({ onSuccess }: UseSendMessageProps) => {
  const [sending, setSending] = useState(false);

  const sendMessage = async (emisorId: string, receptorId: string, mensaje: string) => {
    if (!mensaje.trim()) return;

    setSending(true);

    try {
      const response = await axios.post("/api/mensajes", {
        emisor: emisorId,
        receptor: receptorId,
        mensajes: mensaje,
      });

      if (response.status === 200 || response.status === 201) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      if (axios.isAxiosError(error) && !error.response?.data?.error) {
        window.location.reload();
      }
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending };
};
