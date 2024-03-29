import ContactForm from "@/app/(components)/ContactForm";
import React from "react";
const getContactDataById = async (id) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/Contacts/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

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
