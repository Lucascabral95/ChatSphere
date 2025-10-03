"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import "moment/locale/es";

import EstructuraSecciones from "@/presentation/components/EstructuraSecciones/EstructuraSecciones";
import Footer from "@/presentation/components/Footer/Footer";
import Applicacion from "@/presentation/components/Aplication/Aplication";
import {
  findConversation,
  getLastMessage,
  getLastMessageTime,
} from "@/presentation/utils/messageHelpers";
import { Friend } from "@/infraestructure/types";
import { useFriendsList } from "@/presentation/hooks";
import DashboardMobile from "@/presentation/components/Dashboard/DashboardMobile";

moment.locale("es");

const MyFriends = () => {
  const { data: session } = useSession();
  const { friendsData, loading, hasNoFriends } = useFriendsList();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(session?.user?.id || null);
  }, [session]);

  const friendsList = useMemo(() => {
    return friendsData?.datosAmigos ?? [];
  }, [friendsData]);

  return (
    <Applicacion>
      <EstructuraSecciones titulo="Mis amigos" childrenNotFound={<Footer />}>
        <DashboardMobile />
        <div className="add-friends">
          {!hasNoFriends && (
            <div className="titulo-de-secciones-grandes">
              <h2 className="tit-secciones">Mis amigos</h2>
            </div>
          )}

          <div className="contenedor-card-amigos">
            {!loading && friendsList.length > 0 ? (
              friendsList.map((item: Friend, index: number) => {
                const conversation = findConversation(friendsData?.conversaciones, userId, item.id);

                return (
                  <Link href={`/application/chat/${item.id}`} key={index} className="card-amigos">
                    <div className="card-imagen">
                      <Image
                        style={{ borderRadius: "50%" }}
                        src={
                          item?.imagen === null || item?.imagen === undefined
                            ? "/img/mew-perfil-chat.jpg"
                            : item.imagen
                        }
                        alt="Imagen de perfil"
                        className="card-imagen-img"
                        width={40}
                        height={40}
                        objectFit="cover"
                      />
                    </div>
                    <div className="card-nombre">
                      <div
                        className="card-mensaje-hora"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <p className="card-nombre-texto">
                          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </p>
                        <p className="hora-hora">{getLastMessageTime(conversation)}</p>
                      </div>
                      <p className="card-nombre-mensaje">{getLastMessage(conversation)}</p>
                    </div>
                  </Link>
                );
              })
            ) : loading ? (
              <div className="skeleton-de-grupo-amigos">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="card-amigos-skeleton">
                    <div className="card-imagen">
                      <Skeleton circle={true} height={40} width={40} />
                    </div>
                    <div className="card-nombre">
                      <Skeleton height={20} className="skeleton-de-nombre" />
                      <Skeleton height={17} className="skeleton-de-mensaje" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {hasNoFriends && (
              <div className="cont-sin-amigos">
                <div className="contenedor-without-friends">
                  <Image
                    src="/img/sin-amigos.gif"
                    alt="Sin amigos"
                    width={500}
                    height={400}
                    className="imagen-without-friends"
                  />
                  <Image
                    src="/img/sin-amigos.gif"
                    alt="Sin amigos"
                    width={320}
                    height={260}
                    className="imagen-without-friends-mobile"
                    style={{ display: "none" }}
                  />
                  <div className="tituuu">
                    <h3 className="titulo-de-sin-amigos">Sin amigos</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </EstructuraSecciones>
    </Applicacion>
  );
};

export default MyFriends;
