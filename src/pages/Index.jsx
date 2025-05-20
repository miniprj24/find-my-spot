"use client"

import { useState, useEffect } from "react"
import FileUploader from "@/components/FileUploader"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useUpload } from "@/context/UploadContext"
import { motion } from "framer-motion"
import { Car, ParkingCircle } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const Index = () => {
  const { isLoading } = useUpload()
  const [initialLoading, setInitialLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Show initial loading spinner for 5 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900"
      } transition-colors duration-500`}
    >
      {(isLoading || initialLoading) && (
        <LoadingSpinner message={initialLoading ? "Welcome to FindMySpot..." : "Processing your video..."} />
      )}

      <header className="w-full py-8 px-4 relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
              : "bg-gradient-to-r from-emerald-500/10 to-blue-500/10"
          } z-0`}
        ></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ParkingCircle className={`h-10 w-10 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
              }`}
            >
              FindMySpot
            </h1>
          </div>
          <p className={`text-center ${isDark ? "text-slate-300" : "text-slate-600"} mt-3 max-w-2xl mx-auto text-lg`}>
            AI-powered parking detection that transforms video footage into actionable insights
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center relative">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
          <Car className="w-[600px] h-[600px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl z-10"
        >
          <FileUploader />
        </motion.div>
      </main>

      <footer
        className={`w-full py-8 ${
          isDark ? "bg-slate-900 border-t border-slate-800" : "bg-white border-t border-slate-200"
        } relative overflow-hidden`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-emerald-500/5 to-cyan-500/5"
              : "bg-gradient-to-r from-emerald-500/5 to-blue-500/5"
          } z-0`}
        ></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <ParkingCircle className={`h-5 w-5 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>© {new Date().getFullYear()} FindMySpot</p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className={`${
                isDark ? "text-slate-400 hover:text-emerald-400" : "text-slate-500 hover:text-emerald-500"
              } transition-colors`}
            >
              About
            </a>
            <a
              href="#"
              className={`${
                isDark ? "text-slate-400 hover:text-emerald-400" : "text-slate-500 hover:text-emerald-500"
              } transition-colors`}
            >
              Privacy
            </a>
            <a
              href="#"
              className={`${
                isDark ? "text-slate-400 hover:text-emerald-400" : "text-slate-500 hover:text-emerald-500"
              } transition-colors`}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
