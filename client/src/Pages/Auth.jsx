import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';


const Auth = ({isModel = false}) => {
  const navigate = useNavigate();
const dispatch = useDispatch()



  const handleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      
      
      const user = response.user
      const name = user.displayName
      const email = user.email

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user))
      navigate("/");

    } catch (error) {
      console.log("Auth error:", error);
      dispatch(setUserData(null))
    }
}

  return (
    <div className='w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='w-full max-w-md p-8 rounded-3xl 
        bg-white/70 backdrop-blur-xl 
        border border-gray-200 
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]'>

        {/* Logo */}
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-2 rounded-xl shadow-md'>
            <BsRobot size={18} />
          </div>
          <h2 className='font-semibold text-lg tracking-wide text-gray-800'>
            InterViewIQ.AI
          </h2>
        </div>

        {/* Heading */}
        <h1 className='text-2xl md:text-3xl font-semibold text-center text-gray-900 leading-snug mb-4'>
          Continue with{" "}
          <span className='bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full inline-flex items-center gap-2 shadow-sm'>
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>

        {/* Subtext */}
        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
          Sign in to start AI-powered mock interviews, track your progress,
          and unlock detailed performance insights.
        </p>

        {/* Button */}
        <motion.button
          onClick={handleAuth}
          whileHover={{ scale: 1.03 }}
          whileTap={{
            scale: 0.94,
            rotate: -1,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
          }}
          className='w-full flex items-center justify-center gap-3 py-3 
          bg-white border border-gray-300 
          text-gray-800 rounded-full shadow-sm
          hover:shadow-md hover:bg-gray-50
          transition-all duration-300'
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>

        {/* Divider */}
        <div className='flex items-center gap-3 my-6'>
          <div className='flex-1 h-px bg-gray-200'></div>
          <span className='text-gray-400 text-xs'>OR</span>
          <div className='flex-1 h-px bg-gray-200'></div>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-gray-400'>
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </motion.div>

    </div>
  )
}

export default Auth