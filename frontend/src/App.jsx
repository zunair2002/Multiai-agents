import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./utils/firebase.js";
import api from './utils/axiosconfig.js'

function App() {

  
  const login = async(token)=>{
    try {
      const {data} = await api.post("/auth/login",{token});
      console.log(data);

    } catch (error) {
      console.log('login error',error);
    }
  }
  
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
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100">
      <button className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 active:scale-95" onClick={googlelogin}>
        
        <div className="rounded-full bg-gray-100 p-2 transition">
          <FcGoogle size={28} />
        </div>

        <span className="text-lg font-semibold text-gray-700">
          Continue with Google
        </span>
      </button>
    </div>
  )
}

export default App
