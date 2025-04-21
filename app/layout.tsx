import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndoorX Arena - Your Ultimate Indoor Sports Experience",
  description: "Welcome to IndoorX Arena, your premier destination for indoor sports and recreation. Book your game now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Toaster position="top-center" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
