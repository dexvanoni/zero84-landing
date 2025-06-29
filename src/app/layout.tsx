import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Zero84 Personalizados | Transformamos Suas Ideias em Arte",
  description: "Especialistas em produtos personalizados. Camisetas, canecas, acessórios e muito mais com a qualidade e criatividade que você merece. Solicite seu orçamento!",
  keywords: [
    "produtos personalizados",
    "camisetas personalizadas",
    "canecas personalizadas",
    "brindes corporativos",
    "presentes personalizados",
    "estampas personalizadas",
    "Zero84",
    "personalização",
    "arte personalizada"
  ],
  authors: [{ name: "Zero84 Personalizados" }],
  creator: "Zero84 Personalizados",
  publisher: "Zero84 Personalizados",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://zero84.com",
    title: "Zero84 Personalizados | Transformamos Suas Ideias em Arte",
    description: "Especialistas em produtos personalizados. Camisetas, canecas, acessórios e muito mais com a qualidade e criatividade que você merece.",
    siteName: "Zero84 Personalizados",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zero84 Personalizados - Produtos Únicos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero84 Personalizados | Transformamos Suas Ideias em Arte",
    description: "Especialistas em produtos personalizados. Camisetas, canecas, acessórios e muito mais com a qualidade e criatividade que você merece.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#8b5cf6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
