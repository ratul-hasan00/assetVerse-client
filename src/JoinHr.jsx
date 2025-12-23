import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import LogoImage from "./assets/assetverse_logo.png";
import { AuthContext } from "./Context/AuthContext";
import toast from "react-hot-toast";

const JoinHR = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    companyName: "",
  });

  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [profileAvatarFile, setProfileAvatarFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setCompanyLogoFile(file);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileAvatarFile(file);
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
        profileAvatarFile
          ? URL.createObjectURL(profileAvatarFile)
          : "https://i.postimg.cc/k5RKnK4m/hr.jpg"
      );

      // 2️⃣ Prepare backend data
      const hrData = {
        name: formData.name,
        email: formData.email,
        role: "hr",
        dateOfBirth: formData.dateOfBirth,
        companyName: formData.companyName,
        companyLogo: companyLogoFile ? URL.createObjectURL(companyLogoFile) : "",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        profileImage: profileAvatarFile
          ? URL.createObjectURL(profileAvatarFile)
          : result.user.photoURL,
        createdAt: new Date(),
      };

      // 3️⃣ Post to backend
      await axios.post("https://asset-verse-server-mocha.vercel.app/users", hrData);

      toast.success("HR Manager registered successfully! Login Now!");
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
      <title>Join As HR</title>
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={LogoImage} alt="AssetVerse Logo" className="w-20 h-20 mb-2" />
          <h2 className="text-3xl font-bold text-slate-800">Join as HR Manager</h2>
          <p className="text-sm text-slate-500 text-center">
            Create your AssetVerse HR account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input input-bordered w-full rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Date of Birth */}
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

          {/* Company Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Company Name</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          {/* Company Logo */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Company Logo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input file-input-bordered w-full rounded-xl"
            />
            {companyLogoFile && (
              <p className="text-sm mt-1">Selected logo: {companyLogoFile.name}</p>
            )}
          </div>

          {/* Profile Avatar */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Profile Avatar</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input file-input-bordered w-full rounded-xl"
            />
            {profileAvatarFile && (
              <p className="text-sm mt-1">Selected avatar: {profileAvatarFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full text-white bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 border-none rounded-xl ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinHR;
