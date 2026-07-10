import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../utils/firebase.js";
import api from "../utils/axiosconfig.js";
function Homepage() {
  const login = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log(data);
    } catch (error) {
      console.log("login error", error);
    }
  };

  const googlelogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuthProvider);
      const token = await data.user.getIdToken();
      console.log(token);

      await login(token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#f3f1ef] flex items-center justify-center p-6 font-sans">
      {/* Main Card Container */}
      <div className="flex w-full max-w-[850px] bg-white rounded-[35px] overflow-hidden shadow-2xl min-h-[500px]">
        {/* Left Side: Branding & Graphics */}
        <div className="relative w-[45%] bg-[#3d007b] p-10 text-white flex flex-col justify-center overflow-hidden">
          {/* Custom Decorative Shapes to match image exactly */}
          <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-gradient-to-b from-[#ba1bff] to-[#140b59] rounded-full"></div>
          <div className="absolute bottom-[15%] left-[25%] w-[180px] h-[180px] bg-gradient-to-b from-[#2c0954] to-[#3288ec] rounded-full shadow-xl z-10"></div>
          <div className="absolute bottom-[-15%] left-[-20%] w-[220px] h-[220px] bg-[#ba1bff] rounded-full opacity-50"></div>

          <div className="relative z-20">
            <h1 className="text-4xl font-black tracking-tight mb-1">WELCOME</h1>
            <h2 className="text-[13px] font-bold mb-4 tracking-[0.15em] opacity-90">
              MultiAgent Application
            </h2>
            <p className="text-[10px] text-blue-100 max-w-[220px] leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim quis nostrud exerci tation.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-[55%] p-12 flex flex-col justify-center bg-white">
          <div className="max-w-[320px] mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Sign In</h2>
            <p className="text-[10px] text-gray-800 mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit
            </p>

            <form className="space-y-3">
              {/* Username Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full pl-11 pr-4 py-3 bg-[#f0f0f0] border-none rounded-lg text-xs focus:ring-1 focus:ring-blue-400 outline-none placeholder:text-gray-500"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-11 pr-16 py-3 bg-[#f0f0f0] border-none rounded-lg text-xs focus:ring-1 focus:ring-blue-400 outline-none placeholder:text-gray-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-black"
                >
                  <FiEye size={12} />
                </button>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 h-3 rounded border-gray-300 text-blue-600 focus:ring-0"
                  />
                  <span className="text-[10px] text-gray-800 font-medium">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[10px] text-blue-500 font-medium hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-[#3D007B] text-white py-3 rounded-lg font-bold text-xs shadow-md hover:bg-[#003366] transition-all"
                >
                  Sing in
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-3 text-gray-400 text-[9px]">
                    Or
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg font-bold text-xs hover:bg-gray-50 transition-all"
                  onClick={googlelogin}
                >
                  <FcGoogle size={20} />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="relative">
              {/* Decorative corner shape like in image */}
              <p className="mt-8 text-center text-[10px] text-gray-800 relative z-10">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-[10px] text-blue-500 font-medium hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
