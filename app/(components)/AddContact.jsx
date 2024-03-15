import Image from "next/image";
import Link from "next/link";
import React from "react";
import add from "../Images/add.svg";

function AddContact() {
  return (
    <Link href={"/ContactPage/new"}>
      <div className="rounded-full flex items-center justify-center p-1 bg-[#123A1B]">
        <Image src={add} alt="add" width={32} height={32} />
      </div>
    </Link>
  );
}

export default AddContact;
