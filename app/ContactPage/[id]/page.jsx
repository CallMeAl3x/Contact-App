import ContactForm from "@/app/(components)/ContactForm";
import DeleteContact from "@/app/(components)/DeleteContact";
import Link from "next/link";
import React from "react";

const getContactDataById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Contacts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

async function page({ params }) {
  const addContact = params.id === "new";
  const editMode = params.id === "update";
  

  let contactData = {};
  let premierelettreprenom = "";
  let premierelettreprenom2 = "";
  if (!addContact && !editMode) {
    const response = await getContactDataById(params.id);
    contactData = response.foundContact;
    premierelettreprenom = contactData.prenom[0];
    premierelettreprenom2 = premierelettreprenom.toUpperCase(); // Déplacez cette ligne ici
    // Assignez la valeur ici

  } else {
    contactData = {
      _id: "new",
    };
  }

  

  const affForm = async() => {
    if (addContact) {
      return (
        <>
          <ContactForm />
        </>
      );
    } else if(editMode){
      const response = await getContactDataById(params.id);
      contactData = response.foundContact;
        return <>
            <ContactForm contactData={contactData} />
        </>
    }
    else {
      return (
        <>
          <div className="flex justify-between mt-8">
            <Link href={"../"}>
              <p className="text-bleuc1">Cancel</p>
            </Link>
            <p className="font-bold text-lg mt-1"> {contactData.prenom} </p>
            <Link href={`/ContactPage/update`}>
            <button className="text-bleuc1">Edit</button>
            </Link>
          </div>

          <div className="flex justify-center mt-8">
            <div className="h-32 w-32 rounded-full bg-gris1 flex justify-center items-center outlineperso2 ">
              <p className="text-5xl">{premierelettreprenom2}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-center gap-3 p-4 bg-gris1 rounded-lg mt-8">
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
                <p>{contactData.email}</p>
              </div>
            </div>

            <div className="flex justify-center">
                <DeleteContact id={contactData._id}/>
            </div>
          </div>
        </>
      );
    }
  };

  return <div>{affForm()}</div>;
}

export default page;