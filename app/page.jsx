import Image from "next/image";
import photovide from "./Images/photovide.svg";
import chevron from "./Images/chevron.svg";
import box from "./Images/dropbox-logo-svgrepo-com.svg";
import email from "./Images/email-svgrepo-com.svg";;
import tel from "./Images/phone-svgrepo-com.svg"
import Link from "next/link";
const getContacts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Contacts", {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("failed to get ticket");
  }
};

export default async function Home() {


   

  const { contacts } = await getContacts();
  
  return (
    <main className="flex flex-col h-full">
      <div className="flex mt-4">
        <div className="h-16 w-16 rounded-full bg-white outlineperso2 flex items-center justify-center">
          <Image src={photovide} alt="photo" />
        </div>
        <div className="my-auto ml-4">
          <h2>Alexandre Bonefons (Me)</h2>
          <div className="flex gap-2">
            <p className="text-sm text-[#9D9D9D]">0 contact</p>
            <span className="text-[#9D9D9D]">°</span>
            <p className="text-sm text-[#2BA84D]">0 favorite</p>
          </div>
        </div>
        <div className=" ml-auto flex items-center">
          <Image src={chevron} width={30} color="#8D8C8F" alt="chevron" />
        </div>
      </div>
      {contacts ? (
  <>
    {contacts.map((contact)=>(
      <>
      <Link href={`/ContactPage/${contact._id}`}>
        <div className="bg-gris1 p-3 flex justify-between mt-4 rounded-lg">
          <div className="flex items-center">
            <div className="h-8 w-8  outlineperso2 rounded-full flex justify-center items-center">
            <p className=""> {contact.prenom ? contact.prenom[0].toUpperCase() : '?'} </p>
            
            </div>
            <p className="ml-4"> {contact.prenom} {contact.nom} </p>
          </div>
          <div className="flex items-center mr-4 gap-4">
            <div className="h-6 w-6 bg-[#D9D9D9] rounded-full flex justify-center items-center shadowcontact">
              <Image src={tel} alt="tel" width={18} height={18} />
            </div>
            <div className="h-6 w-6 bg-[#D9D9D9] rounded-full flex justify-center items-center shadowcontact">
            <Image src={email} alt="mail" width={16} height={16} />

            </div>
          </div>
        </div>
        </Link>
      </>
    ))}
  </>
) : (
  <>
    <div className="w-full h-[70vh] flex justify-center items-center">
      <div className="w-48 h-48 rounded-full bg-white border border-x-emerald-500 flex flex-col justify-center items-center outlineperso1">
        <Image src={box} alt="box" width={96} />
        <p className="text-vertclair1 font-bold text-base">
          No contacts yet
        </p>
      </div>
    </div>
  </>
)}
    </main>
  );
}
