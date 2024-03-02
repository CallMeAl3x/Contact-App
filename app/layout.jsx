import { Inter } from "next/font/google";
import "./globals.css";
import Top from "./(components)/Top";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import exit from "./Images/exit-svgrepo-com.svg";
import Image from "next/image";
import Exit from "./(components)/Exit";
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
        <div className="h-screen bg-[#000000] mx-6">
          <div className="mt-4">
            {children}
          </div>
          <Modal/>
          {session && (
            <>
              <div className="pt-1">
                <Exit />
              </div>
            </>
          )}

          <div className="mt-2 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
