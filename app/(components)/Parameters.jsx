import Image from "next/image";
import Link from "next/link";
import React from "react";
import points from "../Images/3points.svg";
function Parameters() {
  return (
    <Link href="?modal=true">
      <div className="flex items-center justify-center">
        <Image src={points} alt="add" width={40} height={40} />
      </div>
    </Link>
  );
}

export default Parameters;
