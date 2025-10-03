import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { FriendsData } from "@/infraestructure/types/friends.types";

interface UseFriendsListReturn {
  friendsData: FriendsData | null;
  loading: boolean;
  hasNoFriends: boolean;
}

export const useFriendsList = (): UseFriendsListReturn => {
  const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasNoFriends, setHasNoFriends] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await axios.get<FriendsData>("/api/lista-amigos");
        setFriendsData(data);
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
  }, []);

  return { friendsData, loading, hasNoFriends };
};
