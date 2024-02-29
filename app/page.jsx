import Image from "next/image";
import photovide from "./Images/photovide.svg";
import chevron from "./Images/chevron.svg";
import box from "./Images/dropbox-logo-svgrepo-com.svg";
import email from "./Images/email-svgrepo-com.svg";
import tel from "./Images/phone-svgrepo-com.svg";
import Link from "next/link";
import Top from "./(components)/Top";
import { getServerSession } from "next-auth";
import ContactFav from "./(components)/ContactFav";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
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

export default async function Home() {
  const session = await getServerSession(options);

  const { contacts } = await getContacts();
  const reversedContacts = contacts.reverse();
  const favoriteContacts = reversedContacts.filter(
    (contact) => contact.favorite
  );

  return (
    <main className="flex flex-col h-full">
      {session && (
        <>
          <span>
            <div className="flex justify-center">
              <Top />
            </div>
            <div className="flex mt-8 gap-2 sm:gap-6 mb-4 ">
              <div className={`w-16 h-16 rounded-full ${session?.user?.image ? "" : "bg-white"} outlineperso2 flex items-center justify-center`}>
                {(session?.user?.image) ? (
                  <img
                    src={session.user.image}
                    alt="User Profile"
                    className="h-full w-full rounded-full"
                  />
                ):(
                  <>
                  <img src={photovide} alt="" className="rounded-full w-full h-full" />
                  </>
                )}
              </div>
              <div className="my-auto ml-2">
                <h2 className="truncate w-fit">{session?.user?.name} (Me)</h2>
                <p className="text-xs text-[#9D9D9D]"> {session.user.email} </p>
                <div className="flex gap-2">
                  <p className="text-sm text-[#9D9D9D]">
                    {reversedContacts.length > 1
                      ? `${reversedContacts.length} Contacts`
                      : `${reversedContacts.length} Contact`}
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
          </span>
        </>
      )}

      <img src={email} alt="" />
      {reversedContacts.length > 0 && session ? (
        <>
          {reversedContacts.map((contact) => (
            <>
              <Link href={`/ContactPage/${contact._id}`}>
                <div className="bg-gris1 p-3 flex justify-between mt-4 rounded-lg w-full ">
                  <div className="flex items-center w-[72%]">
                    <div className="h-8 w-8  outlineperso2 rounded-full flex justify-center items-center">
                      <p className="">
                        {contact.prenom ? contact.prenom[0].toUpperCase() : "?"}
                      </p>
                    </div>
                    <div className="ml-4 truncate w-[70%] flex">
                      <p>
                        {contact.prenom} {contact.nom}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mr-1 gap-4 ml-auto">
                    <ContactFav
                      id={contact._id}
                      contactfav={contact.favorite}
                    />
                    <div className="h-6 w-6 bg-[#D9D9D9] rounded-full flex justify-center items-center shadowcontact">
                      <Image src={tel} alt="tel" width={18} height={18} />
                    </div>

                    <div className="h-6 w-6 bg-[#D9D9D9] rounded-full flex justify-center items-center shadowcontact">
                      <Image src={email} alt="mail" width={16} height={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </>
      ) : (
        <>
          {session ? (
            <>
              <div className="w-full h-[50vh] flex justify-center items-center">
                <div className="w-48 h-48 rounded-full bg-white border border-x-emerald-500 flex flex-col justify-center items-center outlineperso1">
                  <Image src={box} alt="box" width={96} />
                  <p className="text-vertclair1 font-bold text-base">
                    No contact yet
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="h-[90vh] w-full flex justify-center items-center">
                <div className="w-32 h-32 outlineperso2 rounded-full flex justify-center items-center">
                  <Link
                    href={"/api/auth/signin"}
                    className="text-white text-3xl"
                  >
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
