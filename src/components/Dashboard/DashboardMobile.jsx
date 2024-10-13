"use client"
import "./DashboardMobile.scss"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaUser, FaUserPlus, FaUserFriends } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardMobile = () => {
    const pathName = usePathname();
    const [rutaActual, setRutaActual] = useState("");

    useEffect(() => {
        setRutaActual(pathName);
    }, [pathName]);

    return (
        <motion.header className='dashboard-mobile'>
            <div className="contenedor-dashboard-mobile">

                <div className="dashboard-mobile-secciones">
                    <Link href="/application/my-friends" className="redireccion-dashboard"
                        style={{ backgroundColor: rutaActual === "/application/my-friends" && "#E9E9E9", boxShadow: rutaActual === "/application/my-friends" && "0px 1px 2px rgba(64, 46, 88, 0.2), 0px 2px 4px rgba(64, 46, 88, 0.14), 0px 4px 8px rgba(64, 46, 88, 0.12)" }} >
                        <div className="interior-dashboard">
                            <p className="dashboard-mobile-texto">Mis amigos</p>
                        </div>
                        <div className="ii">
                            <FaUserFriends className="dashboard-mobile-iconos" style={{ color: rutaActual === "/application/my-friends" && "var(--color-chat)" }} />
                        </div>
                    </Link>
                    <Link href="/application/friends-request" className="redireccion-dashboard"
                        style={{ backgroundColor: rutaActual === "/application/friends-request" && "#E9E9E9", boxShadow: rutaActual === "/application/friends-request" && "0px 1px 2px rgba(64, 46, 88, 0.2), 0px 2px 4px rgba(64, 46, 88, 0.14), 0px 4px 8px rgba(64, 46, 88, 0.12)" }} >
                        <div className="interior-dashboard">
                            <p className="dashboard-mobile-texto">Solicitudes de amistad</p>
                        </div>
                        <div className="ii">
                            <FaUserPlus className="dashboard-mobile-iconos" style={{ color: rutaActual === "/application/friends-request" && "var(--color-chat)" }} />
                        </div>
                    </Link>
                    <Link href="/application/add-friends" className="redireccion-dashboard"
                        style={{ backgroundColor: rutaActual === "/application/add-friends" && "#E9E9E9", boxShadow: rutaActual === "/application/add-friends" && "0px 1px 2px rgba(64, 46, 88, 0.2), 0px 2px 4px rgba(64, 46, 88, 0.14), 0px 4px 8px rgba(64, 46, 88, 0.12)" }} >
                        <div className="interior-dashboard">
                            <p className="dashboard-mobile-texto">Agregar amigos</p>
                        </div>
                        <div className="ii">
                            <FaUser className="dashboard-mobile-iconos" style={{ color: rutaActual === "/application/add-friends" && "var(--color-chat)" }} />
                        </div>
                    </Link>
                </div>

            </div>
        </motion.header>
    )
}

export default DashboardMobile