import ContactForm from "@/app/(components)/ContactForm";
import DeleteContact from "@/app/(components)/DeleteContact";
import Link from "next/link";
import React from "react";

const getContactDataById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Contacts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

async function page({ params }) {
  const addContact = params.id === "new";
  const editMode = params.id === "update";

  let contactData = {};
  let premierelettreprenom = "";
  let premierelettreprenom2 = "";

  if (!addContact) {
    const response = await getContactDataById(params.id);
    contactData = response.foundContact;
    if (contactData.prenom) {
      premierelettreprenom = contactData.prenom[0];
      premierelettreprenom2 = premierelettreprenom.toUpperCase();
    }
  }

  // Nouvelle variable pour stocker le résultat de contactData
  const formDataToSend = { ...contactData };

  const affForm = async () => {
    if (addContact) {
      return (
        <>
          <ContactForm />
        </>
      );
    } else if (editMode) {
      return (
        <>
          <ContactForm contactData={formDataToSend} />
        </>
      );
    } else {
      return (
        <>
          <div className="flex justify-between items-center">
            <Link href={"../"}>
              <p className="text-bleuc1">Cancel</p>
            </Link>

            <Link
              href={`/ContactPage/${contactData._id}/update/${contactData._id}`}
            >
              <button className="text-bleuc1">Edit</button>
            </Link>
          </div>

          <div className="flex justify-center mt-8">
            <div className="h-32 w-32 rounded-full bg-gris1 flex justify-center items-center outlineperso2 ">
              <p className="text-5xl">{premierelettreprenom2}</p>
            </div>
          </div>
          <p className="font-bold text-lg mt-4 text-center">
            {contactData.prenom}
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-center gap-4 p-4 bg-gris1 rounded-lg mt-8">
              <div className="border-b-2 border-vertclair1">
                <p>{contactData.prenom}</p>
              </div>
              <div className="border-b-2 border-vertclair1">
                <p>{contactData.nom}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 p-4 bg-gris1 rounded-lg">
              <div className="border-b-2 border-vertclair1">
                <p>{contactData.tel}</p>
              </div>
              <div className="border-b-2 border-vertclair1">
                <p className="truncate">{contactData.email}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <DeleteContact id={contactData._id} />
            </div>
          </div>
        </>
      );
    }
  };

  return <div>{affForm()}</div>;
}

export default page;
