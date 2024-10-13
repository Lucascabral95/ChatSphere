"use client"
import Dashboard from "@/components/Dashboard/Dashboard"
import "./Aplicacion.scss"

const Applicacion = ({ children }) => {

    return (
        <div className="application">
            <div className="contenedor-de-application">

                <Dashboard />

                <main>
                    {children}
                </main>

            </div>
        </div>
    )
}

export default Applicacion;