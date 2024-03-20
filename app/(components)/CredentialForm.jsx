"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

function CredentialForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleError = () => {
        toast({
            variant: "destructive",
            title: (
                <h3 className="text-white font-bold">
                    Identifiants incorrects, veuillez réessayer.
                </h3>
            ),
        });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            
        });

        if (result.error) {
            handleError();
        } else {
            router.refresh();
            router.push("/");
        }
    };

    return (
        <div>
            <div className="w-[80%] mx-auto h-[2px] bg-white rounded-full "></div>

            <form onSubmit={handleSignIn} className="flex flex-col gap-3 mt-4">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="email" className="text-white">
                        Email
                    </Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="password" className="text-white">
                        Mot de passe
                    </Label>
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Input
                    type="submit"
                    value={"Se connecter"}
                    className="border-[#25723B] font-bold flex justify-center text-white hover:bg-[#25723B] ease-in-out duration-200 cursor-pointer"
                />
            </form>
        </div>
    );
}

export default CredentialForm;
