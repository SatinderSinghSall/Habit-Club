import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Users, UserX2 } from "lucide-react";
import FriendRequests from "../components/FriendRequests";
import SentRequests from "../components/SentRequests";
import ProgressModal from "../components/ProgressModal";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailToAdd, setEmailToAdd] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addMessage, setAddMessage] = useState(null);
  const [hasRequests, setHasRequests] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendProgress, setSelectedFriendProgress] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(data);
    } catch (err) {
      console.error("Failed to load friends", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleAddFriend = async () => {
    if (!emailToAdd) return;

    try {
      setAddLoading(true);
      const token = localStorage.getItem("token");
      const encodedEmail = encodeURIComponent(emailToAdd);

      const { data: user } = await axios.get(
        `${API_URL}/users/email/${encodedEmail}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data } = await axios.post(
        `${API_URL}/friends/request/${user._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAddMessage({ type: "success", text: data.message });
      setEmailToAdd("");
    } catch (err) {
      setAddMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send request",
      });
    } finally {
      setAddLoading(false);
    }
  };

  const handleFriendClick = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${API_URL}/friends/progress/${friendId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedFriendProgress(data);
    } catch (err) {
      console.error("Failed to fetch friend's progress", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-100 hover:text-indigo-600 shadow transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 w-16 h-16 rounded-2xl shadow-lg"
        >
          <Users className="w-7 h-7" />
        </motion.div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">
          Friends Dashboard
        </h1>
        <p className="mt-3 text-gray-500 text-lg">
          Connect, grow, and keep each other accountable.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12"
      >
        <FriendRequests />
        <SentRequests />
      </motion.div>

      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 max-w-2xl mx-auto shadow-xl mb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add a New Friend
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter friend’s email"
            value={emailToAdd}
            onChange={(e) => setEmailToAdd(e.target.value)}
            className="flex-1 w-full px-5 py-3 rounded-xl border border-gray-300 bg-white shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-gray-700"
          />
          <button
            onClick={handleAddFriend}
            disabled={addLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition font-semibold shadow-lg"
          >
            {addLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <User className="w-4 h-4" /> Send Request
              </>
            )}
          </button>
        </div>
        {addMessage && (
          <p
            className={`mt-3 text-sm ${
              addMessage.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {addMessage.text}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
      ) : friends.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 flex flex-col items-center py-10"
        >
          <UserX2 className="h-10 w-10 mb-2 text-gray-400" />
          <p className="text-lg font-medium">
            No friends yet. Start building your circle!
          </p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {friends.map((friend, i) => (
            <motion.div
              key={friend._id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleFriendClick(friend._id)}
              className="cursor-pointer group bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-700 text-base font-bold shadow">
                  {friend.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition">
                    {friend.name}
                  </h3>
                  <p
                    className="text-sm text-gray-500 truncate"
                    title={friend.email}
                  >
                    {friend.email}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedFriendProgress && (
        <ProgressModal
          isOpen={!!selectedFriendProgress}
          progressData={selectedFriendProgress}
          onClose={() => setSelectedFriendProgress(null)}
        />
      )}
    </div>
  );
};

export default FriendsPage;
