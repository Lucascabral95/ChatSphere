"use client";
import StructureLoginRegister from '@/components/StructureLoginRegister/StructureLoginRegister.jsx'
import "./Login.scss";
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const registro = async (e) => {
        e.preventDefault();
    
        try {
            const result = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            });
    
            if (result.ok) {
                window.location.href = `/application/my-friends`;
            } else if (result.error) {
                if (result.error === "El email o la contraseña son inválidos") {
                    setError("Email o contraseña inválidos. Por favor, verifica tus datos.");
                } else if (result.error === "Contraseña incorrecta") {
                    setError("La contraseña es incorrecta. Inténtalo nuevamente.");
                } else {
                    setError("Ocurrió un error inesperado. Inténtalo más tarde.");
                }
            }
        } catch (error) {
            setError("Ocurrió un error en el sistema. Inténtalo más tarde.");
            console.log(error);
        }
    }; 

    useEffect(() => {
        if (email === "" || password === "") {
            setError("");
        }
    }, [email, password]);

    return (
        <StructureLoginRegister>
            <div className="div-login">

                <div className="datos-de-acceso">
                    <div className="cont">

                        <div className="titulo">
                            <h2> Iniciá sesión con tu cuenta </h2>
                        </div>
                        <div className="subtitulo">
                            <p> Tu puerta de acceso a una comunicación y conexión sin interrupciones </p>
                        </div>
                        <div className="boton-google" onClick={() => signIn('google')}>
                            <FcGoogle className="icon-google" /> <p> Log in with Google </p>
                        </div>
                        <div className="linea-delimitante">
                            <div className="linea"></div>
                            <p> O </p>
                            <div className="linea"></div>
                        </div>
                        <form onSubmit={registro} className="formulario-registro">
                            <div className="registro-form">
                                <label htmlFor="email"> Email </label>
                                <div className="contenedor-input">
                                    <input style={{ color: error !== "" ? "red" : "black" }} type="email" id="email" placeholder="Emily@hotmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="registro-form">
                                <label htmlFor="password"> Contraseña </label>
                                <div className="contenedor-input">
                                    <input style={{ color: error !== "" ? "red" : "black" }} type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            {error && <p className="texto-de-error">{error}</p>}
                            <button type="submit" className="boton-finzalizacion">
                                <p> Iniciar sesión </p>
                            </button>
                        </form>
                        <div className="tenes-cuenta">
                            <p> ¿No tenés una cuenta? <Link href="/auth/register" className="ir-al-login"> Registrate </Link> </p>
                        </div>

                    </div>
                </div>

            </div>
        </StructureLoginRegister>
    )
}

export default Login