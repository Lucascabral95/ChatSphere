import { NextResponse, NextRequest } from "next/server";
import mongo from "@/infraestructure/services/Mongodb";
import Cliente from "@/infraestructure/models/Client";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  await mongo();

  const { id } = params;

  try {
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return NextResponse.json({ error: "No se encontró el cliente" }, { status: 404 });
    }

    return NextResponse.json({ cliente }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /client/:id:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
