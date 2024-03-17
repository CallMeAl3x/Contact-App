"use client";

import React from "react";
import { signIn } from "next-auth/react";
function SignInPage() {
   return (
    <div>
      <h1>Connectez-vous à votre compte</h1>

      {/* Intégrez les fournisseurs */}
      <button onClick={() => signIn("github")}>
       
        Se connecter avec GitHub
      </button>

      <button onClick={() => signIn("google")}>
        
        Se connecter avec Google
      </button>
    </div>
  );
}

export default SignInPage;
