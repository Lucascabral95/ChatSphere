"use client";

import Dashboard from "@/presentation/components/Dashboard/Dashboard";
import "./Aplicacion.scss";

interface ApplicacionProps {
  children: React.ReactNode;
}

const Applicacion = ({ children }: ApplicacionProps) => {
  return (
    <div className="application">
      <div className="contenedor-de-application">
        <Dashboard />

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Applicacion;
