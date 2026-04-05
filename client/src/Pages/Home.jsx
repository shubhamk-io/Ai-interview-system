import React, { useState } from "react";
import Navebar from "../components/Navebar";
import { useSelector } from "react-redux";
import {
  BsRobot,
  BsMic,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="min-h-screen bg-[#f3f3f3] relative overflow-hidden">
      {userData && <Navebar />}

      {/* 🔥 Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-400/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-400/30 rounded-full blur-[120px]" />

      {/* HERO */}
      <div className="flex flex-col items-center text-center px-6 py-20 relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm"
        >
          <HiSparkles className="text-green-500" />
          <span className="text-sm text-gray-600">
            AI Powered Interview System
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
        >
          Master Interviews with{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Intelligence
            </span>
            {/* Glow underline */}
            <span className="absolute left-0 bottom-0 w-full h-2 bg-purple-300/40 blur-md rounded-full"></span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-gray-500 max-w-xl"
        >
          Experience real interview simulations, voice interaction,
          and instant AI feedback — all in one powerful platform.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-8"
        >
          <button
            onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return
              }
              navigate("/interview")
            }}
            className="px-6 py-3 rounded-full text-white 
          bg-gradient-to-r from-indigo-500 to-purple-500 
          shadow-lg hover:scale-105 transition">
            Start Interview
          </button>

          <button className="px-6 py-3 rounded-full 
          bg-white/70 backdrop-blur border border-gray-300 
          hover:bg-white transition">
            Explore Features
          </button>
        </motion.div>

        {/* 🔥 Floating AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white/80 backdrop-blur-xl 
          border border-gray-200 shadow-xl rounded-3xl 
          p-6 w-full max-w-3xl"
        >
          <p className="text-sm text-gray-500 mb-3">
            🤖 AI Interview Preview
          </p>

          <div className="bg-black text-green-400 p-4 rounded-xl text-left font-mono text-sm">
            {" > "}Tell me about yourself... <br />
            {" > "}Analyzing confidence... <br />
            {" > "}Feedback: Improve clarity in answers
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 w-full max-w-6xl">

          {[
            {
              icon: <BsRobot />,
              title: "AI Interviewer",
              color: "text-indigo-500",
            },
            {
              icon: <BsMic />,
              title: "Voice Practice",
              color: "text-green-500",
            },
            {
              icon: <BsBarChart />,
              title: "Smart Analytics",
              color: "text-purple-500",
            },
            {
              icon: <BsFileEarmarkText />,
              title: "Instant Feedback",
              color: "text-orange-500",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-md 
              border border-gray-200 shadow-sm hover:shadow-lg transition"
            >
              <div className={`${item.color} mb-3 text-2xl`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enhance your interview performance with AI
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

    </div>
  );
};

export default Home;