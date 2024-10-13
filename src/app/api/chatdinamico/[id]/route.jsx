import { NextResponse } from "next/server";
import mongo from "@/services/Mongodb.jsx";
import Conversations from "@/models/Conversation.jsx";
import Users from "@/models/Users.jsx";
import Cliente from "@/models/Client.jsx";

export async function GET({ params }) {
    await mongo();
    const { id } = params;

    const cliente = await Cliente.findOne({ _id: id });
    if (!cliente) {
        return NextResponse.json({ error: "No se encontro el cliente" }, { status: 404 });
    }

     NextResponse.json({ cliente }, { status: 200 });
}