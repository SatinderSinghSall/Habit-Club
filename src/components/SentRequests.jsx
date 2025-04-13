import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const SentRequests = () => {
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/friends/sent`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSent(data);
      } catch (err) {
        console.error("Failed to fetch sent requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSent();
  }, []);

  const handleCancel = async (userId) => {
    try {
      await axios.post(
        `${API_URL}/friends/cancel/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSent((prev) => prev.filter((r) => r._id !== userId));
    } catch (err) {
      console.error("Failed to cancel request", err);
    }
  };

  if (loading || sent.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Pending Friend Requests
      </h2>
      <div className="space-y-3">
        {sent.map((user, i) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <motion.div
              key={user._id || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all gap-3"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-semibold flex items-center justify-center text-sm shadow-sm">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p
                    className="text-sm text-gray-500 truncate"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-row flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3 mt-3 sm:mt-0 w-full sm:w-auto">
                <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full w-max">
                  <Clock className="w-3 h-3" />
                  Pending
                </span>
                <button
                  onClick={() => handleCancel(user._id)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-200 w-max"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SentRequests;
