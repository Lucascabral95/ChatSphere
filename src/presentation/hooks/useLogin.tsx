import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { LOGIN_ERRORS } from "@/infraestructure/types/auth.types";

interface UseLoginReturn {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleGoogleLogin: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email === "" || password === "") {
      setError("");
    }
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        window.location.href = "/application/my-friends";
      } else if (result?.error) {
        handleLoginError(result.error);
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError(LOGIN_ERRORS.SYSTEM);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (errorMessage: string) => {
    switch (errorMessage) {
      case "El email o la contraseña son inválidos":
        setError(LOGIN_ERRORS.INVALID_CREDENTIALS);
        break;
      case "Contraseña incorrecta":
        setError(LOGIN_ERRORS.WRONG_PASSWORD);
        break;
      default:
        setError(LOGIN_ERRORS.UNEXPECTED);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
  };
};
