import { useState, useEffect } from "react";
import axios from "axios";
import { ChatUser } from "@/infraestructure/types/chat.types";

export const useChatUser = (userId: string) => {
  const [user, setUser] = useState<ChatUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/request");
        const foundUser = data.busquedaClientes.find((user: ChatUser) => user._id === userId);
        setUser(foundUser || null);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading };
};
