import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { zustand } from "@/zustand";

interface Friend {
  id: string;
  email: string;
  name: string;
  imagen?: string;
}

interface UseFriendsReturn {
  loading: boolean;
  hasNoFriends: boolean;
}

export const useFriends = (dependencies: any[] = []): UseFriendsReturn => {
  const { setAmigos } = zustand();
  const [loading, setLoading] = useState(true);
  const [hasNoFriends, setHasNoFriends] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await axios.get("/api/lista-amigos");
        setAmigos(data.datosAmigos);
        setLoading(false);
        setHasNoFriends(false);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;

        if (axiosError.response?.data?.error) {
          setTimeout(() => {
            setLoading(false);
            setHasNoFriends(true);
          }, 1200);
        } else {
          console.error("Error al obtener amigos:", error);
          setLoading(false);
        }
      }
    };

    fetchFriends();
  }, dependencies);

  return { loading, hasNoFriends };
};
