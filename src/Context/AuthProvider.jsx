import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Firebase user
  const [role, setRole] = useState(null);      // User role
  const [profile, setProfile] = useState(null); // Full backend profile
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000";

  // Register user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name, photoURL });
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile from backend (useful after updating name/photo)
  const refreshProfile = async () => {
    if (!user?.email) return;
    try {
      const { data } = await axios.get(`${API_URL}/users/${user.email}`);
      setProfile(data);
      setUser((prev) => ({
        ...prev,
        displayName: data.name,
        photoURL: data.profileImage || prev.photoURL,
      }));
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  // Auth observer + fetch backend profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          // Set Firebase user
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            photoURL: currentUser.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png",
          });

          // Fetch full backend profile
          const { data } = await axios.get(`${API_URL}/users/${currentUser.email}`);
          setRole(data.role || null);
          setProfile(data || null); // full backend profile
        } else {
          setUser(null);
          setRole(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        setRole(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [API_URL]);

  const authInfo = {
    user,
    role,
    profile,
    loading,
    createUser,
    loginUser,
    logOut,
    refreshProfile, // <-- added function to refresh profile after update
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
