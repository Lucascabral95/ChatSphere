import { NextResponse, NextRequest } from "next/server";
import { pusherServer } from "@/infraestructure/services/pusher";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/infraestructure/services/authOptions";
import mongo from "@/infraestructure/services/Mongodb";
import { upsTashDB } from "@/infraestructure/services/UpstashRedis";
import Conversations from "@/infraestructure/models/Conversation";

export async function GET(request: NextRequest) {
  try {
    await mongo();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const receptorId = searchParams.get("id");

    if (!receptorId) {
      return NextResponse.json({ error: "Falta id del receptor" }, { status: 400 });
    }

    const busquedaConversacion = await Conversations.find({
      $or: [
        { emisor: session.user.id, receptor: receptorId },
        { emisor: receptorId, receptor: session.user.id },
      ],
    });

    if (busquedaConversacion.length === 0) {
      return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }

    const mensajes = await upsTashDB.lindex(`conversacion:${receptorId}`, -1);

    return NextResponse.json({ mensajeria: busquedaConversacion, mensajes }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /conversacion:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongo();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { emisor, receptor, mensajes } = body;

    if (!emisor || !receptor || !mensajes) {
      return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
    }

    const conversacionYaExiste = await Conversations.findOne({
      $or: [
        { emisor, receptor },
        { emisor: receptor, receptor: emisor },
      ],
    });

    const mensajeData = {
      mensajes,
      emisor,
      receptor,
      hora: Date.now(),
    };

    if (conversacionYaExiste) {
      conversacionYaExiste.mensajes?.push(mensajeData);
      await conversacionYaExiste.save();

      const convJson = JSON.stringify(conversacionYaExiste);
      await upsTashDB.rpush(`conversacion:${receptor}`, convJson);
      await upsTashDB.publish(`chat:${receptor}`, convJson);

      await pusherServer.trigger(`${conversacionYaExiste.id}`, "nuevo-mensaje", mensajeData);

      return NextResponse.json({ message: "Mensaje enviado correctamente" }, { status: 200 });
    } else {
      const nuevaConversacion = new Conversations({
        emisor,
        receptor,
        mensajes: [mensajeData],
      });

      await nuevaConversacion.save();

      const convJson = JSON.stringify(nuevaConversacion);
      await upsTashDB.rpush(`conversacion:${receptor}`, convJson);
      await upsTashDB.publish(`chat:${receptor}`, convJson);

      await pusherServer.trigger(`${nuevaConversacion.id}`, "nuevo-mensaje", mensajeData);

      return NextResponse.json(
        { message: "Conversación creada y mensaje enviado" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error en POST /conversacion:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
