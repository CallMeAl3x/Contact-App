import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const getUserDataById = async (id) => {
  const res = await fetch(`${BASE_API_URL}/api/Users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};
async function page({ params }) {
  let userData; // Déclaration de la variable

  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }
  const response = await getUserDataById(params.id);
  userData = response.foundUser; // Attribution de la valeur
  return (
    <div>
      <p>{params.id}</p>
      {userData && ( // Vérification de userData avant son utilisation
        <>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
        </>
      )}
    </div>
  );
}

export default page;
