import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Ayesha R.",
      quote:
        "Habit Club helped me stay consistent with meditation for 30+ days!",
    },
    {
      name: "James T.",
      quote:
        "The group feature made all the difference. I finally stuck with journaling.",
    },
    {
      name: "Priya S.",
      quote: "The reminders and streaks kept me motivated to work out daily.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50 text-center">
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Loved by people like you
        </h2>
        <p className="text-gray-600 text-xl">
          Real stories from real members building habits together.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-lg border border-indigo-100 p-6 rounded-3xl shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <UserCircle2 className="text-indigo-600 w-8 h-8" />
              </div>
              <p className="font-semibold text-indigo-600">{t.name}</p>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed italic">
              “{t.quote}”
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
