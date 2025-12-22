import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import {
    Briefcase,
    ShieldCheck,
    Users,
    BarChart3,
    Package,
    Workflow,
} from "lucide-react";
import RobotLoader from "../RobotLoader/RobotLoader";
import "../RobotLoader/RobotLoader.css";

const Home = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get("https://asset-verse-server-mocha.vercel.app/packages");
                setPackages(res.data);
            } catch (err) {
                console.error("Failed to fetch packages:", err);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="overflow-hidden">

            {/* ================= HERO SECTION ================= */}
            <section className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.15 } // smooth stagger
                            },
                        }}
                        className="space-y-6"
                    >
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: -10 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="text-4xl md:text-5xl font-extrabold leading-tight"
                        >
                            Manage Company Assets <br />
                            <span className="text-yellow-300">Smartly & Securely</span>
                        </motion.h1>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: -10 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="text-lg text-white/90"
                        >
                            AssetVerse helps organizations track, assign, and manage assets efficiently while improving accountability across teams.
                        </motion.p>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 5 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="btn bg-white text-pink-500 font-bold px-6 hover:scale-105 transition transform">
                                Get Started
                            </button>
                            <button className="btn border border-white text-orange-400 font-bold px-6 hover:scale-105 transition transform">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.img
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                        alt="Corporate Management"
                        className="rounded-2xl shadow-2xl w-full"
                    />

                </div>
            </section>


            {/* ================= ABOUT SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-50 via-orange-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Why Choose AssetVerse?
                    </h2>
                    <p className="max-w-2xl mx-auto mb-12 text-gray-600">
                        Built for modern organizations to simplify asset
                        tracking and workforce management.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Secure Tracking" },
                            { icon: Users, title: "Employee Management" },
                            { icon: Workflow, title: "Smooth Workflow" },
                            { icon: BarChart3, title: "Insightful Analytics" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="card bg-white p-6 shadow hover:shadow-lg transition"
                            >
                                <item.icon className="mx-auto text-pink-500 mb-4" size={36} />
                                <h3 className="font-semibold text-lg">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PACKAGES SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-50 via-orange-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        Subscription Packages
                    </h2>

                    {packages.length === 0 ? (
                        <RobotLoader></RobotLoader>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-white shadow-xl p-8"
                                >
                                    <h3 className="text-xl font-bold mb-2">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-4xl font-extrabold mb-4">
                                        ${pkg.price}
                                    </p>
                                    <p className="mb-4 text-gray-500">
                                        Up to {pkg.employeeLimit} Employees
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {pkg.features.map((f, i) => (
                                            <li key={i} className="flex gap-2 items-center">
                                                <Package size={18} className="text-green-500" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn bg-pink-500 text-white w-full hover:scale-105 transition transform">
                                        Choose Plan
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ================= FEATURES SHOWCASE ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-50 via-orange-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        Powerful Features
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            "Asset Assignment",
                            "Request Approval System",
                            "Multi-Company Support",
                            "Return Tracking",
                            "Employee Dashboard",
                            "HR Analytics",
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="card bg-white p-6 shadow hover:shadow-lg transition"
                            >
                                <h3 className="font-semibold">{feature}</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    Designed to simplify corporate asset
                                    management.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS / STATS ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        Trusted by Growing Companies
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {["100+ Companies", "10k+ Assets Managed", "99% Client Satisfaction"].map(
                            (stat, idx) => (
                                <div key={idx} className="text-2xl font-bold">
                                    {stat}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-50 via-orange-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">How It Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {["Register Your Company", "Add & Assign Assets", "Track & Optimize"].map(
                            (step, idx) => (
                                <div key={idx} className="card bg-white p-6 shadow hover:shadow-lg transition">
                                    <h3 className="font-semibold text-lg">{step}</h3>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="mb-6">Join AssetVerse today and take full control of your corporate assets.</p>
                <button className="btn bg-white text-pink-500 px-8 font-bold hover:scale-105 transition transform">
                    Join Now
                </button>
            </section>

        </div>
    );
};

export default Home;
