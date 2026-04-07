import React from 'react'
import { BsRobot } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="relative px-6 pt-16 pb-10 overflow-hidden">

      {/* 🔥 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>

      {/* ✨ Glow Effect */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg">
                <BsRobot size={18} />
              </div>
              <h2 className="font-semibold text-lg text-gray-800">
                Intervu.AI
              </h2>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              AI-powered interview platform to improve communication,
              technical skills, and confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-700">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-indigo-600 cursor-pointer transition">AI Interview</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Voice Practice</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Analytics</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Feedback</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-700">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-indigo-600 cursor-pointer transition">About</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Contact</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Terms</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} Intervu.AI. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-indigo-500 cursor-pointer transition">Privacy</span>
            <span className="hover:text-indigo-500 cursor-pointer transition">Terms</span>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer