"use client";
import { useState, FormEvent } from "react";
import { Toaster } from "react-hot-toast";
import { zustand } from "@/zustand";

import EstructuraSecciones from "@/presentation/components/EstructuraSecciones/EstructuraSecciones";
import DashboardMobile from "@/presentation/components/Dashboard/DashboardMobile";
import Footer from "@/presentation/components/Footer/Footer";
import "@/presentation/components/EstructuraSecciones/EstructuraSecciones.scss";
import { useFriendInvite, useFriends } from "@/presentation/hooks";
import Applicacion from "@/presentation/components/Aplication/Aplication";

const AddFriends = () => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { inviteFriend, isLoading } = useFriendInvite();
  const { cambiante } = zustand();

  useFriends([cambiante]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setShowSuccess(false);
    setShowError(false);
    setErrorMessage("");

    const result = await inviteFriend(email);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
      setEmail("");
    } else {
      setShowError(true);
      setErrorMessage(result.message || "Error al agregar amigo");
      setTimeout(() => {
        setShowError(false);
        setErrorMessage("");
      }, 3500);
    }
  };

  return (
    <Applicacion>
      <EstructuraSecciones titulo="Agregar amigos" childrenNotFound={<Footer />}>
        <DashboardMobile />

        <div className="add-friends">
          <div className="titulo-de-secciones-grandes">
            <h2 className="tit-secciones">Agregar amigos</h2>
          </div>

          <div className="agregamiento-amigos">
            <p>Agregá a tu amigo por E-mail</p>
          </div>

          <div className="input-agregamiento-amigo">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="E-mail de tu amigo"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button type="submit" disabled={isLoading || !email.trim()}>
                {isLoading ? "Agregando..." : "Agregar"}
              </button>
            </form>
          </div>

          {showSuccess && email && (
            <div className="respuesta-solicitud">
              <p className="respuesta-positiva">Agregaste como amigo a {email}.</p>
            </div>
          )}

          {showError && (
            <div className="respuesta-solicitud">
              <p className="respuesta-negativa">
                {errorMessage || "Tu amigo no está registrado en la aplicación"}
              </p>
            </div>
          )}

          <Toaster />
        </div>
      </EstructuraSecciones>
    </Applicacion>
  );
};

export default AddFriends;
