"use client"
import EstructuraSecciones from "@/components/EstructuraSecciones/EstructuraSecciones.jsx"
import "./App.scss"
import Applicacion from "@/components/Aplicacion/Aplicacion"
import Image from "next/image"
import Link from "next/link"
import DashboardMobile from "@/components/Dashboard/DashboardMobile"
import Footer from "@/components/Footer/Footer"

const NotFound = () => {

  return (
    <Applicacion titulo="404">
      <EstructuraSecciones titulo="404" childrenNotFound={ <Footer />}>

        <DashboardMobile />

        <div className="add-friends">
          <div className="titulo-de-secciones-grandes">
            <h2 className="tit-secciones"> Pagina No Encontrada </h2>
          </div>
          <div className="imagen-de-not-found">
            <Image
              src="https://www.shutterstock.com/image-vector/error-404-dogs-page-not-600nw-2412741677.jpg"
              width={500}
              height={300}
              alt="Error 404"
              className="imagen-not-found-desktop"
            />
            <Image
              src="https://www.shutterstock.com/image-vector/error-404-dogs-page-not-600nw-2412741677.jpg"
              width={330}
              height={198}
              alt="Error 404"
              className="imagen-not-found-mobile"
              style={{ display: "none" }}
            />
            <Link className="volver-inicio" href="/application/my-friends">
              Volver al inicio
            </Link>
          </div>
        </div>

      </EstructuraSecciones>
    </Applicacion>
  )
}

export default NotFound