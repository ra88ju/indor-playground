import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indoor Park Rajshahi",
  description: "Welcome to Indoor Park Rajshahi, your premier destination for indoor sports and recreation. Book your game now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isAdmin = pathname.startsWith('/admin');
  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdmin && <Navigation />}
        <Toaster position="top-center" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
