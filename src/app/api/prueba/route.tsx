import { NextResponse, NextRequest } from "next/server";
import mongo from "@/infraestructure/services/Mongodb";
import CharlaPrueba from "@/infraestructure/models/CharlaPrueba";
import { pusherServer2 } from "@/infraestructure/services/pusher";

export async function POST(req: NextRequest) {
  try {
    await mongo();
    const { emisor, mensaje } = await req.json();

    if (!emisor || !mensaje) {
      return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
    }

    const nuevaConversacion = new CharlaPrueba({ emisor, mensaje });
    await nuevaConversacion.save();

    await pusherServer2.trigger("conversacion", "actualizar-conversacion", {
      emisor,
      mensaje,
    });

    return NextResponse.json({ message: "Conversación creada y mensaje enviado" }, { status: 200 });
  } catch (error) {
    console.error("Error en POST /charlaprueba:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongo();
    const charlas = await CharlaPrueba.find();
    return NextResponse.json({ charlas }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /charlaprueba:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
