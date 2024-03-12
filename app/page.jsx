/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import avatar from "/public/avatar.svg";
import chevron from "./Images/chevron.svg";
import box from "./Images/dropbox-logo-svgrepo-com.svg";
import email from "/public/mail.svg";
import tel from "/public/tel.svg";
import Link from "next/link";
import { getServerSession } from "next-auth";
import ContactFav from "./(components)/ContactFav";
import { options } from "./api/auth/[...nextauth]/options";
import React from "react";
import NavBar from "./(components)/NavBar";

const getContacts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Contacts", {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("failed to get ticket");
  }
};

export default async function Home({ searchParams }) {
  const session = await getServerSession(options);
  const query = searchParams?.contact || "" ;
  const { contacts } = await getContacts(query);
  const favoriteContacts = contacts.filter((contact) => contact.favorite);
  const filtredContacts = contacts.filter((contact) => {
    return contact.nom.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <main className="flex flex-col h-full">
      {session && (
        <>
          <NavBar />
          <div className="flex mt-8 gap-2 sm:gap-6 mb-4 ">
            <div
              className={`w-16 h-16 rounded-full ${
                session?.user?.image ? "" : "bg-white"
              } outlineperso2 flex items-center justify-center`}>
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User Profile"
                  className="h-full w-full rounded-full"
                />
              ) : (
                <>
                  <img
                    src={avatar}
                    alt=""
                    className="rounded-full w-full h-full"
                  />
                </>
              )}
            </div>
            <div className="my-auto ml-2">
              <h2 className="truncate w-fit">{session?.user?.name} (Me)</h2>
              <p className="text-xs text-[#9D9D9D]"> {session.user.email} </p>
              <div className="flex gap-2">
                <p className="text-sm text-[#9D9D9D]">
                  {filtredContacts.length > 1
                    ? `${filtredContacts.length} Contacts`
                    : `${filtredContacts.length} Contact`}
                </p>
                <span className="text-[#9D9D9D]">°</span>
                <p className="text-sm text-vertclair1">
                  {favoriteContacts.length > 1
                    ? `${favoriteContacts.length} Favoris`
                    : `${favoriteContacts.length} Favori`}
                </p>
              </div>
            </div>
            <div className=" ml-auto flex items-center">
              <Image src={chevron} width={30} color="#8D8C8F" alt="chevron" />
            </div>
          </div>
        </>
      )}

      {filtredContacts.length > 0 && session ? (
        <>
          {filtredContacts.map((contact) => (
            <React.Fragment key={contact._id}>
              <Link href={`/ContactPage/${contact._id}`}>
                <div className="bg-gris1 p-3 flex justify-between mt-4 rounded-lg w-full ">
                  <div className="flex items-center w-[66%]">
                    <div className="h-8 w-8  outlineperso2 rounded-full flex justify-center items-center">
                      
                      {contact.image ? (
                        <>
                        <Image src={contact.image} width={200} height={200} alt="car" className="rounded-full w-full h-full object-cover"/>
                        </>
                      ): (
                        <>
                        <p className="">
                        {contact.prenom ? contact.prenom[0].toUpperCase() : "?"}
                      </p>
                        </>
                      )}
                    </div>
                    <div className="ml-4 truncate w-[50%] flex">
                      <p>
                        {contact.prenom} {contact.nom}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto mr-3">
                    <ContactFav
                      id={contact._id}
                      contactfav={contact.favorite}
                    />
                    <Image
                      src={tel}
                      alt="tel"
                      width={25}
                      height={25}
                      className="w-6 h-6"
                    />

                    <Image src={email} alt="mail" width={25} height={25} />
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          {session ? (
            <>
              <div className="w-full h-[50vh] flex justify-center items-center">
                <Link href={"/ContactPage/new"}>
                  <div className="w-48 h-48 rounded-full bg-white border border-x-emerald-500 flex flex-col justify-center items-center outlineperso1">
                    <Image src={box} alt="box" width={96} />
                    <p className="text-vertclair1 font-bold text-base">
                      No contact yet
                    </p>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="h-[90vh] w-full flex justify-center items-center">
                <div className="w-32 h-32 outlineperso2 rounded-full flex justify-center items-center">
                  <Link
                    href={"/api/auth/signin"}
                    className="text-white text-3xl">
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
