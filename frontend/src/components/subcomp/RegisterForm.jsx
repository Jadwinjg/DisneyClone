import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopImg from "../../assets/images/cta-logo-one.png";
import { useAuth } from "../../pages/AuthContext";
import API from "../../api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/register", form);
      const res = await API.post("/login", {
        email: form.email,
        password: form.password,
      });

      setIsAuthenticated(true);
      localStorage.setItem("isLoggedIn", "true");

      alert("Registered & Logged In!");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full justify-center bg-login-bg bg-no-repeat bg-cover bg-top">
      <div className="flex h-full flex-col w-[700px] px-[30px] text-center mx-auto pt-20">
        <img className="px-6 w-full mb-4" src={TopImg} alt="top logo" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-white bg-opacity-90 text-black focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-white bg-opacity-90 text-black focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded bg-white bg-opacity-90 text-black focus:outline-none"
            required
          />

          <button
            type="submit"
            className="text-xl py-4 rounded font-bold uppercase bg-login-button text-white hover:bg-opacity-80 transition"
          >
            Register
          </button>

          {message && <p className="text-red-500">{message}</p>}
        </form>

        <p className="tracking-wider text-sm mb-2 text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
