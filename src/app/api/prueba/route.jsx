import { pusherServer2 } from "@/services/pusher";
import mongo from "@/services/Mongodb.jsx";
import { NextResponse } from "next/server";
import CharlaPrueba from "@/models/CharlaPrueba";

export async function POST(req) {
    await mongo();
    const { emisor, mensaje } = await req.json();

    if (!emisor || !mensaje) {
        return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
    }

    const nuevaConversacion = new CharlaPrueba({
        emisor: emisor,
        mensaje: mensaje,
    });
    await nuevaConversacion.save();

    await pusherServer2.trigger("conversacion", "actualizar-conversacion", {
        emisor: emisor,
        mensaje: mensaje
    });

    return NextResponse.json({ message: "Conversación creada y mensaje enviado" }, { status: 200 });
}

export async function GET(){
       await mongo();
       const charlas = await CharlaPrueba.find();

       return NextResponse.json({ charlas }, { status: 200 });
}