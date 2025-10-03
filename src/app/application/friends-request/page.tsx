"use client";
import { useState, FormEvent } from "react";
import { Toaster } from "react-hot-toast";

import EstructuraSecciones from "@/presentation/components/EstructuraSecciones/EstructuraSecciones";
import DashboardMobile from "@/presentation/components/Dashboard/DashboardMobile";
import Footer from "@/presentation/components/Footer/Footer";
import { useEmailInvite } from "@/presentation/hooks/useEmailInvite";
import "@/presentation/components/EstructuraSecciones/EstructuraSecciones.scss";
import Applicacion from "@/presentation/components/Aplication/Aplication";

const Application = () => {
  const [email, setEmail] = useState("");
  const { sendEmailInvite, isLoading } = useEmailInvite();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    const result = await sendEmailInvite(email);

    if (result.success) {
      setEmail("");
    }
  };

  return (
    <Applicacion>
      <EstructuraSecciones titulo="Friends request" childrenNotFound={<Footer />}>
        <DashboardMobile />

        <div className="add-friends">
          <div className="titulo-de-secciones-grandes">
            <h2 className="tit-secciones">Solicitud de amistad</h2>
          </div>

          <div className="agregamiento-amigos">
            <p>Invitá a tu amigo por E-mail</p>
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
                {isLoading ? "Enviando..." : "Enviar E-mail"}
              </button>
            </form>
          </div>

          <Toaster />
        </div>
      </EstructuraSecciones>
    </Applicacion>
  );
};

export default Application;
