import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      // navigate("/dashboard");
      // console.log("Login successful, navigating to dashboard...");
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Login to continue your habit journey
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium">
            Login
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
