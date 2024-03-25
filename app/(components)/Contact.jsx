import Image from "next/image";
import Link from "next/link";
import React from "react";

function Contact({ contact }) {
  return (
    <Link href={`/ContactPage/${contact._id}`}>
      <div
        className={`flex items-center ${
          contact.sameAsPrevious
            ? "-mt-[1.15px] rounded-t-none before:content-[''] before:absolute before:h-[1px] before:w-[95%] before:bg-gray before:top-0 before:right-0"
            : "mt-4 rounded-m"
        } shadow-sm w-[95%] bg-[#303034] rounded-md p-3 relative`}
      >
        <div className="h-10 w-10 flex-shrink-0 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center mr-4 border-[1px] border-white">
          {contact.image ? (
            <Image
              src={contact.image}
              width={60}
              height={60}
              alt={contact.prenom}
              className="rounded-full object-cover "
            />
          ) : (
            <div className="bg-[#1C1C1E] rounded-full border border-ring h-[40px] w-[40px] flex justify-center items-center">
              <p className="font-Jost font-bold text-[16px]">
                {contact.prenom ? contact.prenom[0].toUpperCase() : "?"}
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
          {contact.favorite && (
            <>
              <Image
                src={"starnorm2.svg"}
                alt="star"
                width={35}
                height={35}
                className="flex-shrink-0 border-white border-2 rounded-full p-1"
              />
            </>
          )}
          <Image
            src={"mail.svg"}
            alt="mail"
            width={35}
            height={35}
            className="flex-shrink-0"
          />
          <Image
            src={"tel.svg"}
            alt="tel"
            width={35}
            height={35}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}

export default Contact;
