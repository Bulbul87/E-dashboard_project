 import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
const Updateproduct=()=> {
  
    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [category,setCategory]=useState();
    const [company,setCompany]=useState();
    const params= useParams();
    const navigate=useNavigate();

 const token = (localStorage.getItem("token"));
    useEffect(()=>{
      
      getproductdetails();
    },[])

    const getproductdetails=async()=>{
      console.warn(params);
      let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
                 
         "Authorization": `Bearer ${token}`
        }
      });
   result =await result.json();
   setName(result.name)
   setPrice(result.price)
   setCategory(result.category)
   setCompany(result.company)
    }
    const updateproduct= async()=>{
     console.warn(name,price,category,company)
      let result=  await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
                 
          'Content-Type':"application/json", "Authorization": `Bearer ${token}`
        }
      });
      result=await result.json();
      console.warn(result)
      navigate('/')
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
    <div className='flex flex-col text-center w-64 space-y-4'>
      <h1 className='text-4xl font-bold text-violet-800 mb-4'>Update Product</h1>
      <input
        type="text"
        placeholder='Enter product name'
        className='text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800'
      onChange={(e)=>{setName(e.target.value)}}
      value={name}
      />
       <input
        type="number"
        placeholder='Enter product price'
        className='text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800'
        onChange={(e)=>{setPrice(e.target.value)}}
        value={price}
      />
       <input
        type="text"
        placeholder='Enter product category'
        className='text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800'
        onChange={(e)=>{setCategory(e.target.value)}}
        value={category}
     />
      <input
        type="text"
        placeholder='Enter product company'
        className='text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800'
        onChange={(e)=>{setCompany(e.target.value)}}
        value={company}
      />
      <button onClick={updateproduct} className='border-2 rounded-xl border-violet-800 font-semibold p-2 hover:bg-violet-800 hover:text-white'>
        Update product
      </button>
    </div>
  </div>
  

  )
}

export default Updateproduct

















