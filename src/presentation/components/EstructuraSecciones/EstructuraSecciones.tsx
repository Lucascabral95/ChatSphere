import "./EstructuraSecciones.scss";

interface EstructuraSeccionesProps {
  titulo?: string;
  children: React.ReactNode;
  childrenNotFound?: React.ReactNode;
}

const EstructuraSecciones = ({ titulo, children, childrenNotFound }: EstructuraSeccionesProps) => {
  return (
    <div className="EstructuraSecciones">
      <div className="contenedor-estructura-secciones">
        <main>{children}</main>

        {childrenNotFound}
      </div>
    </div>
  );
};

export default EstructuraSecciones;
