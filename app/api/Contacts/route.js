import Contact from "@/app/(models)/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contactData = await req.json(); // Récupérer directement les données du corps de la requête

    await Contact.create(contactData);

    return NextResponse.json({ message: "Contact Created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function GET(){
    try{
        const contacts = await Contact.find();
        return NextResponse.json ({contacts}, {status:200})

    }
    catch(err){
        return NextResponse({message: "Failed",err},{status:500})
    }
}
