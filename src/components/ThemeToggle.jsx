"use client"

import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg ${
        isDark
          ? "bg-slate-800 border border-slate-700 text-white"
          : "bg-white border border-slate-200 text-slate-900"
      }`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Sun */}
        <motion.div
          initial={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
          animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Sun className="w-6 h-6 text-amber-500" />
        </motion.div>

        {/* Moon */}
        <motion.div
          initial={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
          animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Moon className="w-6 h-6 text-cyan-400" />
        </motion.div>

        {/* Background glow */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-md -z-10 ${
            isDark ? "bg-cyan-500/20" : "bg-amber-500/20"
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>
    </motion.button>
  )
}

export default ThemeToggle
