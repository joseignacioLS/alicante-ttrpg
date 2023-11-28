import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Menu } from "@/core/Menu";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Menu />
        {children}
        <>footer</>
      </body>
    </html>
  );
}
