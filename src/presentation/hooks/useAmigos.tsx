import { useState, useEffect } from "react";
import axios from "axios";

interface Amigo {
  id: string;
  name: string;
  email: string;
  imagen?: string;
}

interface UseAmigosReturn {
  amigos: Amigo[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAmigos = (): UseAmigosReturn => {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAmigos = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get("/api/amigos");
      setAmigos(data);
    } catch (err) {
      console.error("Error al cargar amigos:", err);
      setError("No se pudieron cargar los amigos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmigos();
  }, []);

  return { amigos, loading, error, refetch: fetchAmigos };
};
