import React, { useState } from 'react';

const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const addproduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    let result = await fetch('http://localhost:5000/add-product', {
      method: 'POST',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    });

    result = await result.json();
    
   
    if (result) {
      alert("Product added successfully!");
      setName(""); 
      setPrice("");
      setCategory("");
      setCompany("");
      setError(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex flex-col text-center w-64 space-y-4'>
        <h1 className='text-4xl font-bold text-violet-900 mb-4'>Add Product</h1>
    <input
          type="text"
          placeholder='Enter product name'
          className='text-center border border-violet-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-900'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {error && !name && <span className='text-red-500 font-semibold'>Enter valid name</span>}

        <input
          type="number"
          placeholder='Enter product price'
          className='text-center border border-violet-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-900'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {error && !price && <span className='text-red-500 font-semibold'>Enter valid price</span>}

        <input
          type="text"
          placeholder='Enter product category'
          className='text-center border border-violet-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-900'
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {error && !category && <span className='text-red-500 font-semibold'>Enter valid category</span>}

        <input
          type="text"
          placeholder='Enter product company'
          className='text-center border border-violet-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-900'
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        {error && !company && <span className='text-red-500 font-semibold'>Enter valid company</span>}

        <button 
          onClick={addproduct} 
          className='border-2 rounded-xl border-violet-900 font-semibold p-2 hover:bg-violet-900 hover:text-white'>
          Add product
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
