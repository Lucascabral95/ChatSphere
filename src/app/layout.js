import { Roboto } from 'next/font/google';
import "./App.scss"
import Providers from "./Providers.jsx";
import 'react-loading-skeleton/dist/skeleton.css'

const font = Roboto({
  weight: ["100", '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: "ChatSphere",
  description: "ChatSphere: Plataforma de mensajería en tiempo real diseñada para conversaciones seguras y fluidas entre dos usuarios, optimizada para una experiencia de comunicación eficiente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
      <Providers>
        <body>

          {children}

        </body>
      </Providers>
    </html>
  );
}
