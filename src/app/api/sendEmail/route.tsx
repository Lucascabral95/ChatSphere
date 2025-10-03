import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import mongo from "@/infraestructure/services/Mongodb";
import Cliente from "@/infraestructure/models/Client";
import { authOptions } from "@/infraestructure/services/authOptions";

export async function POST(req: Request) {
  await mongo();
  const { destinatario } = await req.json();
  const sesion = await getServerSession(authOptions);

  const emailSesion = sesion?.user?.email?.toLowerCase();
  const emailDestinatario = destinatario.toLowerCase();

  if (emailSesion === emailDestinatario) {
    return NextResponse.json({ error: "No podés enviarte emails a vos mismo" }, { status: 400 });
  }

  const busquedaCliente = await Cliente.findOne({ email: emailDestinatario });

  if (busquedaCliente) {
    return NextResponse.json({ error: "El usuario ya se encuentra registrado" }, { status: 404 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_TOKEN,
    },
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: destinatario,
    subject: `${emailSesion} te invita a probar ChatSphere, la app de chat en tiempo real.`,
    html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f6f9fc;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4A90E2;
            padding: 30px;
            color: white;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            font-size: 16px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333;
            font-size: 24px;
            margin-top: 0;
        }
        .feature {
            background-color: #f0f4ff;
            border-left: 4px solid #4A90E2;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }
        .feature h3 {
            margin: 0 0 10px 0;
            color: #4A90E2;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #4A90E2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
        }
        @media (max-width: 600px) {
            .container {
                width: 95%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Bienvenido a ChatSphere!</h1>
            <p>La mejor app de chat para conectar con tus amigos.</p>
        </div>
        <div class="content">
            <h2>¡Unite a la conversación!</h2>
            <div class="feature">
                <h3>Inicio de Sesión Sencillo</h3>
                <p>Registrate rápidamente usando tu correo electrónico o tu cuenta de Google. </p>
            </div>
            <div class="feature">
                <h3>Invitá a tus Amigos</h3>
                <p>Compartí la diversión e invitá a tus amigos a unirse a la app. ¡Cuantos más, mejor!</p>
            </div>
            <div class="feature">
                <h3>Conversaciones en Tiempo Real</h3>
                <p>Hablá con tus amigos de manera instantánea. ¡Mantente conectado siempre!</p>
            </div>
            <div class="feature">
                <h3>Mensajes Persistentes</h3>
                <p>Todos tus mensajes se guardan de forma segura, para que puedas revisarlos cuando quieras.</p>
            </div>
            <a href=${process.env.NEXTAUTH_URL} class="button"> Visitar ahora </a>
        </div>
        <div class="footer">
            <p> © 2024 ChatSphere. <br> <br>
            Developed and designed by Lucas Cabral. <br> <br> 
            All rights reserved.  </p>
        </div>
    </div>
</body>
</html>`,
  });

  return new Response("Email enviado con exito", { status: 200 });
}
