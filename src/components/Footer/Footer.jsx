"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { MdLogout } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const Footer = () => {
    const { data: session } = useSession()

    return (
        <footer className="footer-mobile" style={{ display: "none" }}>
            <div className="contenedor-datos-logout">
                <div className="c-footer-email">
                    {session?.user
                        ?
                        <p className="footer-email"> {session?.user?.email} </p>
                        :
                        <Skeleton className="footer-email" width={100} baseColor="var(--color-fondo-chat-secundario)" height={20} count={1} />
                    }
                </div>
                <div className="c-footer-logout">
                    <button className="btn-logout">
                        <MdLogout onClick={() => signOut()} className="icon-logout-footer" />
                    </button>
                </div>
            </div>
            <div className="footer-mis-datos">
                <h4 className="mis-datos-footer">
                    Designed and handcrafted by <a href="https://github.com/Lucascabral95" target="_blank" rel="noreferrer" className="link-redes">Lucas Cabral</a> 🚀🚀🚀👨‍💻 </h4>
            </div>
        </footer>
    )
}

export default Footer;