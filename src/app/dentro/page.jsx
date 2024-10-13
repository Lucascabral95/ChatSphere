"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { pusherClient2 } from "@/services/pusher";

const Dentro = () => {
    const [emisor, setEmisor] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [conversacion, setConversacion] = useState([]);

    const enviarMensajes = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/prueba", {
                emisor: emisor,
                mensaje: mensaje,
            });

            if (response.status === 200 || response.status === 201) {
                setMensaje("");
                setEmisor("");
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log(error.response.data.error);
                } else if (error.response.status === 400) {
                    console.log(error.response.data.error);
                } else {
                    console.log("Error desconocido, por favor intenta de nuevo.");
                }
            }
        }
    }

    useEffect(( ) => {
          const datosTiempoReal = async () => {
               const { data } = await axios.get("/api/prueba");
               setConversacion(data.charlas);
          }
          
          datosTiempoReal();
    }, []);

    useEffect(() => {
        const channel = pusherClient2.subscribe("conversacion");
        channel.bind("actualizar-conversacion", (data) => {
            setConversacion((prev) => [...prev, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [])

    return (
        <div>

            <h1> Prueba de Pusher con conversaciones con persistencia de estado en Mongo DB </h1>

            <form onSubmit={enviarMensajes}>
                <label htmlFor="emisor">Emisor</label>
                <input type="text" name="emisor" value={emisor} onChange={(e) => setEmisor(e.target.value)} required />

                <label htmlFor="mensaje">Mensaje</label>
                <input type="text" name="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required />
                <button type="submit" onClick={enviarMensajes}> Enviar </button>
            </form>

            <h4> Conversacion en persistencia de la conversacion en tiempo real: </h4>

            {conversacion.map((item, index) => (
                <div key={index}>
                    <p>{item.emisor}: {item.mensaje}</p>
                </div>
            ))}

        </div>
    );
};

export default Dentro;
