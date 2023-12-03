import type { Metadata } from "next";
import "./globals.scss";
import { Menu } from "@/core/Menu";
import Alert from "@/core/Alert";
import ContextWrapper from "@/core/ContextWrapper";
export const metadata: Metadata = {
  title: "Alicante TTRPG",
  description: "Lugar de encuentro para aficionad@s de los TTRPG en Alicante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>font</style>
      </head>
      <body>
        <ContextWrapper>
          <>
            <Menu />
            {children}
            <Alert />
          </>
        </ContextWrapper>
      </body>
    </html>
  );
}
