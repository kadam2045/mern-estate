import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 ">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-xl"
          id="userName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className=" border p-3 rounded-xl"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className=" border p-3 rounded-xl"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading" : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
