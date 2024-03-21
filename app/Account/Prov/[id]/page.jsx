import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

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
        {session?.user?.email} <br />
        <img src={session?.user?.image} width={50} height={50} alt="profile picture of Provider" className="rounded-full" />
      </p>
    </div>
  );
}

export default page;
