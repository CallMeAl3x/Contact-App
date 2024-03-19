"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Exit from "./Exit";
import UserForm from "./UserForm";
function SignInPage({ session }) {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => {
    setSignUp(!signUp);
  };
  return (
    <div>
      <div className="flex flex-col gap-4 ">
        {session ? (
          <>
            <Exit />
          </>
        ) : (
          <>
            <button
              onClick={() => signIn("github")}
              className="border-2 border-white rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Github</p>
                <span>
                  <Image
                    src={"/github23.png"}
                    width={30}
                    height={30}
                    alt="Google Image"
                  />
                </span>
              </div>
            </button>

            <button
              onClick={() => signIn("google")}
              className="border-2 border-white rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Google</p>
                <span>
                  <Image
                    src={"/Google.png"}
                    width={30}
                    height={30}
                    alt="Google Image"
                  />
                </span>
              </div>
            </button>
            <div className="w-[80%] mx-auto h-[2px] bg-white rounded-full "></div>
            <button
              onClick={handleSignUp}
              className="border-2 border-[#25723B] rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Chez nous</p>
                <span>
                  <Image
                    src={"/homee.svg"}
                    width={30}
                    height={30}
                    alt="Home Image"
                  />
                </span>
              </div>
            </button>

            <div
              className={`overflow-hidden w-full transition-height duration-1000 ease-in-out mt-4  ${
                signUp ? "h-[350px]" : "h-0"
              }`}
            >
              <UserForm />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
