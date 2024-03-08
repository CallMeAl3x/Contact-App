import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Exit from "./(components)/Exit";
import Modal from "./(components)/Modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contact APP",
  description: "Projet MMI",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#000000] `}>
        <div className="bg-[#000000] mx-4 sm:mx-6">
          <div className="mt-4">{children}</div>
          <Modal />
        </div>
      </body>
    </html>
  );
}
