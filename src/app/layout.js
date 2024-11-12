'use client'
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Imposta una classe "bg-bordeaux" solo su /login e /register
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const bodyClass = isAuthPage ? "bg" : "";

  return (
    <html lang="en">
      <body className={bodyClass}>
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
