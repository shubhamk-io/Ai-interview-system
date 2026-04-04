import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Auth from "../Pages/Auth";

const AuthModel = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        className="fixed inset-0 z-[999] flex items-center justify-center 
        bg-black/50 backdrop-blur-lg px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {/* Modal */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 50 }}
          transition={{ duration: 0.25 }}
          className="relative"
        >

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 
            bg-white/90 backdrop-blur p-2 rounded-full 
            shadow hover:scale-110 transition"
          >
            <FaTimes size={14} />
          </button>

          {/* Glow (optional but cool) */}
          <div className="absolute inset-0 
          bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 
          blur-2xl rounded-3xl"></div>

          {/* Auth directly */}
          <div className="relative">
            <Auth isModel={true} />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModel;