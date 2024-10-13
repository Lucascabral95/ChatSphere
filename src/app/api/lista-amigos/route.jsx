import { getServerSession } from "next-auth";
import mongo from "@/services/Mongodb.jsx";
import Users from "@/models/Users.jsx";
import { NextResponse } from "next/server";
import { authOptions } from "@/services/authOptions";
import Conversation from "@/models/Conversation.jsx";

export async function GET() {
    await mongo();
    const session = await getServerSession(authOptions);

    const listaAmigos = await Users.findOne({ UID: session?.user?.id });

    const conversaciones = await Conversation.find({
        $or: [{ emisor: session?.user?.id }, { receptor: session?.user?.id }]
    });

    const datosAmigos = listaAmigos?.friends;

    if (listaAmigos) {
        return NextResponse.json({ datosAmigos: datosAmigos, conversaciones: conversaciones }, { status: 200 });
    } else {
        return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }
}