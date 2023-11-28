import type { Metadata } from "next";
import "./globals.scss";
import { Menu } from "@/core/Menu";
import localFont from "next/font/local";

const inclusiveSans = localFont({
  src: "../../public/fonts/UnicaOne-Regular.ttf",
});

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
      <body className={inclusiveSans.className}>
        <Menu />
        {children}
        <>footer</>
      </body>
    </html>
  );
}
