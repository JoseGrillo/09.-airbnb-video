import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider"; //1.29.00

import "./globals.css";
import ClientOnly from "./components/ClientOnly"; //verifica si esta "user client"
import getCurrentUser from "./actions/getCurrentUser"; //usuario actual 2.22.10

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider /> {/* mensaje flotante */}
          {/* //MODALES */}
          <LoginModal /> {/* Inicio SESSION */}
          <RegisterModal /> {/* REGISTRO de Usuario */}
          <SearchModal />
          <RentModal />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
