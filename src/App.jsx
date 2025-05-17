import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.Page";
import Post from "./pages/Post.Page";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* NavBar stays at the top */}
        <NavBar />

        {/* Main content area with glass effect */}
        <div className="flex-grow p-6 glass-effect">
          <div className="container mx-auto">
            {/* Routes container */}
            <div className="mt-16 md:mt-20">
              {" "}
              {/* Add top margin to account for fixed navbar */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
