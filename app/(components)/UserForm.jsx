"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import "./UserForm.css"

function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify(formData),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 "
      >
        <div className="animopac">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            required={true}
            value={formData.name}
          />
        </div>
        <div className="animopac">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            required={true}
            value={formData.email}
          />
        </div>
        <div className="animopac">
          <Label htmlFor="email">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required={true}
            value={formData.password}
          />
        </div>
        <div className="w-[35%] mx-auto">
          <Input
            type="submit"
            value={"Create user"}
            className="border-[#25723B] font-bold flex justify-center text-white hover:bg-[#25723B] ease-in-out duration-200 cursor-pointer"
          />
        </div>
      </form>
      <p className="text-red-400"> {errorMessage} </p>
    </div>
  );
}

export default UserForm;
