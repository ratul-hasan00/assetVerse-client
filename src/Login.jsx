import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "./Context/AuthContext";
import LogoImage from "./assets/assetverse_logo.png";
import toast from "react-hot-toast";

const Login = () => {
    const { loginUser, resetPassword, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false); // local button loading

    const handleLogin = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            await loginUser(email, password);
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            if (err.code === "auth/wrong-password") {
                toast.error("Incorrect password. Please try again.");
            } else if (err.code === "auth/user-not-found") {
                toast.error("No account found with this email.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            setBtnLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            toast.error("Please enter your email to reset password.");
            return;
        }

        try {
            await resetPassword(email);
            toast.success("Password reset email sent. Check your inbox.");
        } catch (err) {
            console.error(err);
            toast.error("Failed to send reset email. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-orange-50 to-pink-50 px-4">
            <title>Login</title>
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={LogoImage} alt="AssetVerse Logo" className="w-20 h-20 mb-2" />
                    <h2 className="text-3xl font-bold text-slate-800 mb-1">Welcome Back</h2>
                    <p className="text-sm text-slate-500 text-center">
                        Login to your AssetVerse account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@email.com"
                            className="input input-bordered w-full rounded-xl border-slate-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition duration-300 h-12"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="input input-bordered w-full rounded-xl border-slate-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 pr-12 transition duration-300 h-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-2.5 h-full flex items-center justify-center text-slate-400 hover:text-slate-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end text-sm">
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="text-cyan-500 font-medium hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={btnLoading || loading}
                        className={`btn w-full border-none text-white bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 rounded-xl shadow-lg transition-transform duration-300
                            ${(btnLoading || loading) ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.03]"}`}
                    >
                        {btnLoading || loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-slate-600">
                    Don’t have an account?{" "}
                    <Link to="/join-employee" className="text-cyan-500 font-medium hover:underline">
                        Join as Employee
                    </Link>{" "}
                    or{" "}
                    <Link to="/join-hr" className="text-cyan-500 font-medium hover:underline">
                        Join as HR
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
