
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.auth);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center w-72">
        <h1 className="text-2xl font-bold text-violet-800">Login</h1>
        <input type="email" placeholder="Email" className="border p-2 rounded w-full" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 rounded w-full mt-2" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="border p-2 bg-violet-800 text-white rounded w-full mt-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
