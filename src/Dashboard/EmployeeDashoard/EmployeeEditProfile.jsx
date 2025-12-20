import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import RobotLoader from "../../RobotLoader/RobotLoader";
import "../../RobotLoader/RobotLoader.css";

const EmployeeEditProfile = () => {
  const { user, profile, loading, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000";

  // Initialize state from profile safely
  const [displayName, setDisplayName] = useState(profile?.name || "");
  const [photoURL, setPhotoURL] = useState(profile?.profileImage || user?.photoURL || "");

  if (loading) return <RobotLoader></RobotLoader>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      await axios.put(`${API_URL}/users/${profile.email}`, { displayName, photoURL });
      await refreshProfile();
      toast.success("Profile updated successfully!");
      navigate("/dashboard/employeeProfile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center mt-8 pb-10">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 transition-transform duration-300 group-hover:scale-105">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 ring-4 ring-cyan-400 ring-opacity-75 animate-pulse"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Profile Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full transition duration-300 hover:scale-105"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered w-full transition duration-300 hover:scale-105"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={profile?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 hover:scale-105 transition-transform duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditProfile;
