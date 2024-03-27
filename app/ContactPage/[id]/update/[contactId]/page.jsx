import ContactForm from "@/app/(components)/ContactForm";
import React from "react";
const getContactDataById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/Contacts/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

async function page({ params }) {
  let contactData = {};
  const response = await getContactDataById(params.contactId);
  contactData = response.foundContact;

  return (
    <div>
      <ContactForm contactData={contactData} />
    </div>
  );
}

export default page;
