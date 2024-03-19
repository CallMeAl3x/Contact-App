"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
function UserForm() {
const router = useRouter();
const [formData,setFormData] = useState({})
const [errorMessage,setErrorMessage] = useState("");

const handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState)=>({
        ...prevState,
        [name] : value
    }))
}   

const handleSubmit = async(e)=>{
    e.preventDefault()
    setErrorMessage("")
    const res = fetch("/api/Users",{
        method: "POST",
        body: JSON.stringify({formData}),
        "content-type":"application/json",
    });

    if(!res.ok){
        const response = await res.json();
        setErrorMessage(response.message);

    }else{
        router.refresh();
        router.push("/");
    }
}
  return (
    <div>
        <form onSubmit={handleSubmit} method='post' className='flex flex-col gap-3 '>
            <label htmlFor="">Name</label>
            <input type="text" name='name' id='name' onChange={handleChange} required={true} value={formData.name} className='m-2 bg-slate-400 rounded'/>
            <label htmlFor="">Email</label>
            <input type="text" name='email' id='email' onChange={handleChange} required={true} value={formData.email} className='m-2 bg-slate-400 rounded'/>
            <label htmlFor="">Password</label>
            <input type="text" name='password' id='password' onChange={handleChange} required={true} value={formData.password} className='m-2 bg-slate-400 rounded'/>
            <input type="submit" value={"Create user"} className='bg-blue-300 hover:bg-blue-100' />


        </form>
        <p className='text-red-400'> {errorMessage} </p>
    </div>
  )
}

export default UserForm