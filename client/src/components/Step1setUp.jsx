import React, { useState } from 'react'
import { distance, motion, scale } from "framer-motion";
import {
  FaUserTie,
  FaMicrophoneAlt,
  FaChartLine,
  FaBriefcase,
  FaFileUpload,
} from "react-icons/fa";
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Step1setUp = ({ onStart }) => {

const {userData} = useSelector((state)=> state.user)
const dispatch = useDispatch()
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [mode, setMode] = useState("Technical")
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)


  const handleUpload = async () => {
    if (!resumeFile || analyzing) return
      setAnalyzing(true)  

    const formdata = new FormData()
    formdata.append("resume", resumeFile)

    try {
      const result = await axios.post(serverUrl + "/api/interview/resume", formdata, { withCredentials: true })

      console.log(result.data)

      if (!role) setRole(result.data.role || "");
      if (!experience) setExperience(result.data.experience || "")
      setProject(result.data.projects || []);
      setSkills(result.data.skills || [])
      setResumeText(result.data.resumeText || "")
      setAnalysisDone(true)

    } catch (error) {
      console.error("Upload Error: ", error);
    } finally {
      setAnalyzing(false)
    }
  }

  const handleStart = async () => {
    setLoading(true)
    try {
   const result = await axios.post(
  serverUrl + "/api/interview/generate-questions",
  { role, experience, mode, resumeText, projects: project, skills },  // ✅
  { withCredentials: true }
)
console.log(result.data)


if(userData){
  
dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
}
setLoading(false)
onStart(result.data)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4'>

      <div className='w-full max-w-5xl bg-white rounded-2xl 
      shadow-lg grid md:grid-cols-2 overflow-hidden border border-gray-100'>

        {/* LEFT */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='relative p-8 flex flex-col justify-center 
          bg-gradient-to-br from-green-50 via-emerald-50 to-white'>

          {/* soft blobs */}
          <div className='absolute w-52 h-52 bg-green-200/40 blur-2xl rounded-full top-6 left-6'></div>
          <div className='absolute w-40 h-40 bg-emerald-200/40 blur-xl rounded-full bottom-6 right-6'></div>

          <div className='relative z-10'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Start Your{" "}
              <span className='bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent'>
                AI Interview
              </span>
            </h2>

            <p className='text-gray-600 mb-6 text-sm'>
              Practice real interview scenarios powered by AI and improve faster.
            </p>

            <div className='space-y-3'>
              {
                [
                  {
                    icon: <FaUserTie className='text-green-600 text-lg' />,
                    text: "Choose Role & Experience"
                  },
                  {
                    icon: <FaMicrophoneAlt className='text-green-600 text-lg' />,
                    text: "Smart Voice Interview"
                  },
                  {
                    icon: <FaChartLine className='text-green-600 text-lg' />,
                    text: "Performance Analytics"
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center space-x-3 p-3 rounded-lg cursor-pointer 
                    bg-white border border-green-100 
                    hover:shadow-md hover:border-green-200 transition-all'>

                    <div className='p-2 rounded-md bg-green-100'>
                      {item.icon}
                    </div>

                    <span className='text-gray-700 text-sm font-medium'>
                      {item.text}
                    </span>
                  </motion.div>
                ))
              }
            </div>
          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='p-10 bg-white'>

          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Interview Setup
          </h2>

          <div className='space-y-4'>

            {/* ROLE INPUT */}
            <div className='relative'>
              <FaUserTie className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-sm' />

              <input
                type="text"
                placeholder='Enter role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg 
        focus:ring-2 focus:ring-green-500/30 focus:border-green-500 
        outline-none transition-all text-sm'
              />
            </div>

            {/* EXPERIENCE INPUT */}
            <div className='relative'>
              <FaBriefcase className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-sm' />

              <input
                type="text"
                placeholder='Enter experience'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg 
        focus:ring-2 focus:ring-green-500/30 focus:border-green-500 
        outline-none transition-all text-sm'
              />
            </div>

            {/* MODE SELECT (separate) */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className='w-full py-3 px-4 border border-gray-200 rounded-lg 
      focus:ring-2 focus:ring-green-500/30 focus:border-green-500 
      outline-none transition-all text-sm bg-white'
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition'>

                <FaFileUpload className='text-4xl mx-auto text-green-600 mb-3' />

                <input type="file"
                  id='resumeUpload'
                  accept='application/pdf'
                  className='hidden'
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className='text-gray-600 font-medium'>
                  {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                </p>

                {resumeFile && (
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleUpload() }}
                    whileHover={{ scale: 1.02 }}
                    className='mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition'>
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}

              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide'>

                <h3 className='text-lg font-semibold text-gray-800'>
                  Resume Analysis Result
                </h3>

                {project.length > 0 && (
                  <div>
                    <p className='font-medium text-gray-700 mb-1'>
                      Projects:
                    </p>

                    <ul className='list-disc list-inside text-gray-600 space-y-1'>
                      {project.map((p, i) => (
                        <li key={i}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className='font-medium text-gray-700 mb-1'>
                      Skills:
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {skills.map((s, i) => (
                        <span key={i}
                          className='bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm'>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}


            <motion.button
            onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700
              text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'>
             { loading ? "Starting..." : "Start Interview"}
            </motion.button>

          </div>

        </motion.div>

      </div>

    </motion.div>
  )
}

export default Step1setUp