import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For debugging
  console.log("Post ID:", id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://blog-backend.chanukadilshan.live/api/v1/post/id/${id}`
        );
        console.log("API Response:", response.data);

        if (!response.data || !response.data.Post) {
          throw new Error("Post not found");
        }
        setPost(response.data.Post);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
        // Don't redirect automatically, let's see the error first
        // navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setError("No post ID provided");
      setLoading(false);
    }
  }, [id, navigate]);

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
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <article className="p-2 border rounded-lg shadow-lg backdrop-blur-sm bg-white/5 border-white/20 hover:shadow-xl transition-shadow duration-300">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-300 mb-4">
            {post.title}
          </h1>
          <div >
            {post.tag && (
              <span className="text-sm font-semibold rounded-full text-lime-400 me-2 px-2.5 py-0.5 border-solid border border-lime-400 shadow-lg backdrop-blur-sm bg-white/5">
                {post.tag}
              </span>
            )}
            <span className="pt-4 text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="pt-4 text-gray-400">{post.likes} likes</span>
          </div>
          <div className="prose max-w-none text-neutral-200 pt-4">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
        </div>
      </article>
      {/* <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Back to Posts
      </button> */}
    </div>
  );
}

export default Post;
