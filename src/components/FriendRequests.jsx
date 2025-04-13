import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, UserPlus, Check, X } from "lucide-react";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/friends/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleResponse = async (userId, action) => {
    try {
      const endpoint =
        action === "accept"
          ? `/friends/accept/${userId}`
          : `/friends/reject/${userId}`;

      await axios.post(
        `${API_URL}${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests((prev) => prev.filter((r) => r._id !== userId));
    } catch (err) {
      console.error(`Failed to ${action} friend`, err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <UserPlus className="mx-auto h-8 w-8 mb-2" />
        No incoming friend requests.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
        Friend Requests
      </h2>
      <div className="space-y-4">
        {requests.map((req, i) => {
          const initials = req.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 sm:p-5 transition-all"
            >
              <div className="flex items-center gap-4 mb-3 sm:mb-0 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 text-indigo-600 font-semibold flex items-center justify-center text-sm sm:text-base shadow-sm">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {req.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{req.email}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end sm:justify-start">
                <button
                  onClick={() => handleResponse(req._id, "accept")}
                  className="p-2 sm:p-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition"
                  title="Accept"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleResponse(req._id, "reject")}
                  className="p-2 sm:p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                  title="Reject"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequests;
