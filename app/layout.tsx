// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. MODIFICATION : On importe depuis le nouveau composant sonner
import { Toaster } from "@/components/ui/sonner"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waka Colis",
  description: "Gestion de livraisons pour le Cameroun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        {/* 2. MODIFICATION : Le nom a changé, mais on le place au même endroit */}
        <Toaster /> 
      </body>
    </html>
  );
}