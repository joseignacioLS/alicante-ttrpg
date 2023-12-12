import type { Metadata } from "next";
import "./globals.scss";
import { Menu } from "@/core/Menu";
import Alert from "@/core/Alert";
import ContextWrapper from "@/core/ContextWrapper";
import Modal from "@/core/Modal";

export const metadata: Metadata = {
  title: "Alicante TTRPG",
  description: "Lugar de encuentro para aficionad@s de los TTRPG en Alicante",
  icons: "/placeholder.ico",
  creator: "Jose Ignacio LS",
  authors: [
    {
      name: "Jose",
    },
  ],
  keywords: [
    "TTRPG",
    "RolePlaying",
    "Juegos de Rol",
    "Jugar Rol",
    "Dungeons and Dragons",
    "D&D",
    "DnD",
    "Alicante",
    "Alacant",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ContextWrapper>
          <>
            <Menu />
            <main>
              <div className="content">{children}</div>
            </main>
            <Alert />
            <Modal />
          </>
        </ContextWrapper>
      </body>
    </html>
  );
}
