import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://blog-backend.chanukadilshan.live/api/v1/auth/login",
        { username, password }
      );

      // Store token in localStorage or cookies
      localStorage.setItem("token", response.data.token);

      // Redirect to home page or dashboard
      navigate("/dashboard");

      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-lg backdrop-blur-md bg-white/5 border-white/20">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login to Dashboard
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-200 bg-red-900/30 border border-red-500/50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-4 py-2 text-white bg-black/30 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent border-gray-500/50"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 text-white bg-black/30 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent border-gray-500/50"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              className={`w-full px-6 py-3 font-bold rounded-lg shadow-lg transition-colors ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-lime-400 hover:bg-lime-500 text-black"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
