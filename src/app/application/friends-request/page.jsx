"use client"
import { useState } from 'react'
import Applicacion from '@/components/Aplicacion/Aplicacion'
import EstructuraSecciones from '@/components/EstructuraSecciones/EstructuraSecciones'
import "@/components/EstructuraSecciones/EstructuraSecciones.scss"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import DashboardMobile from '@/components/Dashboard/DashboardMobile'
import Footer from '@/components/Footer/Footer'

const Application = () => {
    const [destinatario, setDestinatario] = useState('')

    const invitarAmigo = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/sendEmail', {
                destinatario: destinatario
            });

            if (result.status === 200 || result.status === 201) {
                setDestinatario('');
                toast.success('Invitación por E-mail enviada con éxito', {
                    duration: 3500,
                    position: 'top-center'
                });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error(error.response.data.error, {
                        duration: 3500,
                        position: 'top-center'
                    });
                } else if (error.response.status === 400) {
                    toast.error(error.response.data.error, {
                        duration: 3500,
                        position: 'top-center'
                    });
                } else {
                    toast.error('Error desconocido, por favor intenta de nuevo.', {
                        duration: 3500,
                        position: 'top-center'
                    });
                }
            } else {
                console.error(error);
                toast.error('Hubo un problema al enviar el email, intenta más tarde.', {
                    duration: 3500,
                    position: 'top-center'
                });
            }
        }
    };

    return (
        <Applicacion>
            <EstructuraSecciones titulo="Friends request" childrenNotFound={<Footer />}>

                <DashboardMobile />

                <div className="add-friends">

                    <div className="titulo-de-secciones-grandes">
                        <h2 className="tit-secciones"> Solicitud de amistad </h2>
                    </div>
                    <div className="agregamiento-amigos">
                        <p> Invitá a tu amigo por E-mail </p>
                    </div>

                    <div className="input-agregamiento-amigo">
                        <form onSubmit={invitarAmigo}>
                            <div className="input">
                                <input type="email" required value={destinatario} placeholder="E-mail de tu amigo" onChange={(e) => setDestinatario(e.target.value)} />
                            </div>
                            <button type="submit"> Enviar E-mail </button>
                        </form>
                    </div>

                    <Toaster />

                </div>

            </EstructuraSecciones>
        </Applicacion>
    )
}

export default Application