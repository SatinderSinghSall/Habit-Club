// src/pages/FeaturesPage.jsx
import {
  FaUsers,
  FaChartLine,
  FaBell,
  FaCalendarAlt,
  FaShieldAlt,
  FaBullseye,
  FaTrophy,
  FaMobileAlt,
  FaPalette,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FaUsers className="text-indigo-600 text-4xl" />,
    title: "Social Accountability",
    description:
      "Connect with friends, join groups, and build habits together for stronger commitment.",
  },
  {
    icon: <FaChartLine className="text-indigo-600 text-4xl" />,
    title: "Progress Analytics",
    description:
      "Track your daily check‑ins, streaks, and completion rates with beautiful, interactive charts.",
  },
  {
    icon: <FaBell className="text-indigo-600 text-4xl" />,
    title: "Smart Reminders",
    description:
      "Get personalized reminders so you never miss a check‑in, whenever and wherever you are.",
  },
  {
    icon: <FaCalendarAlt className="text-indigo-600 text-4xl" />,
    title: "Calendar View",
    description:
      "Visualize your habit performance over weeks and months in a clean calendar layout.",
  },
  {
    icon: <FaBullseye className="text-indigo-600 text-4xl" />,
    title: "Goals & Milestones",
    description:
      "Set custom goals, earn badges when you hit milestones, and celebrate your wins.",
  },
  {
    icon: <FaTrophy className="text-indigo-600 text-4xl" />,
    title: "Habit Challenges",
    description:
      "Join community challenges (30‑day plank, journaling streaks) to stay motivated together.",
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-4xl" />,
    title: "PWA & Offline Mode",
    description:
      "Install Habit Club as an app on your home screen and check in even when offline.",
  },
  {
    icon: <FaPalette className="text-indigo-600 text-4xl" />,
    title: "Custom Themes",
    description:
      "Switch between Light, Dark, or your own color theme for a truly personal experience.",
  },
  {
    icon: <FaShieldAlt className="text-indigo-600 text-4xl" />,
    title: "Private & Secure",
    description:
      "Your data stays yours. We encrypt everything and never share without permission.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Hero */}
        <section className="pt-20 pb-12 text-center px-6">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Why Habit Club?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to build consistent habits, stay motivated, and
            track real progress — all in one beautiful app.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-indigo-700 text-white py-16 px-6 text-center rounded-tl-3xl rounded-tr-3xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Habits?
          </h2>
          <p className="mb-8 max-w-xl mx-auto">
            Join thousands of others building better routines together. It’s
            free to start!
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}
