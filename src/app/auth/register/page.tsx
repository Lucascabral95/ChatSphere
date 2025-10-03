"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import StructureLoginRegister from "@/presentation/components/StructureLoginRegister/StructureLoginRegister";
import { useRegister } from "@/presentation/hooks/useRegister";
import "../../auth/login/Login.scss";

const Register = () => {
  const {
    name,
    email,
    password,
    errorEmail,
    errorPassword,
    errorGeneral,
    loading,
    setName,
    setEmail,
    setPassword,
    handleRegister,
    handleGoogleRegister,
  } = useRegister();

  const hasEmailError = errorEmail !== "" || errorGeneral !== "";
  const hasPasswordError = errorPassword !== "" || errorGeneral !== "";

  return (
    <StructureLoginRegister>
      <div className="div-login">
        <div className="datos-de-acceso">
          <div className="cont">
            <div className="titulo">
              <h2>Creá gratis una cuenta</h2>
            </div>

            <div className="subtitulo">
              <p>Unite a la conversación y mantenete conectado de manera sencilla.</p>
            </div>

            <div className="boton-google" onClick={handleGoogleRegister}>
              <FcGoogle className="icon-google" />
              <p>Registrate con Google</p>
            </div>

            <div className="linea-delimitante">
              <div className="linea"></div>
              <p>O</p>
              <div className="linea"></div>
            </div>

            <form onSubmit={handleRegister} className="formulario-registro">
              <div className="registro-form">
                <label htmlFor="name">Nombre</label>
                <div className="contenedor-input">
                  <input
                    type="text"
                    id="name"
                    placeholder="Emily"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="registro-form">
                <label htmlFor="email">Email</label>
                <div className="contenedor-input">
                  <input
                    style={{ color: hasEmailError ? "red" : "black" }}
                    type="email"
                    id="email"
                    placeholder="Emily@hotmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="registro-form">
                <label htmlFor="password">Contraseña</label>
                <div className="contenedor-input">
                  <input
                    style={{ color: hasPasswordError ? "red" : "black" }}
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="detalle-password">
                  <p className="texto-detalle">
                    *La contraseña debe tener al menos 8 caracteres y al menos un carácter especial*
                  </p>
                </div>
              </div>

              {errorEmail && <p className="texto-de-error">{errorEmail}</p>}
              {errorPassword && <p className="texto-de-error">{errorPassword}</p>}
              {errorGeneral && <p className="texto-de-error">{errorGeneral}</p>}

              <button
                type="submit"
                className="boton-finzalizacion"
                disabled={loading || !name.trim() || !email.trim() || !password.trim()}
              >
                <p>{loading ? "Registrando..." : "Registrate"}</p>
              </button>
            </form>

            <div className="tenes-cuenta">
              <p>
                ¿Ya tenés una cuenta?{" "}
                <Link href="/auth/login" className="ir-al-login">
                  Iniciá sesión
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="informacion-de-acceso"></div>
      </div>
    </StructureLoginRegister>
  );
};

export default Register;
