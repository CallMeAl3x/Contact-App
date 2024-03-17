"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Exit from "./Exit";
function SignInPage({ session }) {
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
          </>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
