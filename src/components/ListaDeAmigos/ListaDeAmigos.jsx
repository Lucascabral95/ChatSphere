import "./ListaDeAmigos.scss";
import axios from "axios";

const getAmigos = async () => {
    const response = await axios.get("/api/amigos");
    
    return response.data;
};

const ListaDeAmigos = () => {

    return (
        <div className="lista-de-amigos" >
            <div className="contenedor-de-amigos">

              <p></p>

            </div>
        </div>
    )
}

export default ListaDeAmigos