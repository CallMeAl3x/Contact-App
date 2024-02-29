"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ContactForm({ contactData }) {

  useEffect(() => {
    if (contactData) {
      setFormData({
        favorite: contactData.favorite,
        prenom: contactData.prenom,
        nom: contactData.nom,
        tel: contactData.tel,
        email: contactData.email,
      });
    }
  }, [contactData]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contactData) {
        const res = await fetch(`/api/Contacts/${contactData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(formData),
        });

      if (!res.ok) {
        throw new Error("Failed to update Contact");
      }
    } else {
      const res = await fetch("/api/Contacts", {
        method: "POST",
        body: JSON.stringify(formData), 
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


  const [formData, setFormData] = useState(
    contactData
      ? {
          favorite: contactData.favorite,
          prenom: contactData.prenom,
          nom: contactData.nom,
          tel: contactData.tel,
          email: contactData.email,
        }
      : {
          favorite: false,
          prenom: "",
          nom: "",
          tel: "",
          email: "",
        }
  );

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:mt-12"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between mt-8 items-center">
          <Link href={"../"}>
            <p className="text-bleuc1">Cancel</p>
          </Link>
          <p className="font-bold text-lg mt-1"> {contactData ? contactData.prenom : "New Contact"} </p>
          <input
            type="submit"
            className="text-bleuc1 cursor-pointer"
            value={"Done"}
          />
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
              className=" text-xs text-bleuc1"
              name="favorite"
              onChange={handleChange}
              checked={formData.favorite}
            ></input>
          </div>
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
