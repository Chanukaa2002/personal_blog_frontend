import { Link } from "react-router-dom";

const NavBar = () => {
  // Function to handle external link navigation
  const navigateToExternal = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 mx-auto mt-2 border rounded-full shadow-lg backdrop-blur-md bg-white/5 border-white/20 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <div className="sm:hidden">
            <div
              className="justify-center text-xs text-center text-gray-300 focus:outline-none"
            >
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-bold text-gray-300 rounded-md cursor-pointer hover:bg-lime-400 hover:text-black"
              >
                Home
              </Link>
              <span
                className="px-3 py-2 text-sm font-bold text-gray-300 rounded-md cursor-pointer hover:bg-lime-400 hover:text-black"
              >
                About
              </span>
              <span
                onClick={() => navigateToExternal("https://www.chanukadilshan.live")}
                className="px-3 py-2 text-sm font-bold text-gray-300 rounded-md cursor-pointer hover:bg-lime-400 hover:text-black"
              >
                Portfolio
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;