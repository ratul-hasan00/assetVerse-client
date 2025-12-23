import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import LogoImage from "./assets/assetverse_logo.png";
import { AuthContext } from "./Context/AuthContext";
import toast from "react-hot-toast";

const JoinEmployee = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        profileImage: "", // optional input
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (
            formData.password.length < 6 ||
            !/[A-Z]/.test(formData.password) ||
            !/[0-9]/.test(formData.password)
        ) {
            return toast.error(
                "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
            );
        }

        setLoading(true);
        try {
            // 1️⃣ Create user in Firebase
            const result = await createUser(
                formData.email,
                formData.password,
                formData.name,
                formData.profileImage || "https://i.postimg.cc/g2kKPx8n/employee.jpg"
            );

            // 2️⃣ Prepare backend data
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password, // backend will hash it
                role: "employee",
                dateOfBirth: formData.dateOfBirth,
                profileImage: result.user.photoURL,
                createdAt: new Date(),
            };

            // 3️⃣ Post to backend
            await axios.post("https://asset-verse-server-mocha.vercel.app/users", userData);

            toast.success("Employee registered successfully! Login Now!");
            navigate("/login"); // Redirect to Home page
        } catch (err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                toast.error("This email is already registered in Firebase.");
            } else {
                toast.error(err.response?.data?.message || err.message || "Registration failed!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-orange-50 to-pink-50 px-4 py-10">
            <title>Join As Employee</title>
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <img src={LogoImage} alt="AssetVerse Logo" className="w-20 h-20 mb-2" />
                    <h2 className="text-3xl font-bold text-slate-800 mb-1">
                        Join as Employee
                    </h2>
                    <p className="text-sm text-slate-500 text-center">
                        Create your AssetVerse employee account
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full rounded-xl"
                            placeholder="Your Full Name"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full rounded-xl"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="relative">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full rounded-xl pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-2.5 h-full flex items-center justify-center text-slate-400 hover:text-slate-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Profile Image URL</span>
                        </label>
                        <input
                            type="url"
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleChange}
                            className="input input-bordered w-full rounded-xl"
                            placeholder="Paste The Photo URL"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn w-full border-none text-white bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-500 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default JoinEmployee;
