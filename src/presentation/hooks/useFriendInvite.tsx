import { useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useToast } from "./useToast";
import { zustand } from "@/zustand";
import { TOAST_MESSAGES } from "@/infraestructure/constants";

interface InviteResult {
  success: boolean;
  message?: string;
}

export const useFriendInvite = () => {
  const { data: session } = useSession();
  const { showSuccess, showError } = useToast();
  const { setCambiante } = zustand();
  const [isLoading, setIsLoading] = useState(false);

  const inviteFriend = useCallback(
    async (email: string): Promise<InviteResult> => {
      if (!email || !session?.user?.id) {
        return { success: false };
      }

      setIsLoading(true);

      try {
        const { data } = await axios.get("/api/request");
        const friend = data.busquedaClientes.find((f: any) => f.email === email.toLowerCase());

        if (!friend) {
          showError(TOAST_MESSAGES.userNotFound(email));
          return {
            success: false,
            message: `Tu amigo ${email} no está registrado en la aplicación`,
          };
        }

        const response = await axios.post("/api/request", {
          id: friend._id,
          email: friend.email,
          name: friend.name,
          imagen: friend.imagenPerfil,
          miID: session.user.id,
        });

        if (response.status === 200 || response.status === 201) {
          setCambiante(Date.now());
          showSuccess(TOAST_MESSAGES.friendAdded(email));
          return { success: true };
        }

        return { success: false };
      } catch (error: any) {
        if (error.response?.status === 403) {
          const errorMsg = error.response.data.error || TOAST_MESSAGES.cannotAddYourself;
          showError(errorMsg);
          return { success: false, message: errorMsg };
        } else {
          showError(TOAST_MESSAGES.unknownError);
          return { success: false, message: TOAST_MESSAGES.unknownError };
        }
      } finally {
        setIsLoading(false);
      }
    },
    [session?.user?.id, showSuccess, showError, setCambiante]
  );

  return { inviteFriend, isLoading };
};
