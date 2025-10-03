import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import "react-loading-skeleton/dist/skeleton.css";

import { authOptions } from "@/infraestructure/services/authOptions";
import Providers from "./Providers";
import "./App.scss";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatSphere",
  description:
    "ChatSphere: Plataforma de mensajería en tiempo real diseñada para conversaciones seguras y fluidas entre dos usuarios, optimizada para una experiencia de comunicación eficiente.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" className={roboto.className}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
