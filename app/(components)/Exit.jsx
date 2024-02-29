import Image from "next/image";
import Link from "next/link";
import React from "react";
import exit from "../Images/exit-svgrepo-com.svg";

function Exit() {
  return (
    <div>
      <Link
        href={"/api/auth/signout?callbackUrl=/"}
        className="flex justify-center p-2 text-[#DB0955] font-bold text-base mt-2"
      >
        <div className="outlineperso3 rounded-full flex justify-center items-center p-2">
          <Image src={exit} width={30} height={30} alt="exit" />
        </div>
      </Link>
    </div>
  );
}

export default Exit;
