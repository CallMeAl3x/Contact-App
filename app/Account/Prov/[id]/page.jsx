import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page({ params }) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <p>
        {session?.user?.id} <br />
        {session?.user?.name} <br />
        {session?.user?.email}
      </p>
    </div>
  );
}

export default page;
