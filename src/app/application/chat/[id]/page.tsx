"use client";
import { useState, useMemo, FormEvent } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { FiRefreshCw } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";

import EstructuraSecciones from "@/presentation/components/EstructuraSecciones/EstructuraSecciones";
import { zustand } from "@/zustand";
import "@/presentation/components/EstructuraSecciones/EstructuraSecciones.scss";
import { useChatConversation, useChatUser, useSendMessage } from "@/presentation/hooks";
import Applicacion from "@/presentation/components/Aplication/Aplication";

const ChatDinamico = () => {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const { cambiante, setCambiante } = zustand();
  const [mensaje, setMensaje] = useState("");

  const chatId = params?.id || "";

  const { user, loading: userLoading } = useChatUser(chatId);
  const { messages, loading: messagesLoading } = useChatConversation({
    chatId,
    trigger: cambiante,
  });

  const { sendMessage, sending } = useSendMessage({
    onSuccess: () => {
      setMensaje("");
      setCambiante(Date.now());
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.id || !user?._id || !mensaje.trim()) return;

    await sendMessage(session.user.id, user._id, mensaje);
  };

  const messagesList = useMemo(() => {
    return messages.map((msg, index) => {
      const isOwnMessage = msg.emisor === session?.user?.id;
      const messageTime = new Intl.DateTimeFormat("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(msg.hora));

      return (
        <div
          key={index}
          className="mess"
          style={{ justifyContent: isOwnMessage ? "flex-end" : "flex-start" }}
        >
          <div className="mensaje">
            <p>{msg.mensajes}</p>
            <div className="hora-div">
              <p className="hora-texto">{messageTime}</p>
            </div>
          </div>
        </div>
      );
    });
  }, [messages, session?.user?.id]);

  return (
    <Applicacion>
      <EstructuraSecciones>
        <div className="chat-dinamico">
          <div className="dit">
            <div className="datos-superiores">
              <div className="imagen-perfil-nombre">
                <div onClick={() => window.history.back()} className="icono-back">
                  <IoArrowBackSharp className="icono-de-back" />
                </div>
                <div className="image-profilee">
                  {userLoading ? (
                    <Skeleton
                      width={32}
                      height={32}
                      circle
                      baseColor="var(--color-fondo-chat-secundario)"
                    />
                  ) : (
                    <Image
                      src={user?.imagenPerfil || "/img/mew-perfil-chat.jpg"}
                      style={{ borderRadius: "50%" }}
                      className="imagen-superior"
                      alt="Imagen de perfil"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <div className="nombre">
                  <p className="nombre-text">{user?.email}</p>
                </div>
              </div>
              <div className="contenedor-refresh">
                <FiRefreshCw
                  className="icono-de-refresh"
                  onClick={() => setCambiante(Date.now())}
                />
              </div>
            </div>

            <div className="contenido-del-chat">
              <div className="contenido-del-chat">
                {!messagesLoading ? (
                  messagesList
                ) : (
                  <div className="skeleton-de-contenido">
                    <div className="imagen-de-espera">
                      <Image
                        src="/img/react-loading.svg"
                        className="imagen-gato-skeleton"
                        alt="Loading"
                        width={70}
                        height={70}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="enviados-de-mensajes">
                <div className="input-mensaje">
                  <input
                    className="input-de-mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    type="text"
                    placeholder="Escribí un mensaje..."
                    disabled={sending}
                  />
                </div>
                <button type="submit" disabled={sending || !mensaje.trim()}>
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </EstructuraSecciones>
    </Applicacion>
  );
};

export default ChatDinamico;
