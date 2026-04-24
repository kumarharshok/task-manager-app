import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

    {/* LEFT INFO PANEL */}
    <div className="hidden md:flex flex-col justify-center w-1/2 text-white p-10">
      <h1 className="text-4xl font-bold mb-4">
        TaskSaaS 🚀
      </h1>

      <p className="text-gray-300 text-lg">
        Manage your tasks like a pro. Simple, fast and scalable productivity tool built for modern teams.
      </p>

      <div className="mt-6 space-y-2 text-gray-400">
        <p>✔ Create Tasks</p>
        <p>✔ Track Progress</p>
        <p>✔ Improve Productivity</p>
      </div>
    </div>

    {/* LOGIN CARD */}
    <div className="w-full md:w-1/2 flex justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-80 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold">
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-300">
          No account?{" "}
          <Link className="text-blue-400 hover:underline" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}