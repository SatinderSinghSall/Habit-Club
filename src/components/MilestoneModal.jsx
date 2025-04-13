import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const MilestoneModal = ({ open, onClose, milestone }) => {
  useEffect(() => {
    if (open) {
      confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full text-center"
        >
          <Dialog.Title className="text-2xl font-bold text-indigo-700">
            🎉 Milestone Achieved!
          </Dialog.Title>
          <p className="text-gray-700 mt-2">
            You've reached a <strong>{milestone.target}-day</strong> streak!
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
          >
            Awesome!
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MilestoneModal;
