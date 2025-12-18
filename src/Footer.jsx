import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";
import LogoImage from "./assets/assetverse_logo.png"; // imported logo

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white pt-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center md:text-left">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <img
                                src={LogoImage}
                                alt="AssetVerse Logo"
                                className="w-10 h-10 rounded-2xl object-contain shadow-md"
                            />
                            <span className="text-xl font-bold">AssetVerse</span>
                        </div>
                        <p className="text-sm md:text-base">Manage your corporate assets efficiently with AssetVerse.</p>
                        <div className="flex flex-col gap-1 text-sm">
                            <p>Email: <a href="mailto:support@assetverse.com" className="underline hover:text-gray-200 transition">support@assetverse.com</a></p>
                            <p>Phone: <a href="tel:+880123456789" className="underline hover:text-gray-200 transition">+880 1234 56789</a></p>
                        </div>
                        <div className="flex gap-4 mt-2 justify-center md:justify-start">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
                                <Twitter size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                        <Link to="/" className="hover:underline hover:text-gray-200 transition">Home</Link>
                        <Link to="/join-employee" className="hover:underline hover:text-gray-200 transition">Join as Employee</Link>
                        <Link to="/join-hr" className="hover:underline hover:text-gray-200 transition">Join as HR</Link>
                        <Link to="/dashboard/profile" className="hover:underline hover:text-gray-200 transition">Profile</Link>
                        <Link to="/dashboard/assets" className="hover:underline hover:text-gray-200 transition">Assets</Link>
                    </div>

                    {/* Newsletter / Info */}
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h3 className="font-bold text-lg mb-2">Stay Connected</h3>
                        <p className="text-sm">Subscribe to our newsletter to get the latest updates.</p>
                        <form className="flex flex-col sm:flex-row gap-2 mt-2 w-full sm:w-auto justify-center md:justify-start">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="p-2 rounded-xl text-gray-800 flex-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            />
                            <button className="bg-white text-pink-500 font-bold px-4 py-2 rounded-xl hover:scale-105 transition transform">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/30 mt-8 pt-4 text-center text-sm md:text-base">
                    &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
