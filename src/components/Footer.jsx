import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-600">Habit Club</h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Build better habits together. Stay consistent, stay motivated.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="/features"
                className="hover:text-indigo-600 hover:underline transition-all"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-indigo-600 hover:underline transition-all"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-600 hover:underline transition-all"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:text-indigo-600 hover:underline transition-all"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Connect With Us
          </h3>
          <div className="flex items-center space-x-5">
            <a
              href="https://x.com/SallSatinder"
              target="_blank"
              aria-label="Twitter"
              className="text-gray-500 hover:text-indigo-600 transition text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/satindersinghsall/?hl=en"
              target="_blank"
              aria-label="Instagram"
              className="text-gray-500 hover:text-indigo-600 transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/SatinderSinghSall"
              target="_blank"
              aria-label="GitHub"
              className="text-gray-500 hover:text-indigo-600 transition text-xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-400 py-6 border-t border-gray-100">
        © {new Date().getFullYear()} Habit Club. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
