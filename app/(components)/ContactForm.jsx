"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ContactForm({ contactData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    favorite: contactData ? contactData.favorite : false,
    prenom: contactData ? contactData.prenom : "",
    nom: contactData ? contactData.nom : "",
    tel: contactData ? contactData.tel : "",
    email: contactData ? contactData.email : "",
    image: contactData ? contactData.image : null,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    if (name === "image") {
      const file = e.target.files[0];
      // Vérifie s'il y a un fichier sélectionné
      if (file) {
        // Vérifie si le fichier sélectionné est une image
        if (file.type && file.type.startsWith('image')) {
          // Convertit l'image en base64
          convertToBase64(file);
        } else {
          console.log("Le fichier sélectionné n'est pas une image.");
        }
      }
    } else {
      // Sinon, c'est un champ de texte normal
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = contactData
      ? `/api/Contacts/${contactData._id}`
      : "/api/Contacts";

    const res = await fetch(url, {
      method: contactData ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(
        contactData ? "Failed to update Contact" : "Failed to create Contact"
      );
    }

    router.push("/");
    router.refresh();
  };


  return (
    <div>
      <form className="flex flex-col gap-3 sm:mt-12" onSubmit={handleSubmit}>
        <div className="flex justify-between mt-4 items-center">
          <Link href={"../"}>
            <p className="text-bleuc1">Retour</p>
          </Link>
          <p className="font-bold text-lg">
            {contactData ?                        <div className="flex justify-center">
              <div className="h-40 w-40">
 <Image src={contactData.image} width={200} height={200} alt="car" className="rounded-full w-full h-full object-cover"/>
              </div>
            </div>
 : "New Contact"}
          </p>
          <label htmlFor="done">
            <Image src="/green-check.svg" height={35} width={35} alt="Done" />
          </label>
          <input type="submit" id="done" className="sr-only" value={"Done"} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-2xl text-center sm:text-left mt-4 mb-4">
            {contactData
              ? `Update ${contactData.prenom}`
              : "Create your Contact"}
          </h3>
          <div className="flex gap-2 items-center mt-4 mb-4">
            <p className="text-xs text-bleuc1">Favorite</p>
            <input
              type="checkbox"
              className="text-xs text-bleuc1"
              name="favorite"
              onChange={handleChange}
              checked={formData.favorite}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 p-4 bg-gris1 rounded-lg">
          <input
  type="file"
  onChange={handleChange}
  name="image"
  placeholder="image"
  className="bg-gris1 border-b-2 border-vertclair1"
/>

        </div>
       

        <div className="flex flex-col justify-center gap-4 p-4 bg-gris1 rounded-lg">
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

        <div className="flex flex-col justify-center gap-4 p-4 bg-gris1 rounded-lg">
          <input
            type="tel"
            onChange={handleChange}
            name="tel"
            placeholder="Telephone"
            className="bg-gris1 border-b-2 border-vertclair1"
            value={formData.tel}
          />
          <input
            type="email"
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
