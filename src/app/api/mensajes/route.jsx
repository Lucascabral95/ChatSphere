import { NextResponse } from "next/server";
import Conversations from "@/models/Conversation.jsx";
import mongo from "@/services/Mongodb.jsx";
import { authOptions } from "@/services/authOptions";
import { getServerSession } from "next-auth";
import { upsTashDB } from "@/services/UpstashRedis.jsx";
import { pusherServer } from "@/services/pusher";

export async function GET(request) {
    await mongo();
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const receptorId = searchParams.get('id');

    const busquedaConversacion = await Conversations.find({
        $or: [
            { $and: [{ emisor: session?.user?.id }, { receptor: receptorId }] },
            { $and: [{ emisor: receptorId }, { receptor: session?.user?.id }] }
        ]
    });

    if (busquedaConversacion.length > 0) {
        const mensajes = await upsTashDB.lindex(`conversacion:${receptorId}`, -1);

        return NextResponse.json({
            mensajeria: busquedaConversacion,
            mensajes: mensajes
        }, { status: 200 });
    } else {
        return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }
}

export async function POST(req) {
    try {
        await mongo();
        const { emisor, receptor, mensajes } = await req.json();

        if (!emisor || !receptor || !mensajes) {
            return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
        }

        const conversacionYaExiste = await Conversations.findOne({
            $or: [
                { $and: [{ emisor: emisor }, { receptor: receptor }] },
                { $and: [{ emisor: receptor }, { receptor: emisor }] }
            ]
        });

        const mensajeData = {
            mensajes,
            emisor,
            receptor,
            hora: Date.now()
        };

        if (conversacionYaExiste) {
            conversacionYaExiste.mensajes.push(mensajeData);
            await conversacionYaExiste.save();

            await upsTashDB.rpush(`conversacion:${receptor}`, JSON.stringify(conversacionYaExiste));
            await upsTashDB.publish(`chat:${receptor}`, JSON.stringify(conversacionYaExiste));

            await pusherServer.trigger(`${conversacionYaExiste.id}`, "nuevo-mensaje", mensajeData);

            return NextResponse.json({ message: "Mensaje enviado correctamente" }, { status: 200 });
        } else {
            const nuevaConversacion = new Conversations({
                emisor,
                receptor,
                mensajes: [mensajeData],
            });

            await nuevaConversacion.save();

            await upsTashDB.rpush(`conversacion:${receptor}`, JSON.stringify(nuevaConversacion));
            await upsTashDB.publish(`chat:${receptor}`, JSON.stringify(nuevaConversacion));

            await pusherServer.trigger(`${conversacionYaExiste.id}`, "nuevo-mensaje", mensajeData);


            return NextResponse.json({ message: "Conversación creada y mensaje enviado" }, { status: 201 });
        }
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}