import { NextResponse, NextRequest } from "next/server";
import mongo from "@/infraestructure/services/Mongodb";
import bcrypt from "bcrypt";

import Client from "@/infraestructure/models/Client";

export async function POST(req: NextRequest) {
  await mongo();

  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const emailLower = email.toLowerCase();

    const usuarioExistente = await Client.findOne({ email: emailLower });
    if (usuarioExistente) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    const signosEspeciales = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }
    if (!signosEspeciales.test(password)) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos un signo especial" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const cliente = new Client({
      name,
      email: emailLower,
      password: hashPassword,
    });

    await cliente.save();

    return NextResponse.json({ message: "Usuario registrado exitosamente" }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /client/register:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
