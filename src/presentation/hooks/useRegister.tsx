import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { REGISTER_ERRORS } from "@/infraestructure/types/auth.types";

interface UseRegisterReturn {
  name: string;
  email: string;
  password: string;
  errorEmail: string;
  errorPassword: string;
  errorGeneral: string;
  loading: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  handleGoogleRegister: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (email === "") {
  //     setErrorEmail("");
  //   }

  //   if (password === "") {
  //     setErrorPassword("");
  //   }

  //   if (email !== "" && password !== "") {
  //     setErrorGeneral("");
  //   }
  // }, [email, password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorGeneral("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    clearErrors();

    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (result.status === 201) {
        window.location.href = "/auth/login";
      }
    } catch (err) {
      handleRegisterError(err as AxiosError<{ error: string }>);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterError = (error: AxiosError<{ error: string }>) => {
    if (error.response?.data?.error) {
      const errorMessage = error.response.data.error;

      switch (errorMessage) {
        case REGISTER_ERRORS.USER_EXISTS:
          setErrorEmail(errorMessage);
          break;
        case REGISTER_ERRORS.INVALID_CREDENTIALS:
          setErrorGeneral(errorMessage);
          break;
        case REGISTER_ERRORS.PASSWORD_LENGTH:
        case REGISTER_ERRORS.PASSWORD_SPECIAL:
          setErrorPassword(errorMessage);
          break;
        default:
          setErrorGeneral(REGISTER_ERRORS.UNEXPECTED);
      }
    } else {
      setErrorGeneral(REGISTER_ERRORS.UNEXPECTED);
    }

    console.error("Error en registro:", error);
  };

  const clearErrors = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorGeneral("");
  };

  const handleGoogleRegister = () => {
    signIn("google");
  };

  return {
    name,
    email,
    password,
    errorEmail,
    errorPassword,
    errorGeneral,
    loading,
    setName,
    setEmail,
    setPassword,
    handleRegister,
    handleGoogleRegister,
  };
};
