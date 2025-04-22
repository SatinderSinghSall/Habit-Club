import { FaUsers, FaLightbulb, FaHandsHelping, FaRocket } from "react-icons/fa";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FounderPic from "../assets/images/Satinder_Image.jpg";

const values = [
  {
    icon: <FaLightbulb className="text-indigo-600 text-4xl" />,
    title: "Our Mission",
    text: "To empower everyone to build healthier, more consistent habits through community and data-driven insights.",
  },
  {
    icon: <FaHandsHelping className="text-indigo-600 text-4xl" />,
    title: "Our Community",
    text: "We believe accountability and collective motivation unlock lasting change—join a global network of habit builders.",
  },
  {
    icon: <FaRocket className="text-indigo-600 text-4xl" />,
    title: "Our Vision",
    text: "Habit Club at every doorstep—where small daily actions lead to big life transformations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800">
        {/* Hero */}
        <section className="pt-24 pb-16 text-center px-6">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            About Habit Club
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            I’m the creator of Habit Club—a one‑person passion project born from
            my own journey to build and sustain better habits.
          </p>
        </section>

        {/* Values */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Story */}
        <section className="relative py-20 bg-white overflow-hidden">
          {/* Decorative SVG Shape */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2">
            <svg
              className="absolute top-0 left-0 transform -translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="dotPattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="2"
                    cy="2"
                    r="2"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#dotPattern)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={FounderPic}
                  alt="Satinder Singh Sall"
                  className="w-64 h-64 rounded-full object-cover shadow-2xl ring-4 ring-indigo-100"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-extrabold text-gray-900">
                  Meet the Founder
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Hi, I’m{" "}
                  <span className="font-semibold text-indigo-600">
                    Satinder Singh Sall
                  </span>
                  , the sole developer and visionary behind Habit Club. What
                  started as a personal experiment to track my daily routines
                  quickly grew into a full‑featured web app. I built every line
                  of code, designed every pixel, and continue iterating based on
                  real user feedback.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  My goal is simple: give you a beautiful, intuitive tool to
                  help you stay consistent and motivated every single day.
                </p>
                <div className="flex justify-center lg:justify-start space-x-4 mt-6">
                  <a
                    href="https://github.com/SatinderSinghSall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FaGithub className="mr-2 text-lg" /> GitHub
                  </a>

                  <a
                    href="https://x.com/SallSatinder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FaTwitter className="mr-2 text-lg" /> X / Twitter
                  </a>

                  <a
                    href="https://www.instagram.com/satindersinghsall/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition"
                  >
                    <FaInstagram className="mr-2 text-lg" /> Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-indigo-700 text-white text-center py-16 px-6 rounded-tl-3xl rounded-tr-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to build habits together?
          </h2>
          <p className="mb-6 max-w-lg mx-auto">
            Join Habit Club and start your journey today.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}
