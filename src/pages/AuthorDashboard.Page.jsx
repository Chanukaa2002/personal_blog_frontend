import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home.Page";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Configure axios to always send credentials
axios.defaults.withCredentials = true;

const Analytics = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-white text-2xl font-bold bg-white/10 p-8 rounded-lg backdrop-blur-md">
      Analytics Dashboard - Coming Soon!
    </div>
  </div>
);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        "https://blog-backend.chanukadilshan.live/api/v1/post",
        { title, tag, content }
      );
      setSuccess(true);
      setTitle("");
      setTag("");
      setContent("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError(err.response?.data?.error || "Failed to create post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Create New Post</h2>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4">
          Post created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://blog-backend.chanukadilshan.live/api/v1/auth"
        );
        setProfile(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to fetch profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLottieReact
          src="https://lottie.host/7b294e2c-377b-465d-b603-b397c034e720/LyegJlQUMl.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-8 text-center text-xl">{error}</div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">My Profile</h2>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">User Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-medium">Username:</span> {profile.username}
            </p>
            <p>
              <span className="font-medium">GitHub:</span>{" "}
              {profile.github_username || "Not provided"}
            </p>
          </div>
        </div>
        <button className="mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const AuthorDashboard = () => {
  const [activeTab, setActiveTab] = useState("allPosts");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://blog-backend.chanukadilshan.live/api/v1/auth");
        setAuthChecked(true);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("https://blog-backend.chanukadilshan.live/api/v1/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderContent = () => {
    if (!authChecked) {
      return (
        <div className="flex justify-center items-center h-screen">
          <DotLottieReact
            src="https://lottie.host/7b294e2c-377b-465d-b603-b397c034e720/LyegJlQUMl.lottie"
            loop
            autoplay
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      );
    }

    switch (activeTab) {
      case "allPosts":
        return <Home />;
      case "createPost":
        return <CreatePost />;
      case "analytics":
        return <Analytics />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold">Author Dashboard</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            {sidebarCollapsed ? "»" : "«"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("allPosts")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === "allPosts"
                ? "bg-lime-400 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">📝</span>
            {!sidebarCollapsed && "All Posts"}
          </button>
          <button
            onClick={() => setActiveTab("createPost")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === "createPost"
                ? "bg-lime-400 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">✏️</span>
            {!sidebarCollapsed && "Create Post"}
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === "analytics"
                ? "bg-lime-400 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">📊</span>
            {!sidebarCollapsed && "Analytics"}
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-lime-400 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">👤</span>
            {!sidebarCollapsed && "My Profile"}
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
          >
            <span className="mr-3">🚪</span>
            {!sidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthorDashboard;