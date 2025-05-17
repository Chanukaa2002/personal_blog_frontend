import { Link } from "react-router-dom";
function Card({ id, title, tag,content }) {

    const previewContent = content ? 
    (content.length > 100 ? content.substring(0, 100) + "..." : content) : 
    "Click to read more...";
  return (
    <Link to={`/post/${id}`}>
      <div className="p-2 border rounded-lg shadow-lg backdrop-blur-sm bg-white/5 border-white/20 hover:shadow-xl transition-shadow duration-300">
        <div className="p-4">
          <p className="inline-block mt-2 text-xl font-bold text-white">
            {title}
          </p>

          <p className="pt-4 text-gray-400">{previewContent}</p>

          <div className="pt-4">
            <span className="text-sm font-semibold rounded-full text-lime-400 me-2 px-2.5 py-0.5 border-solid border border-lime-400 shadow-lg backdrop-blur-sm bg-white/5">
              {tag}
            </span>
          </div>

          <div className="flex justify-end pt-4">
            <span className="flex items-center text-white transition-colors hover:text-lime-100">
              <i className="mr-2 text-xl fas fa-arrow-right"></i>
              <span>Read More</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
