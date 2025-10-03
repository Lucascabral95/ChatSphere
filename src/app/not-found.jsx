"use client";
import Image from "next/image";
import Link from "next/link";

import Applicacion from "@/presentation/components/Aplication/Aplication";
import EstructuraSecciones from "@/presentation/components/EstructuraSecciones/EstructuraSecciones";
import DashboardMobile from "@/presentation/components/Dashboard/DashboardMobile";
import Footer from "@/presentation/components/Footer/Footer";
import "./App.scss";

const NotFound = () => {
  return (
    <Applicacion>
      <EstructuraSecciones titulo="404" childrenNotFound={<Footer />}>
        <DashboardMobile />

        <div className="add-friends">
          <div className="titulo-de-secciones-grandes">
            <h2 className="tit-secciones">Página No Encontrada</h2>
          </div>

          <div className="imagen-de-not-found">
            <Image
              src="/img/error-404.webp"
              width={500}
              height={300}
              alt="Error 404 - Página no encontrada"
              className="imagen-not-found-desktop"
              priority
            />
            <Image
              src="/img/error-404.webp"
              width={330}
              height={198}
              alt="Error 404 - Página no encontrada"
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
  );
};

export default NotFound;
