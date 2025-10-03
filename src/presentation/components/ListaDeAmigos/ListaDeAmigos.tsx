"use client";

import { useAmigos } from "@/presentation/hooks/useAmigos";
import "./ListaDeAmigos.scss";

const ListaDeAmigos = () => {
  const { amigos, loading, error } = useAmigos();

  if (loading) {
    return (
      <div className="lista-de-amigos">
        <div className="contenedor-de-amigos">
          <p>Cargando amigos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-de-amigos">
        <div className="contenedor-de-amigos">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-de-amigos">
      <div className="contenedor-de-amigos">
        {amigos.length > 0 ? (
          amigos.map((amigo) => (
            <div key={amigo.id} className="amigo-item">
              <p>{amigo.name}</p>
              <p>{amigo.email}</p>
            </div>
          ))
        ) : (
          <p>No hay amigos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListaDeAmigos;
