import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiUser, FiLock } from "react-icons/fi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
import api from "../../utils/axiosconfig.js";
import { setUser } from "../../redux/userdatasclice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userData);
  console.log("Login.js sy user (on render):", user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await api.post("/api/auth/login", { idToken: idToken });
      console.log("Login.js sy data:", response);
      dispatch(setUser(response.data.user));
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#20201F] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <div className="relative mx-auto mb-5 h-40 w-40 overflow-visible">
            <img
              src="/ChatGPT_Image_Aug_1__2026__02_42_21_PM-removebg-preview.png"
              alt="MultiAgents Logo"
              className="absolute left-1/2 -translate-x-1/2 -top-8 w-56 h-56 object-contain"
            />
          </div>
          <div className="mx-auto my-6 h-px w-80 bg-[#2b2b2b]"></div>
          <p className="mt-3 text-zinc-100">
            Sign in to continue to your workspace.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 text-white/80 bg-zinc-900/80 p-8 shadow-xl" style={{ backgroundColor: "#131313" }}>
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white text-zinc-900 font-medium transition hover:bg-zinc-300 hover:cursor-pointer transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="my-6 h-px bg-zinc-800"></div>

          <div className="flex justify-between text-sm text-zinc-500">
            <button className="hover:text-zinc-300 transition hover:cursor-pointer">
              Do you have an account?
            </button>

            <Link to="/" className="hover:text-zinc-300 transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
