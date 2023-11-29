import type { Metadata } from "next";
import "./globals.scss";
import { Menu } from "@/core/Menu";

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
        <Menu />
        {children}
      </body>
    </html>
  );
}
