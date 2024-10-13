import "./EstructuraSecciones.scss"

const EstructuraSecciones = ({ children, childrenNotFound }) => {

    return (
        <div className="EstructuraSecciones">
            <div className="contenedor-estructura-secciones">

                <main>
                    {children}
                </main>

                {childrenNotFound}

            </div>
        </div>
    )
}

export default EstructuraSecciones