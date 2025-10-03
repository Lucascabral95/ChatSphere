"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import StructureLoginRegister from "@/presentation/components/StructureLoginRegister/StructureLoginRegister";
import { useLogin } from "@/presentation/hooks/useLogin";
import "./Login.scss";

const Login = () => {
  const { email, password, error, loading, setEmail, setPassword, handleLogin, handleGoogleLogin } =
    useLogin();

  const inputStyle = {
    color: error !== "" ? "red" : "black",
  };

  return (
    <StructureLoginRegister>
      <div className="div-login">
        <div className="datos-de-acceso">
          <div className="cont">
            <div className="titulo">
              <h2>Iniciá sesión con tu cuenta</h2>
            </div>

            <div className="subtitulo">
              <p>Tu puerta de acceso a una comunicación y conexión sin interrupciones</p>
            </div>

            <div className="boton-google" onClick={handleGoogleLogin}>
              <FcGoogle className="icon-google" />
              <p>Log in with Google</p>
            </div>

            <div className="linea-delimitante">
              <div className="linea"></div>
              <p>O</p>
              <div className="linea"></div>
            </div>

            <form onSubmit={handleLogin} className="formulario-registro">
              <div className="registro-form">
                <label htmlFor="email">Email</label>
                <div className="contenedor-input">
                  <input
                    style={inputStyle}
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
                    style={inputStyle}
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {error && <p className="texto-de-error">{error}</p>}

              <button
                type="submit"
                className="boton-finzalizacion"
                disabled={loading || !email.trim() || !password.trim()}
              >
                <p>{loading ? "Iniciando sesión..." : "Iniciar sesión"}</p>
              </button>
            </form>

            <div className="tenes-cuenta">
              <p>
                ¿No tenés una cuenta?{" "}
                <Link href="/auth/register" className="ir-al-login">
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </StructureLoginRegister>
  );
};

export default Login;
