"use client"; // Marque ce composant comme un composant client

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useStore from "../store"; // Assurez-vous que le chemin d'accès est correct

function ContactsDisplay({ contacts }) {
  const { searchValue } = useStore(); // Récupération de la valeur de searchValue depuis Zustand
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Filtrer les contacts en fonction de la valeur de searchValue
    const filtered = searchValue.trim()
      ? contacts.filter(
          (contact) =>
            contact.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
            contact.prenom.toLowerCase().includes(searchValue.toLowerCase())
        )
      : contacts; // Affiche tous les contacts si searchValue est vide, ajustez selon vos préférences

    setFilteredContacts(filtered);
    console.log(filtered);
  }, [contacts, searchValue]);

  return (
    <div>
      {searchValue.length > 0
        ? filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-gris1 p-3 flex justify-between mt-4 rounded-lg w-full ">
              {/* Votre code pour afficher chaque contact */}
              <Link href={`/ContactPage/${contact._id}`}>
                <div className="flex items-center w-[66%]">
                  <div className="h-8 w-8 outlineperso2 rounded-full flex justify-center items-center">
                    <p>
                    </p>
                  </div>
                  <div className="ml-4 truncate w-[50%] flex">
                    <p>
                      {contact.prenom} {contact.nom}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto mr-3"></div>
              </Link>
            </div>
          ))
        : console.log("Pas de filtrage")}
    </div>
  );
}

export default ContactsDisplay;
