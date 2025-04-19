import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import habit1 from "../assets/images/habit1.png";
import habit2 from "../assets/images/habit2.png";
import habit3 from "../assets/images/habit3.png";
import habit4 from "../assets/images/habit4.png";
import habit5 from "../assets/images/habit5.png";

const images = [habit1, habit2, habit3, habit4, habit5];

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full px-6 py-24 overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Build Better Habits{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Together
            </span>
          </h1>
          <p className="text-gray-600 mt-6 text-lg md:text-xl">
            Join habit groups, track your progress, and stay accountable with
            friends. Your better self starts here.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <button
              className="px-6 py-3 text-white rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2"
        >
          <img
            src={images[currentImageIndex]}
            alt="Habit Club UI mockup"
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
