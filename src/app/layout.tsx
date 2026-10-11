import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KedeAwak: AI Assistant untuk Warung Indonesia",
  description:
    "Hubungkan WhatsApp Business warung Anda ke KedeAwak. Pesanan, chat pelanggan, dan bukti transfer otomatis tercatat. AI yang mencatat, Ibu tinggal terima hasilnya.",
  keywords: "warung, UMKM, AI assistant, WhatsApp business, pencatatan otomatis, Indonesia, Medan",
  openGraph: {
    title: "KedeAwak: AI untuk Warung Indonesia",
    description: "Catat otomatis lewat WhatsApp. AI yang kerja keras, Ibu tinggal lihat hasilnya.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
