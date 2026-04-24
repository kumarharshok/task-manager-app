import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

    {/* LEFT INFO PANEL */}
    <div className="hidden md:flex flex-col justify-center w-1/2 text-white p-10">
      <h1 className="text-4xl font-bold mb-4">
        Join TaskSaaS 🚀
      </h1>

      <p className="text-gray-300 text-lg">
        Create your account and start managing tasks like a pro. Built for productivity and scale.
      </p>

      <div className="mt-6 space-y-2 text-gray-400">
        <p>✔ Free Forever Plan</p>
        <p>✔ Secure Authentication</p>
        <p>✔ Multi-user Task System</p>
      </div>
    </div>

    {/* SIGNUP CARD */}
    <div className="w-full md:w-1/2 flex justify-center">

      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-80 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded font-semibold">
          Signup
        </button>

        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link className="text-green-400 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}