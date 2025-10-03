"use client";
import { MdLogout } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import { useFooter } from "@/presentation/hooks/useFooter";

const Footer = () => {
  const { userEmail, isLoading, handleLogout } = useFooter();

  return (
    <footer className="footer-mobile" style={{ display: "none" }}>
      <div className="contenedor-datos-logout">
        <div className="c-footer-email">
          {!isLoading && userEmail ? (
            <p className="footer-email">{userEmail}</p>
          ) : (
            <Skeleton
              className="footer-email"
              width={100}
              baseColor="var(--color-fondo-chat-secundario)"
              height={20}
              count={1}
            />
          )}
        </div>
        <div className="c-footer-logout">
          <button
            className="btn-logout"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
            disabled={isLoading}
          >
            <MdLogout className="icon-logout-footer" />
          </button>
        </div>
      </div>
      <div className="footer-mis-datos">
        <h4 className="mis-datos-footer">
          Designed and handcrafted by{" "}
          <a
            href="https://github.com/Lucascabral95"
            target="_blank"
            rel="noopener noreferrer"
            className="link-redes"
          >
            Lucas Cabral
          </a>{" "}
          🚀🚀🚀👨‍💻
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
