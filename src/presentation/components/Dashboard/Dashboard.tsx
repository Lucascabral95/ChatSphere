"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaUser, FaUserPlus, FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import { zustand } from "@/zustand";
import { useFriends } from "@/presentation/hooks";
import "./Dashboard.scss";

const Dashboard = () => {
  const { data: session } = useSession();
  const { amigos, cambiante } = zustand();
  const { loading, hasNoFriends } = useFriends([cambiante]);

  const friendsList = useMemo(() => amigos || [], [amigos]);

  return (
    <div className="dashboard">
      <div className="contenedor-de-dashboard">
        <div className="seccion-perfil-secciones">
          <header className="imagen-perfil">
            <Link href="/application/my-friends">
              <h1 className="titulo-de-la-app">ChatSphere</h1>
            </Link>
          </header>

          {!hasNoFriends && (
            <div className="subtitulo-secciones">
              <p className="subtitulo-secciones-text">Mis amigos</p>
            </div>
          )}

          <div className="array-de-amigos">
            {!loading
              ? friendsList.map((amigo: any, index: number) => (
                  <Link href={`/application/chat/${amigo.id}`} key={index} className="friends">
                    <p className="friends-text">
                      {amigo.email.charAt(0).toUpperCase() + amigo.email.slice(1)}
                    </p>
                  </Link>
                ))
              : [...Array(4)].map((_, index: number) => (
                  <div key={index} className="friends">
                    <Skeleton style={{ width: "100%" }} height={20} />
                  </div>
                ))}
          </div>

          {hasNoFriends && (
            <div className="contenedor-sin-amigos">
              <div className="img">
                <Image
                  src="/img/sin-amigos.gif"
                  alt="Sin amigos"
                  width={300}
                  height={300}
                  className="img-sin-amigos"
                />
                <h3 className="sin-amigos-titulo">Sin amigos</h3>
              </div>
            </div>
          )}

          <div className="subtitulo-secciones subtitulo-selecciones-general">
            <p className="subtitulo-secciones-text">Descripción general</p>
          </div>

          <Link href="/application/my-friends" className="icono">
            <div className="cont-icon">
              <FaUserFriends className="icon" />
            </div>
            <p className="text-icon">Lista de amigos</p>
          </Link>

          <Link href="/application/add-friends" className="icono">
            <div className="cont-icon">
              <FaUserPlus className="icon" />
            </div>
            <p className="text-icon">Agregar amigo</p>
          </Link>

          <Link href="/application/friends-request" className="icono">
            <div className="cont-icon">
              <FaUser className="icon" />
            </div>
            <p className="text-icon">Invitar amigo</p>
          </Link>
        </div>

        <footer className="seccion-logout">
          <div className="datos">
            <div className="imagen-de-perfil">
              <Image
                style={{ borderRadius: "50%" }}
                className="img-logout"
                src="/img/mew-perfil-chat.jpg"
                alt="Imagen de perfil"
                width={24}
                height={24}
              />
            </div>
            <div className="cuenta-personal">
              <p className="text-logout">{session?.user?.email}</p>
            </div>
          </div>
          <div className="icono-logout" onClick={() => signOut()}>
            <MdLogout className="icon-logout" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
