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
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    const API_URL = "http://localhost:3000";

    // Register user
    const createUser = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {
                displayName: name,
                photoURL,
            });
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
        } finally {
            setLoading(false);
        }
    };

    // Auth observer + role fetching
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            try {
                if (currentUser) {
                    // Set Firebase user
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png",
                    });

                    // Fetch role from backend
                    const { data } = await axios.get(`${API_URL}/users/${currentUser.email}`);
                    setRole(data.role);
                } else {
                    setUser(null);
                    setRole(null);
                }
            } catch (err) {
                console.error("Auth error:", err);
                setUser(null);
                setRole(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [API_URL]);

    const authInfo = {
        user,
        role,
        loading,
        createUser,
        loginUser,
        logOut,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
