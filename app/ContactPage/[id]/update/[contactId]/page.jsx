import ContactForm from "@/app/(components)/ContactForm";
import React from "react";
import { fetchOneContact } from "@/app/api/Contacts/[id]/route";

async function page({ params }) {
  let contactData = {};

  const contactDatanojson = await fetchOneContact(params.id);
  contactData = contactDataResponse ? JSON.stringify(contactDatanojson) : {};

  return (
    <div>
      <ContactForm contactData={contactData} />
    </div>
  );
}

export default page;
