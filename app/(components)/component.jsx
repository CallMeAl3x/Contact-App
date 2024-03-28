"use server";

export default async function SomeComponent() {
  console.log(
    JSON.stringify(`https://${process.env.VERCEL_URL}/api/Contacts/${id}`)
  );
  return <div>test1</div>;
}
