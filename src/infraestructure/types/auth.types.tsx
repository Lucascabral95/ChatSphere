export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface RegisterErrors {
  email: string;
  password: string;
  general: string;
}

export const REGISTER_ERRORS = {
  USER_EXISTS: "El usuario ya existe",
  INVALID_CREDENTIALS: "Email y contraseña inválidos",
  PASSWORD_LENGTH: "La contraseña debe tener al menos 8 caracteres",
  PASSWORD_SPECIAL: "La contraseña debe tener al menos un signo especial",
  UNEXPECTED: "Ocurrió un error inesperado.",
} as const;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginError {
  message: string;
  field?: "email" | "password" | "general";
}

export const LOGIN_ERRORS = {
  INVALID_CREDENTIALS: "Email o contraseña inválidos. Por favor, verifica tus datos.",
  WRONG_PASSWORD: "La contraseña es incorrecta. Inténtalo nuevamente.",
  UNEXPECTED: "Ocurrió un error inesperado. Inténtalo más tarde.",
  SYSTEM: "Ocurrió un error en el sistema. Inténtalo más tarde.",
} as const;
