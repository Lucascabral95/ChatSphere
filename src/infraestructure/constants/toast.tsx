export const TOAST_CONFIG = {
  duration: 3500,
  position: "top-center" as const,
  style: {
    background: "#363636",
    color: "#fff",
  },
};

export const TOAST_MESSAGES = {
  friendAdded: (email: string) => `Agregaste a ${email}`,
  userNotFound: (email: string) => `El usuario ${email} no se encuentra registrado`,
  cannotAddYourself: "No podés agregarte a vos mismo como amigo",
  unknownError: "Error desconocido, por favor intenta de nuevo.",
  emailSentSuccess: "Invitación por E-mail enviada con éxito",
  emailSendError: "Hubo un problema al enviar el email, intenta más tarde.",
};
