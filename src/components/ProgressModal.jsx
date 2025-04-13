import { motion } from "framer-motion";
import { X } from "lucide-react";

const ProgressModal = ({ isOpen, progressData, onClose }) => {
  if (!isOpen || !progressData) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Friend's Progress
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {progressData.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No habits found for this friend.
            </p>
          ) : (
            progressData.map((habit) => (
              <div
                key={habit._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <h4 className="text-lg font-medium text-indigo-700">
                  {habit.name}
                </h4>
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                  <p>
                    🔥 Streak:{" "}
                    <span className="font-medium">{habit.streak || 0}</span>{" "}
                    days
                  </p>
                  <p>
                    ✅ Completed:{" "}
                    <span
                      className={`font-medium ${
                        habit.completed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {habit.completed ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressModal;
