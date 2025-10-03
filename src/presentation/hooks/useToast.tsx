import { toast } from "react-hot-toast";
import { TOAST_CONFIG } from "@/infraestructure/constants/toast";

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, TOAST_CONFIG);
  };

  const showError = (message: string) => {
    toast.error(message, TOAST_CONFIG);
  };

  return { showSuccess, showError };
};
