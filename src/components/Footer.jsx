import { Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-6 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-bold text-[#6a38c2]">JobHunt</h1>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} JobHunt. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex justify-center gap-6">
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform"
          >
            <Linkedin size={24} strokeWidth={2.5} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:scale-110 transition-transform"
          >
            <Twitter size={24} strokeWidth={2.5} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <Facebook size={24} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
