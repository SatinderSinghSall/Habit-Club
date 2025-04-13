import { motion } from "framer-motion";

function Features() {
  const featureList = [
    {
      title: "Track Daily Habits",
      description: "Create habits and mark daily check-ins to build streaks.",
      icon: "✅",
    },
    {
      title: "Join Habit Groups",
      description:
        "Stay motivated by joining small social accountability groups.",
      icon: "👥",
    },
    {
      title: "Progress Insights",
      description: "Visualize your progress and stay on top of your routines.",
      icon: "📈",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Features That Keep You Consistent
        </h2>
        <p className="text-gray-600 text-lg mb-16">
          Designed to help you stay motivated, accountable, and on track.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-indigo-50 text-3xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-3">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
