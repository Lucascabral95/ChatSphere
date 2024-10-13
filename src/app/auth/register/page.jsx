"use client";
import StructureLoginRegister from '@/components/StructureLoginRegister/StructureLoginRegister.jsx'
import "../../auth/login/Login.scss";
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordEmail, setErrorPasswordEmail] = useState("");

    const registro = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("/api/auth/register", {
                name: name,
                email: email,
                password: password,
            });

            if (result.status === 200) {
                window.location.href = "/auth/login";
            }

        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                const errorMap = {
                    "El usuario ya existe": setErrorEmail,
                    "Email y contraseña inválidos": setErrorPasswordEmail,
                    "La contraseña debe tener al menos 8 caracteres": setErrorPassword,
                    "La contraseña debe tener al menos un signo especial": setErrorPassword,
                };

                if (errorMap[errorMessage]) {
                    errorMap[errorMessage](errorMessage);
                } else {
                    setErrorEmail("Ocurrió un error inesperado.");
                }
            } else {
                setErrorEmail("Ocurrió un error inesperado.");
            }
        }
    }

    useEffect(() => {
        if (email === "") {
            setErrorEmail("");
        }

        if (password === "") {
            setErrorPassword("");
        }

        if (email !== "" && password !== "") {
            setErrorPasswordEmail("");
        }

    }, [email, password]);

    return (
        <StructureLoginRegister>
            <div className="div-login">

                <div className="datos-de-acceso">
                    <div className="cont">

                        <div className="titulo">
                            <h2> Creá gratis una cuenta </h2>
                        </div>
                        <div className="subtitulo">
                            <p> Unite a la conversación y mantenete conectado de manera sencilla. </p>
                        </div>
                        <div className="boton-google" onClick={() => signIn('google')}>
                            <FcGoogle className="icon-google" /> <p> Registrate con Google </p>
                        </div>
                        <div className="linea-delimitante">
                            <div className="linea"></div>
                            <p> O </p>
                            <div className="linea"></div>
                        </div>
                        <form onSubmit={registro} className="formulario-registro">
                            <div className="registro-form">
                                <label htmlFor="name"> Nombre </label>
                                <div className="contenedor-input">
                                    <input type="text" id="name" placeholder="Emily" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="registro-form">
                                <label htmlFor="email"> Email </label>
                                <div className="contenedor-input">
                                    <input style={{ color: errorEmail !== "" || errorPasswordEmail !== "" ? "red" : "black" }} type="email" id="email" placeholder="Emily@hotmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="registro-form">
                                <label htmlFor="password"> Contraseña </label>
                                <div className="contenedor-input">
                                    <input style={{ color: errorPassword !== "" || errorPasswordEmail !== "" ? "red" : "black" }} type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="detalle-password">
                                    <p className="texto-detalle"> *La contraseña debe tener al menos 8 caracteres y al menos un carácter especial* </p>
                                </div>
                            </div>
                            {errorEmail && <p className="texto-de-error"> {errorEmail} </p>}
                            {errorPassword && <p className="texto-de-error"> {errorPassword} </p>}
                            {errorPasswordEmail && <p className="texto-de-error"> {errorPasswordEmail} </p>}
                            <button type="submit" className="boton-finzalizacion">
                                <p> Registrate </p>
                            </button>
                        </form>
                        <div className="tenes-cuenta">
                            <p> ¿Ya tenés una cuenta? <Link href="/auth/login" className="ir-al-login"> Iniciá sesión </Link> </p>
                        </div>

                    </div>
                </div>

                <div className="informacion-de-acceso">

                </div>

            </div>
        </StructureLoginRegister>
    )
}

export default Login