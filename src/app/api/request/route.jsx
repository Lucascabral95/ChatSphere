import { NextResponse } from "next/server";
import mongo from "@/services/Mongodb.jsx";
import Cliente from "@/models/Client.jsx";
import Users from "@/models/Users.jsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";

export async function GET() {
    await mongo();

    const busquedaClientes = await Cliente.find()

    if (busquedaClientes) {
        return NextResponse.json({ busquedaClientes }, { status: 200 });
    } else {
        return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }
}

export async function POST(req) {
    try {
        await mongo(); 
        const session = await getServerSession(authOptions);
        const { id, email, imagen, name, miID } = await req.json();

        if (!session?.user) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        } 
        
        if (session?.user?.email === email) {
            return NextResponse.json({ error: "No podés agregarte como amigo" }, { status: 403 });
        }

        async function agregarAmigo(usuarioID, amigoID, amigoData, usuarioData) {
            let usuario = await Users.findOne({ UID: usuarioID });
            let amigo = await Users.findOne({ UID: amigoID });

            if (!usuario) {
                usuario = new Users({
                    email: usuarioData.email,
                    UID: usuarioID,
                    friends: [amigoData]
                });
                await usuario.save();
            } else {
                const amigoExistente = usuario.friends.find(f => f.id === amigoID);
                if (!amigoExistente) {
                    usuario.friends.push(amigoData);
                    await usuario.save();
                }
            }

            if (!amigo) {
                amigo = new Users({
                    email: amigoData.email,
                    UID: amigoID,
                    friends: [{
                        id: usuarioID,
                        name: usuarioData.name,
                        email: usuarioData.email,
                        imagen: usuarioData.image
                    }]
                });
                await amigo.save();
            } else {
                const usuarioExistenteEnAmigo = amigo.friends.find(f => f.id === usuarioID);
                if (!usuarioExistenteEnAmigo) {
                    amigo.friends.push({
                        id: usuarioID,
                        name: usuarioData.name,
                        email: usuarioData.email,
                        imagen: usuarioData.image
                    });
                    await amigo.save();
                }
            }
        }

        await agregarAmigo(miID, id, { id, name, email, imagen }, session.user);
        await agregarAmigo(id, miID, {
            id: miID,
            name: session.user.name,
            email: session.user.email,
            imagen: session.user.image
        }, { name, email, image: imagen });

        return NextResponse.json({ message: "Amigo agregado exitosamente" }, { status: 201 });

    } catch (error) {
        console.error('Error en POST:', error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}