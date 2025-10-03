import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/infraestructure/services/authOptions";
import mongo from "@/infraestructure/services/Mongodb";
import Conversation from "@/infraestructure/models/Conversation";
import Users from "@/infraestructure/models/Users";

export async function GET() {
  try {
    await mongo();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const listaAmigos = await Users.findOne({ UID: session.user.id });

    if (!listaAmigos) {
      return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }

    const conversaciones = await Conversation.find({
      $or: [{ emisor: session.user.id }, { receptor: session.user.id }],
    });

    const datosAmigos = listaAmigos.friends;

    return NextResponse.json({ datosAmigos, conversaciones }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /friends:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
