"use client"
import Applicacion from '@/components/Aplicacion/Aplicacion'
import EstructuraSecciones from '@/components/EstructuraSecciones/EstructuraSecciones'
import "@/components/EstructuraSecciones/EstructuraSecciones.scss"
import { useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import { zustand } from '@/zustand'
import { useSession } from 'next-auth/react'
import { FiRefreshCw } from "react-icons/fi";
import { pusherClient } from '@/services/pusher'
import { IoArrowBackSharp } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton'

const ChatDinamico = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [mensaje, setMensaje] = useState("")
    const { cambiante, setCambiante } = zustand()
    const [conversacion, setConversacion] = useState([])
    const [idDeConversacion, setIdDeConversacion] = useState("")
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)

    const enviarMensaje = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/mensajes`, {
                emisor: session?.user?.id,
                receptor: data[0]._id,
                mensajes: mensaje
            })

            if (response.status === 200 || response.status === 201) {
                setMensaje("")
                setCambiante(Date.now())
            } else {
                console.log("Error al enviar el mensaje");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
            } else {
                window.location.reload();
            }
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/request`)
                setData(response.data.busquedaClientes.filter((data) => data._id === params.id))
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [params.id])

    useEffect(() => {
        const fetchConversacion = async () => {
            try {
                const response = await axios.get(`/api/mensajes`, {
                    params: {
                        id: params.id
                    }
                });
                setConversacion(response.data.mensajeria[0].mensajes.reverse());
                setIdDeConversacion(response.data.mensajeria[0]._id);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConversacion();
    }, [cambiante, params.id]);

    useEffect(() => {
        const channel = pusherClient.subscribe(`${idDeConversacion}`);

        channel.bind("nuevo-mensaje", (data) => {
            setConversacion((prevConversacion) => [data, ...prevConversacion]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [idDeConversacion, params.id]);

    useEffect(() => {
        setTimeout(() => {
            if (conversacion.length === 0) {
                setLoading(false)
            }
        }, 1200);
    }, [conversacion])

    const mensajesTransformados = useMemo(() => {
        return conversacion.map((mensaje, index) => (
            <div key={index} className="mess" style={{ justifyContent: mensaje.emisor !== session?.user?.id ? "flex-start" : "flex-end" }}>
                <div className="mensaje">
                    <p> {mensaje.mensajes} </p>
                    <div className="hora-div">
                        <p className="hora-texto"> {new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(mensaje.hora))}  </p>
                    </div>
                </div>
            </div>
        ));
    }, [conversacion, session?.user?.id]); 

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
                                    {loading
                                        ?
                                        <Skeleton width={32} height={32} circle baseColor='var(--color-fondo-chat-secundario)' />
                                        :
                                        <Image src={data[0]?.imagenPerfil ? data[0]?.imagenPerfil : "/img/mew-perfil-chat.jpg"} style={{ borderRadius: "50%" }} className="imagen-superior" alt="Imagen de perfil" width={32} height={32} />
                                    }
                                </div>
                                <div className="nombre">
                                    <p className="nombre-text"> {data[0]?.email} </p>
                                </div>
                            </div>
                            <div className="contenedor-refresh">
                                <FiRefreshCw className="icono-de-refresh" onClick={() => setCambiante(Date.now())} />
                            </div>
                        </div>
                        <div className="contenido-del-chat">
                            <div className="contenido-del-chat">
                                {!loading
                                    ? mensajesTransformados 
                                    : (
                                        <div className='skeleton-de-contenido'>
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
                        <form onSubmit={enviarMensaje}>
                            <div className="enviados-de-mensajes">
                                <div className="input-mensaje">
                                    <input className="input-de-mensaje"
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                        type="text"
                                        placeholder="Escribí un mensaje..."
                                    />
                                </div>
                                <button type='submit'> Enviar </button>
                            </div>
                        </form>
                    </div>
                </div>
            </EstructuraSecciones>
        </Applicacion>
    )
}

export default ChatDinamico
