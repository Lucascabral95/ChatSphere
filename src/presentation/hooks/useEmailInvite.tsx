import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "./useToast";
import { TOAST_MESSAGES } from "@/infraestructure/constants/toast";

interface EmailInviteResult {
  success: boolean;
  message?: string;
}

interface ErrorResponse {
  error: string;
}

export const useEmailInvite = () => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const sendEmailInvite = useCallback(
    async (email: string): Promise<EmailInviteResult> => {
      if (!email.trim()) {
        return { success: false };
      }

      setIsLoading(true);

      try {
        const { status } = await axios.post("/api/sendEmail", {
          destinatario: email,
        });

        if (status === 200 || status === 201) {
          showSuccess(TOAST_MESSAGES.emailSentSuccess);
          return { success: true };
        }

        return { success: false };
      } catch (error) {
        handleEmailError(error, showError);
        return { success: false };
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  return { sendEmailInvite, isLoading };
};

const handleEmailError = (error: unknown, showError: (msg: string) => void) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      if (status === 404 || status === 400) {
        showError(data.error || TOAST_MESSAGES.unknownError);
      } else {
        showError(TOAST_MESSAGES.unknownError);
      }
    } else {
      showError(TOAST_MESSAGES.emailSendError);
    }
  } else {
    console.error("Error inesperado:", error);
    showError(TOAST_MESSAGES.emailSendError);
  }
};
