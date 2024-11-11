import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";



export const metadata = {
  title: "Pasticceria a Varese | C'est la Vie",
  description: "Pasticceria a Varese | C'est la Vie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
