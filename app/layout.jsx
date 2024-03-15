import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Modal from "./(components)/Modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contact App",
  description: "Projet MMI",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="mx-5">{children}</div>
        <Modal />
      </body>
    </html>
  );
}
