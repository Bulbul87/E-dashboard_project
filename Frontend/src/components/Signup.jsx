import React, { useState,useEffect } from "react";
import {useNavigate} from'react-router-dom';
const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })
  const collectdata = async () => {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    navigate('/')
    
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
     <div className="flex flex-col">
        <h1 className="text-violet-800 font-bold text-4xl text-center ">
          REGISTER 
        </h1>
        <input
          className="text-center border border-violet-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800 m-2"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800 m-2"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-center border border-violet-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800  m-2"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={collectdata}
          className="border-2 rounded-xl border-violet-800 font-semibold p-2 hover:bg-violet-800 hover:text-white m-2"
        >
        Sign Up
        </button>
      </div>
      </div>
  );
};

export default Signup;
