import { NextResponse } from "next/server";
import mongo from "@/services/Mongodb.jsx";
import Client from "@/models/Client.jsx";
import bcrypt from "bcrypt";

export async function POST(req) {
    await mongo();
    const { name, email, password } = await req.json();
    
    try {
        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const verificacionUsuarioRepetido = await Client.findOne({ email: email.toLowerCase() });

        if (verificacionUsuarioRepetido) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        const signosEspeciales = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < 8) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
        }

        if (!signosEspeciales.test(password)) {
            return NextResponse.json({ error: "La contraseña debe tener al menos un signo especial" }, { status: 400 });
        }
        
        if (verificacionUsuarioRepetido || (password.length < 8) || !signosEspeciales.test(password)) {
            return NextResponse.json({ error: "Email y contraseña inválidos" }, { status: 400 });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const cliente = new Client({
            name: name,
            email: email.toLowerCase(),
            password: hashPassword,
        });

        await cliente.save();
        return NextResponse.json({ message: "Usuario registrado exitosamente" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
