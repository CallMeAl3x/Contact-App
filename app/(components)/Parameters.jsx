import Image from "next/image";
import Link from "next/link";
import React from "react";
import points from "../Images/3points.svg";
function Parameters() {
  return (
    <Link href={"/"}>
      <div className="w-[36px] h-[36px] border-2 border-gris1 rounded-full flex items-center justify-center">
        <Image src={points} alt="parameters" className="w-[20px] h-[20px]" />
      </div>
    </Link>
  );
}

export default Parameters;
