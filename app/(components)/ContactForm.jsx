"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ContactForm({contactData}) {

    const editMode = contactData && contactData._id === "update";
  


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();





    if (editMode) {
        const res = await fetch(`/api/Contacts/${contactData._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          "content-type": "application/json",
        });
  
        if (!res.ok) {
          throw new Error("Failed to update Contact");
        }
      }else {
        const res = await fetch("/api/Contacts", {
            method: "POST",
            body: JSON.stringify(formData), // Envoi direct des données du formulaire
            headers: {
              "Content-Type": "application/json",
            },
          });
    
        if (!res.ok) {
          throw new Error("Failed to create Contact");
        }
      }

    router.push("/");
    router.refresh();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const startingContactData = {
    favorite: false,
    prenom: "",
    nom: "",
    tel: "",
    email: "",
  };

  if(editMode){
    startingContactData["favorite"] = contactData.favorite;
    startingContactData["prenom"] = contactData.prenom;
    startingContactData["nom"] = contactData.nom;
    startingContactData["tel"] = contactData.tel;
    startingContactData["email"] = contactData.email;

  }

  const [formData, setFormData] = useState(startingContactData);

  return (
    <div>
      <form
        className="flex flex-col gap-3 mt-12"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between mt-8">
        <Link href={'../'}>
          <p className="text-bleuc1">Cancel</p>
        </Link>
          <p className="font-bold text-lg mt-1">New Contact</p>
          <input
            type="submit"
            className="text-bleuc1 cursor-pointer"
            value={"Done"}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-2xl"> {editMode ? `update ${contactData.prenom}` : "Create your Contact"} </h3>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-bleuc1">Favorite</p>
            <input
              type="checkbox"
              className=" text-xs text-bleuc1"
              name="favorite"
              onChange={handleChange}
              checked={formData.favorite}
            ></input>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 bg-gris1 rounded-lg">
          <input
            type="text"
            onChange={handleChange}
            name="prenom"
            placeholder="Name"
            className="bg-gris1 border-b-2 border-vertclair1"
            value={formData.prenom}
          />
          <input
            type="text"
            onChange={handleChange}
            name="nom"
            placeholder="Surname"
            className="bg-gris1 border-b-2 border-vertclair1"
            value={formData.nom}
          />
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 bg-gris1 rounded-lg">
          <input
            type="text"
            onChange={handleChange}
            name="tel"
            placeholder="Telephone"
            className="bg-gris1 border-b-2 border-vertclair1"
            value={formData.tel}
          />
          <input
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="bg-gris1 border-b-2 border-vertclair1"
            value={formData.email}
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
