import React, { useState } from 'react'
import { motion } from "framer-motion";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { setUserData } from "../redux/userSlice"
import { serverUrl } from '../App';
import AuthModel from '../components/AuthModel';

const Navebar = () => {

    const { userData } = useSelector((state) => state.user)

    const [showCrediPopup, setShowCrediPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        try {
            const res = await axios.get(serverUrl + "/api/auth/logout", {
                withCredentials: true
            })
            console.log("Logout response:", res.data)

            dispatch(setUserData(null))
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log("Logout error:", error)
        }
    }

    return (
        <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6 relative z-50'>

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className='w-full max-w-6xl px-8 py-4 flex justify-between items-center relative
                rounded-[28px] 
                bg-white/60 backdrop-blur-xl 
                border border-gray-200 
                shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50'
            >

                {/* Logo */}
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 
                    text-white p-2 rounded-xl shadow-md'>
                        <BsRobot size={18} />
                    </div>

                    <h1 className='font-semibold hidden md:block text-lg tracking-wide'>
                        <span className='text-gray-800'>Intervu</span>
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                            AI
                        </span>
                    </h1>
                </div>

                {/* Right Side */}
                <div className='flex items-center gap-5 relative'>

                    {/* Credits */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return
                                }
                                setShowCrediPopup(!showCrediPopup);
                                setShowUserPopup(false);
                            }}
                            className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                            shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'
                        >
                            <BsCoin size={18} />
                            {userData?.credits || 0}
                        </button>

                        {showCrediPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='absolute right-0 mt-3 w-64 
                                bg-white/80 backdrop-blur-xl 
                                shadow-xl border border-gray-200 
                                rounded-xl p-5 z-50'
                            >
                                <p className='text-sm text-gray-600 mb-4'>
                                    Upgrade your credits to continue AI interviews seamlessly.
                                </p>

                                <button
                                    onClick={() => navigate("/pricing")}
                                    className='w-full py-2 rounded-lg text-sm font-medium
                                    bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                                    hover:opacity-90 transition'
                                >
                                    Buy More Credits
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* User Avatar */}
                    <div className='relative'>
                        <motion.button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCrediPopup(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            className='w-10 h-10 rounded-full flex items-center justify-center 
                            font-semibold text-white shadow-md
                            bg-gradient-to-tr from-indigo-500 to-purple-500'
                        >
                            {userData
                                ? userData?.name?.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={16} />}
                        </motion.button>

                        {showUserPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.25 }}
                                className='absolute right-0 mt-3 w-52 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'
                            >

                                <p className='text-sm font-semibold mb-3 
                                text-transparent bg-clip-text 
                                bg-gradient-to-r from-indigo-500 to-purple-500'>
                                    {userData?.name}
                                </p>

                                <div className='h-px bg-gray-200 mb-3'></div>

                                <motion.button
                                    whileHover={{ scale: 1.04, x: 3 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => navigate("/history")}
                                    className='w-full text-left text-sm py-2 px-3 rounded-lg 
                                    text-gray-600 hover:text-black 
                                    hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                                >
                                    Interview Analytics
                                </motion.button>

                                <motion.button
                                    onClick={handleSignOut}
                                    whileHover={{ scale: 1.04, x: 3 }}
                                    whileTap={{ scale: 0.96 }}
                                    className='w-full text-left text-sm py-2 px-3 mt-1 rounded-lg 
                                    flex items-center gap-2 text-red-500 hover:bg-red-50'
                                >
                                    <HiOutlineLogout size={16} />
                                    Sign Out
                                </motion.button>

                            </motion.div>
                        )}
                    </div>

                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navebar