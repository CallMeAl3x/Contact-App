"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

function DeleteContact({id}) {
    
    const router = useRouter();

    const handleDelete = async()=>{
        const res = await fetch(`http://localhost:3000/api/Contacts/${id}`,{
      method: "DELETE"
    });
    if(res.ok){
      router.push("/")
      router.refresh()

    }
    }

  return (
    
        <p className='text-[#DB0955] text-lg font-bold cursor-pointer' onClick={handleDelete}>
            Delete Contact
        </p>
    
  )
}

export default DeleteContact