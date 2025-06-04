import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GeraDOC by Lucas Silva",
  description: "Gerador de planilhas do Excel ⚙️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-screen`}>{children}</body>
    </html>
  );
}
