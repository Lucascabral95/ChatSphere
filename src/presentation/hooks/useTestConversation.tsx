import { useState, useEffect } from "react";
import axios from "axios";

import { pusherClient2 } from "@/infraestructure/services/pusher";
import { TestMessage, TestConversationResponse } from "@/infraestructure/types/test.types";

export const useTestConversation = () => {
  const [messages, setMessages] = useState<TestMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get<TestConversationResponse>("/api/prueba");
        setMessages(data.charlas);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const channel = pusherClient2.subscribe("conversacion");

    channel.bind("actualizar-conversacion", (newMessage: TestMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return { messages, loading };
};
