import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import NavBar from "./Navbar";
import Footer from "./Footer";

function PageNotFoundRoute() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6 text-center">
        <div className="flex items-center gap-2 mb-4 text-red-500">
          <AlertTriangle className="w-8 h-8" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            404 Not Found
          </h1>
        </div>

        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md">
          Sorry, the page you were looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFoundRoute;
