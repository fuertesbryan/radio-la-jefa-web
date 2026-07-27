import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radio La Jefa - Sistema de Gestión Operativa',
  description: 'Aplicación web nativa en la nube para Radio La Jefa - Prácticum 3 (Bryan Fuertes)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased bg-jefa-dark text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
