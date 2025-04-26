import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", message: "" };

    // Validate name
    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Validate message
    if (!formData.message) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/contact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast.success(data.message); // Success message
          setFormData({ name: "", email: "", message: "" }); // Reset form
        } else {
          toast.error(data.error || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to send message.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-10 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Got a question, feedback, or just want to say hi? We’d love to hear
            from you!
          </p>
        </div>

        <form
          className="space-y-8 bg-white p-10 rounded-3xl shadow-xl max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-3 text-lg font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-6 py-4 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-300 ease-in-out`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-3 text-lg font-medium text-gray-700"
            >
              <div className="flex items-center space-x-2">
                <span>Email</span>
              </div>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-6 py-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-300 ease-in-out`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-3 text-lg font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-6 py-4 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-300 ease-in-out`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-2xl focus:outline-none transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
