import Link from "next/link";
import React from "react";
import { IoAdd } from "react-icons/io5";

function AddContact() {
  return (
    <Link href={"/ContactPage/new"}>
      <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-vertfonce1">
        <IoAdd size={25} color="#2BA84D" />
      </div>
    </Link>
  );
}

export default AddContact;
