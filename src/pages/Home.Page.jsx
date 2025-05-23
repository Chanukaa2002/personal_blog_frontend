import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Add this import
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Card from "../components/Card";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const { authorId } = useParams(); // Get authorId from URL if it exists

  useEffect(() => {
    const fetchUrl = authorId
      ? `https://blog-backend.chanukadilshan.live/api/v1/post/all/${authorId}`
      : "https://blog-backend.chanukadilshan.live/api/v1/post/all";

    axios
      .get(fetchUrl)
      .then((response) => {
        setData(response.data.posts || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [authorId]); // Re-fetch when authorId changes

  // Get unique tags from all posts
  const allTags = [
    "All",
    ...new Set(data.map((post) => post.tag).filter(Boolean)),
  ];

  // Filter posts based on selected tag
  const filteredPosts =
    activeFilter === "All"
      ? data
      : data.filter((post) => post.tag === activeFilter);

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
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  }

  return (
    <section>
      <div className="pt-20 pb-10 text-center text-white">
        <p className="pb-6 text-4xl font-bold">
          {authorId ? "Your Blog Posts" : "All Blog Posts"}
        </p>

        {/* Only show filter if not viewing author-specific posts */}
        {!authorId && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2 rounded-lg shadow-lg backdrop-blur-md border font-bold border-white/20 transition-colors ${
                  activeFilter === tag
                    ? "bg-lime-400 text-black"
                    : "bg-white/5 text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        <div className="flex items-center justify-center">
          <div className="w-full px-4 md:w-3/4">
            {filteredPosts.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                {authorId
                  ? "You haven't created any posts yet."
                  : "No posts found."}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Card
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    tag={post.tag || "Uncategorized"}
                    content={post.content}
                    showEdit={!!authorId} // Show edit options if viewing author's posts
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
