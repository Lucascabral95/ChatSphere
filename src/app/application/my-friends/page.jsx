"use client"
import Applicacion from "@/components/Aplicacion/Aplicacion.jsx"
import DashboardMobile from "@/components/Dashboard/DashboardMobile.jsx"
import EstructuraSecciones from "@/components/EstructuraSecciones/EstructuraSecciones.jsx"
import "@/components/EstructuraSecciones/EstructuraSecciones.scss"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { useSession } from "next-auth/react"
import Skeleton from "react-loading-skeleton"
import moment from "moment"
import 'moment/locale/es';
import Footer from "@/components/Footer/Footer"
moment.locale('es');

const MyFriends = () => {
    const [dataAmigos, setDataAmigos] = useState([])
    const [idIdentificador, setIdIdentificador] = useState(null)
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const [sinAmigos, setSinAmigos] = useState(false)

    useEffect(() => {
        setIdIdentificador(session?.user?.id)
    }, [session])

    useEffect(() => {
        const traerAmigos = async () => {
            try {
                const { data } = await axios.get("/api/lista-amigos")
                setDataAmigos(data);
                setLoading(false)
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setTimeout(() => {
                        setLoading(false)
                        setSinAmigos(true)
                    }, 1200);
                } else {
                    console.log(error)
                }
            }
        }
        traerAmigos()
    }, [])

    return (
        <Applicacion>
            <EstructuraSecciones childrenNotFound={ <Footer />} >

                <DashboardMobile />

                <div className="add-friends">

                    {!sinAmigos &&
                        <div className="titulo-de-secciones-grandes">
                            <h2 className="tit-secciones"> Mis amigos </h2>
                        </div>
                    }

                    <div className="contenedor-card-amigos">
                        {!loading ? (
                            dataAmigos?.datosAmigos?.map((item, index) => (
                                <Link href={`/application/chat/${item.id}`} key={index} className="card-amigos">
                                    <div className="card-imagen">
                                        <Image
                                            style={{ borderRadius: "50%" }}
                                            src={item?.imagen === null || item?.imagen === undefined ? "/img/mew-perfil-chat.jpg" : item.imagen}
                                            alt="Imagen de perfil"
                                            className="card-imagen-img"
                                            width={40}
                                            height={40}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="card-nombre">
                                        <div className="card-mensaje-hora" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p className="card-nombre-texto"> {item.name.charAt(0).toUpperCase() + item.name.slice(1)} </p>
                                            <p className="hora-hora">
                                                {dataAmigos?.conversaciones?.find(i =>
                                                    (i.emisor === idIdentificador && i.receptor === item.id) ||
                                                    (i.receptor === idIdentificador && i.emisor === item.id)
                                                )?.mensajes?.slice(-1)[0]?.hora
                                                    ? moment(dataAmigos?.conversaciones?.find(i =>
                                                        (i.emisor === idIdentificador && i.receptor === item.id) ||
                                                        (i.receptor === idIdentificador && i.emisor === item.id)
                                                    )?.mensajes?.slice(-1)[0]?.hora).fromNow()
                                                    : ""}
                                            </p>
                                        </div>
                                        <p className="card-nombre-mensaje">
                                            {
                                                dataAmigos?.conversaciones?.find(i => i.emisor === idIdentificador && i.receptor === item.id ||
                                                    i.receptor === idIdentificador && i.emisor === item.id)?.mensajes[dataAmigos?.conversaciones?.find(i => i.emisor === idIdentificador && i.receptor === item.id ||
                                                        i.receptor === idIdentificador && i.emisor === item.id)?.mensajes.length - 1]?.mensajes ||
                                                `Sin mensajes hasta el momento...`
                                            }
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
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
                        )}
                        {sinAmigos &&
                            <div className="cont-sin-amigos">
                                <div className="contenedor-without-friends">
                                    <Image src="/img/sin-amigos.gif" alt="Sin amigos" width={500} height={400} className="imagen-without-friends" />
                                    <Image src="/img/sin-amigos.gif" alt="Sin amigos" width={320} height={260} className="imagen-without-friends-mobile" style={{ display: "none" }} />
                                    <div className="tituuu">
                                        <h3 className="titulo-de-sin-amigos"> Sin amigos  </h3>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>

            </EstructuraSecciones>
        </Applicacion>
    )
}

export default MyFriends