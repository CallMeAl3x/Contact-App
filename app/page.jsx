import Image from "next/image";
import avatar from "/public/avatar.svg";
import chevron from "./Images/chevron.svg";
import box from "./Images/nocontacts.svg";
import email from "/public/mail.svg";
import tel from "/public/tel.svg";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import React from "react";
import NavBar from "./(components)/NavBar";
import SignInPage from "./(components)/SignInPage";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Exit from "./(components)/Exit";

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
  console.log("User ID:", session?.user?.id); // Afficher l'ID de l'utilisateur s'il est connecté
  const query = searchParams?.contact || "";
  const { contacts } = await getContacts(query);

  const favoriteContacts = contacts.filter((contact) => contact.favorite);
  const filtredContacts = contacts.filter((contact) => {
    return contact.nom.toLowerCase().includes(query.toLowerCase());
  });
  const sortedContacts = filtredContacts.sort((a, b) =>
    a.prenom.localeCompare(b.prenom, "fr", { sensitivity: "base" })
  );

  const filterToOneContact = sortedContacts.filter((contact) => {
    return contact.createurID == session?.user?.id;
  });

  const contactsToShow = filterToOneContact.map((contact, index, array) => {
    const currentInitial = contact.prenom[0].toUpperCase();
    const showInitial =
      index === 0 ||
      currentInitial !== array[index - 1].prenom[0].toUpperCase(); // vrai si c'est le premier contact ou si l'initiale change
    const sameAsPrevious =
      index > 0 && currentInitial === array[index - 1].prenom[0].toUpperCase(); // vrai si l'initiale est la même que celle du contact précédent
    return { ...contact, showInitial, sameAsPrevious }; // Retourner le contact avec les nouvelles propriétés
  });

  return (
    <main className="flex flex-col h-full">
      <Sheet>
        <NavBar />
        <div className="flex mt-8 gap-2 sm:gap-6 mb-4 items-center">
          <div
            className={`w-[50px] h-[50px] rounded-full ${
              session?.user?.image ? "" : "bg-white"
            } outlineperso2 flex items-center justify-center`}
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User Profile"
                height={50}
                width={50}
                className="rounded-full"
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
          <div className="my-auto ml-2 flex flex-col gap-1">
            <h2 className="truncate w-fit font-Jost font-bold text-base">
              {session?.user?.name} (Me)
            </h2>
            <p className="text-[15px] text-gray font-Jost font-semibold">
              {session ? (
                <>{session.user.email}</>
              ) : (
                <>Vous nêtes pas connecté</>
              )}
            </p>
            <div className="flex gap-2 text-xs">
              <p className="">
                {filtredContacts.length > 1
                  ? `${filtredContacts.length} Contacts`
                  : `${filtredContacts.length} Contact`}
              </p>
              <span className="mt-0.5">°</span>
              <p className="text-green font-medium">
                {favoriteContacts.length > 1
                  ? `${favoriteContacts.length} Favoris`
                  : `${favoriteContacts.length} Favoris`}
              </p>
            </div>
          </div>
          <div className=" ml-auto flex items-center">
            <Image src={chevron} width={30} color="#8D8C8F" alt="chevron" />
          </div>
        </div>

        {contactsToShow.length > 0 && session && (
          <>
            {contactsToShow.map((contact, index) => (
              <React.Fragment key={contact._id}>
                {!contact.sameAsPrevious && (
                  <>
                    {index > 0 && <div className="mt-6"></div>}{" "}
                    {/* Espace entre les groupes */}
                    <div className="bg-[#1C1C1E] rounded-full mt-3 border border-ring h-9 w-9 flex justify-center items-center">
                      <p className="font-Jost font-bold text-[16px]">
                        {contact.prenom ? contact.prenom[0].toUpperCase() : "?"}
                      </p>
                    </div>
                  </>
                )}
                <Link href={`/ContactPage/${contact._id}`}>
                  <div
                    className={`flex items-center ${
                      contact.sameAsPrevious
                        ? "-mt-[1.15px] rounded-t-none before:content-[''] before:absolute before:h-[1px] before:w-[95%] before:bg-gray before:top-0 before:right-0"
                        : "mt-4 rounded-m"
                    } shadow-sm w-[95%] bg-[#303034] rounded-md p-3 relative`}
                  >
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center mr-4">
                      {contact.image ? (
                        <Image
                          src={contact.image}
                          width={40}
                          height={40}
                          alt={contact.prenom}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-[#1C1C1E] rounded-full border border-ring h-[40px] w-[40px] flex justify-center items-center">
                          <p className="font-Jost font-bold text-[16px]">
                            {contact.prenom
                              ? contact.prenom[0].toUpperCase()
                              : "?"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="truncate flex-grow">
                      <p className="text-white font-bold truncate">
                        {contact.prenom} {contact.nom}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Image
                        src={email}
                        alt="mail"
                        width={35}
                        height={35}
                        className="flex-shrink-0"
                      />
                      <Image
                        src={tel}
                        alt="tel"
                        width={35}
                        height={35}
                        className="flex-shrink-0"
                      />
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </>
        )}

        <div className="ml-auto mr-auto mt-32">
          <SheetTrigger>
            {!session && (
              <>
                <div className="">
                  <Image src={box} alt="box" width={170} height={170} />
                </div>
              </>
            )}
            {!contactsToShow.length > 0 && (
              <>
                <Link className="" href={"/ContactPage/new"}>
                  <Image src={box} alt="box" width={170} height={170} />
                </Link>
              </>
            )}
          </SheetTrigger>
        </div>

        <SheetContent className="bg-primary">
          <SheetHeader>
            <SheetTitle>
              {session ? (
                <>
                  <h2 className="text-white font-bold">Déconnectez-vous</h2>
                </>
              ) : (
                <>
                  <h2 className="text-white font-bold">
                    Connectez-vous avec :
                  </h2>
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              <div className="mt-4">
                {session ? (
                  <>
                    <Exit />
                  </>
                ) : (
                  <>
                    <SignInPage session={session} />
                  </>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
}
