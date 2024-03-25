/* eslint-disable @next/next/no-img-element */
import React from "react";
import retour from "/public/retour.svg";
import tel from "/public/tel.svg";
import mail from "/public/mail.svg";
import message from "/public/message.svg";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

async function page({ params }) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex justify-between items-center mt-4">
          <Link href={"/"}>
            <Image src={retour} alt="retour" height={38} width={38} />
          </Link>
        </div>

        <div className="relative w-fit ml-auto mr-auto mt-12">
          {session?.user?.image ? (
            <>
              <img
                src={session?.user?.image || unknown_pic}
                height={140}
                width={140}
                alt="Profile picture"
                className="rounded-full w-32 h-32 object-cover border-gray border-[2.5px]"
              />
            </>
          ) : (
            <>
              <div className="bg-[#1C1C1E] rounded-full mt-3 border border-ring h-[142px] w-[142px] flex justify-center items-center">
                <p className="font-Jost font-bold text-[52px]">
                  {premierelettreprenom2}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-bold mt-4 text-center text-xl">
            {session?.user?.name}
          </p>

          <p className="font-regular">{session?.user?.tel}</p>

          <p className="font-semibold text-gray text-base">
            {session?.user?.email}
          </p>
        </div>

        <div className="flex gap-6 ml-auto mr-auto mt-6 w-fit">
          <Image src={tel} alt="tel" width={50} height={50} />
          <Image src={message} alt="message" width={50} height={50} />
          <Image src={mail} alt="mail" width={50} height={50} />
        </div>

        <div class="bg-background rounded-lg flex justify-start xl:justify-center xl:mt-8 mt-4">
          <div class="peer bg-transparent pb-3 rounded-lg ring-ring w-64">
            <div className="ml-1">
              <h5 className="font-bold pt-2">Adresse</h5>
              <p className="pt-2">Ajouter une adresse dans le model</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
