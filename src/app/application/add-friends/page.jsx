"use client"
import Applicacion from "@/components/Aplicacion/Aplicacion"
import EstructuraSecciones from "@/components/EstructuraSecciones/EstructuraSecciones"
import "@/components/EstructuraSecciones/EstructuraSecciones.scss"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { zustand } from "@/zustand.jsx"
import toast, { Toaster } from 'react-hot-toast';
import DashboardMobile from "@/components/Dashboard/DashboardMobile"
import Footer from "@/components/Footer/Footer"

const AddFriends = () => {
    const { data: session } = useSession()
    const [amigo, setAmigo] = useState("")
    const [exito, setExito] = useState(false)
    const [relleno, setRelleno] = useState(false)
    const [errorEmailPropio, setErrorEmailPropio] = useState(false)
    const { setAmigos, cambiante, setCambiante } = zustand();

    const invitarAmigo = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.get("/api/request");
            const amigoFiltrado = result.data.busquedaClientes.find(friend => friend.email === amigo.toLowerCase());

            if (amigoFiltrado) {
                setExito(true);
                setAmigo("");
                const fri = amigoFiltrado._id;

                const response = await axios.post("/api/request", {
                    id: fri,
                    email: amigoFiltrado.email,
                    name: amigoFiltrado.name,
                    imagen: amigoFiltrado.imagenPerfil,
                    miID: session?.user?.id
                });

                if (response.status === 200 || response.status === 201) {
                    setCambiante(Date.now());
                    setRelleno(true);
                    toast.success(`Agregaste a ${amigo}`, {
                        duration: 3500,
                        position: 'top-center',
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    });
                }
            } else {
                toast.error(`El usuario ${amigo} no se encuentra registrado`, {
                    duration: 3500,
                    position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                });
                setRelleno(true);
                setExito(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.error, {
                    duration: 3500,
                    position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                });
                setRelleno(false);
                setErrorEmailPropio(true);
            } else {
                toast.error("Error desconocido, por favor intenta de nuevo.", {
                    duration: 3500,
                    position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                });
            }
            console.error("Error en la solicitud:", error);
        }
    };

    useEffect(() => {
        setRelleno(false)
    }, [cambiante])

     useEffect(() => {
         if (!amigo) {
              setRelleno(false)
              setErrorEmailPropio(false)
         }
     }, [ amigo ])

    useEffect(() => {
        const fetchAmigos = async () => {
            try {
                const res = await axios.get("/api/lista-amigos");
                setAmigos(res.data.datosAmigos);
            } catch (error) {
                console.error("Error al obtener amigos:", error);
            }
        };

        fetchAmigos();

    }, [exito, relleno, cambiante]);

    return (
        <Applicacion>
            <EstructuraSecciones childrenNotFound={<Footer />} >

                <DashboardMobile />

                <div className="add-friends">

                    <div className="titulo-de-secciones-grandes">
                        <h2 className="tit-secciones"> Agregar amigos </h2>
                    </div>
                    <div className="agregamiento-amigos">
                        <p> Agregá a tu amigo por E-mail </p>
                    </div>

                    <div className="input-agregamiento-amigo">
                        <form onSubmit={invitarAmigo}>
                            <div className="input">
                                <input type="email" required value={amigo} placeholder="E-mail de tu amigo" onChange={(e) => setAmigo(e.target.value)} />
                            </div>
                            <button type="submit"> Agregar </button>
                        </form>
                    </div>

                    {
                        relleno && amigo
                            ?
                            exito
                                ?
                                <div className="respuesta-solicitud">
                                    <p className="respuesta-positiva"> Agregaste como amigo a {amigo}. </p>
                                </div>
                                :
                                <div className="respuesta-solicitud">
                                    <p className="respuesta-negativa"> Tu amigo {amigo} no está registrado en la aplicación </p>
                                </div>
                            :
                            null
                    }

                    {errorEmailPropio && !relleno &&
                      <div className="respuesta-solicitud">
                        <p className="respuesta-negativa"> No podés agregarte a vos mismo como amigo </p>
                      </div>
                    }



                    <Toaster />

                </div>
            </EstructuraSecciones>
        </Applicacion>
    )
}

export default AddFriends;