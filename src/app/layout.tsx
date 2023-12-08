import type { Metadata } from "next";
import "./globals.scss";
import { Menu } from "@/core/Menu";
import Alert from "@/core/Alert";
import ContextWrapper from "@/core/ContextWrapper";
import Modal from "@/core/Modal";
import { LoginCTA } from "@/core/LoginCTA";

export const metadata: Metadata = {
  title: "Alicante TTRPG",
  description: "Lugar de encuentro para aficionad@s de los TTRPG en Alicante",
  icons: "/placeholder.ico",
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
            <LoginCTA />
          </>
        </ContextWrapper>
      </body>
    </html>
  );
}
