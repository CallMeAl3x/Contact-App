/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import chevron from "./Images/chevron.svg";
import box from "./Images/nocontacts.svg";
import { Separator } from "@/components/ui/separator";

import React from "react";
import Accueil from "./(Pages)/Accueil";
export default function Home() {
  return (
    <div>
      
        <Accueil />
      
    </div>
  );
}
