"use client"
import { motion } from "framer-motion"
import { Car, ParkingCircle } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const LoadingSpinner = ({ message }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`fixed inset-0 ${
        isDark ? "bg-slate-900/95" : "bg-white/95"
      } backdrop-blur-sm z-50 flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-full ${
              isDark
                ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
                : "bg-gradient-to-r from-emerald-500/20 to-blue-500/20"
            } blur-xl`}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="relative"
          >
            <div
              className={`w-24 h-24 rounded-full ${
                isDark
                  ? "border-t-4 border-emerald-400 border-r-4 border-cyan-400"
                  : "border-t-4 border-emerald-500 border-r-4 border-blue-500"
              } border-b-4 border-transparent border-l-4 border-transparent`}
            ></div>
            <ParkingCircle
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 ${
                isDark ? "text-emerald-400" : "text-emerald-500"
              }`}
            />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2
            className={`text-2xl font-bold ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
            } mb-2 text-center`}
          >
            {message}
          </h2>

          <div className={`flex items-center justify-center gap-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Car className="w-5 h-5" />
            </motion.div>
            <span>AI is analyzing your footage</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingSpinner
