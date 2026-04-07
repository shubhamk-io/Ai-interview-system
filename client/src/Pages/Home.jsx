import React, { useEffect, useState } from 'react'
import Navebar from "../components/Navebar";
import AuthModel from '../components/AuthModel';
import { useSelector } from "react-redux";
import { BsRobot, BsMic, BsBarChart, BsFileEarmarkText } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import evalImg from "../assets/ai-ans.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
import hrImg from "../assets/HR.png"
import techImg from '../assets/tech.png'
import  confidenceImg   from "../assets/confi.png"
import  creditImg   from "../assets/credit.png"
import Footer from '../components/Footer';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)

  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    const lines = [
      "Tell me about yourself...",
      "Analyzing confidence...",
      "Feedback: Improve clarity in answers"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";

    const typeLine = () => {
      if (lineIndex >= lines.length) return;

      if (charIndex < lines[lineIndex].length) {
        currentLine += lines[lineIndex][charIndex];
        charIndex++;

        setDisplayedLines(prev => {
          const updated = [...prev];
          updated[lineIndex] = currentLine;
          return updated;
        });

        setTimeout(typeLine, 35);
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = "";
        setTimeout(typeLine, 500);
      }
    };

    typeLine();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] relative overflow-hidden">

      {userData && <Navebar />}

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[120px]" />

      <div className='max-w-6xl mx-auto'>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[120px]" />

        {/* HERO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center px-6 py-20 relative z-10"
        >

          <motion.div variants={item} whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm">
            <HiSparkles className="text-green-500" />
            <span className="text-sm text-gray-600">AI Powered Interview System</span>
          </motion.div>

          <motion.h1 variants={item}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Master Interviews with{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p variants={item}
            className="mt-5 text-gray-500 max-w-xl">
            Experience real interview simulations, voice interaction,
            and instant AI feedback — all in one powerful platform.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!userData) return setShowAuth(true)
                navigate("/interview")
              }}
              className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
              Start Interview
            </motion.button>

            <motion.button
              onClick={() => navigate("/history")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-gray-300">
              View History
            </motion.button>
          </motion.div>

          {/* AI Card */}
          <motion.div variants={item} whileHover={{ y: -4 }}
            className="mt-16 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-6 w-full max-w-3xl">

            <p className="text-sm text-gray-500 mb-3">🤖 AI Interview Preview</p>

            <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm">
              {displayedLines.map((line, i) => (
                <div key={i}>
                  {" > "} {line}
                  {i === displayedLines.length - 1 && <span className="animate-pulse">|</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 w-full max-w-6xl"
          >
            {[
              {
                icon: <BsRobot />,
                title: "AI Interviewer",
                desc: "Experience realistic interview simulations powered by intelligent AI."
              },
              {
                icon: <BsMic />,
                title: "Voice Practice",
                desc: "Boost confidence with real-time speaking and AI-driven voice analysis."
              },
              {
                icon: <BsBarChart />,
                title: "Smart Analytics",
                desc: "Understand your performance with clear insights and progress tracking."
              },
              {
                icon: <BsFileEarmarkText />,
                title: "Instant Feedback",
                desc: "Receive actionable suggestions to improve clarity and confidence."
              }
            ].map((item, i) => (

              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-[1px] rounded-2xl"
              >

                {/* 🌈 Gradient Border */}
                <div className="absolute inset-0 rounded-2xl 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      opacity-0 group-hover:opacity-100 blur-sm transition duration-300"></div>

                {/* Card */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 
      border border-gray-200 shadow-md 
      hover:shadow-2xl transition-all duration-300 h-full">

                  {/* 🔥 Icon Box */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl 
        bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
        mb-4 transition-all duration-300 
        group-hover:from-indigo-500 group-hover:to-purple-500">

                    <div className="text-2xl text-indigo-500 
          group-hover:text-white transition duration-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ✅ FIXED SECTION */}
        <div className='mb-32 px-6'>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl font-semibold mb-16 text-center'>
            Advanced AI <span className='text-green-600'>Capabilities</span>
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-10'>

            {[{
              image: evalImg,
              title: "AI Answer Evaluation",
              desc: "Scores communication, technical accuracy and confidence."
            },
            {
              image: resumeImg,
              title: "Resume Based Interview",
              desc: "Project-specific questions based on uploaded resume."
            },
            {
              image: pdfImg,
              title: "Downloadable PDF Report",
              desc: "Detailed strengths and weaknesses."
            },
            {
              image: analyticsImg,
              title: "History & Analytics",
              desc: "Track performance with graphs."
            }
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} // ✅ FIX
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm'>

                <div className='flex flex-col md:flex-row items-center gap-8'>

                  <div className='w-full md:w-1/2'>
                    <img src={item.image} className='max-h-64 mx-auto' />
                  </div>

                  <div className='w-full md:w-1/2 '>
                    <h2 className='font-semibold text-xl mb-3'>{item.title}</h2>
                    <p className='text-gray-200 text-sm '> {item.desc}</p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2nd block */}

        <div className='mb-32 px-6'>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl font-semibold mb-16 text-center'>
            Mutlple Interview <span className='text-green-600'>Modes</span>
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-10'>

            {[{
              img: hrImg,
              title: "HR Interview Mode",
              desc: "Behavioral and communication based evalution."
            },
            {
              img: techImg,
              title: "Technical Modes",
              desc: "Deep technical questioning based on selected role."
            },
            {
              img: confidenceImg,
              title: "Confidence Detection",
              desc: "Basic tone and voice analysis insight."
            },
            {
              img: creditImg,
              title: "Credits System",
              desc: "Unlock premium interview sessions."
            }
            ].map((mode, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} // ✅ FIX
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm  hover:shadow-xl transition-all '>

                <div className='flex justify-between items-center gap-6 '>

                  <div className='w-1/2'>
                    <h3 className='font-semibold text-xl mb-3'>
                      {mode.title}
                    </h3>

                    <p className='text-gray-500 text-sm  leading-relaxed '>
                      {mode.desc}
                    </p>
                  </div>

                  {/* Right Image */}

                  <div className='w-1/2 flex justify-end'>
                    <img src={mode.img} alt={mode.title}
                      className='w-28 h-28 object-contain'
                    />

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

<Footer />

    </div>
  );
};

export default Home;