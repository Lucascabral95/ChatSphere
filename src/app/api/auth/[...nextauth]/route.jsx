import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import mongo from "@/infraestructure/services/Mongodb";
import Client from "@/infraestructure/models/Client";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Lucas@hotmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await mongo();
        const client = await Client.findOne({ email: credentials.email.toLowerCase() });

        if (!client) {
          throw new Error("El email o la contraseña son inválidos");
        }

        const verificacionPassword = await bcrypt.compare(credentials.password, client.password);
        if (!verificacionPassword) {
          throw new Error("Contraseña incorrecta");
        }

        return client;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await mongo();

        let cliente = await Client.findOne({ email: profile.email });

        if (!cliente) {
          cliente = new Client({
            name: profile.name,
            email: profile.email,
            imagenPerfil: profile.picture,
          });
          await cliente.save();
        }

        user._id = cliente._id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.saludo = "Hola Developer Beginner";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return process.env.REDIRECCION_LOGUEO;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
});

export { handler as GET, handler as POST };
