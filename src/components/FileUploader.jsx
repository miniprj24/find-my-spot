"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useUpload } from "../context/UploadContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileVideo, CheckCircle, AlertCircle, Car, Clock } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const FileUploader = () => {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { setIsLoading, setJsonReport, setVideoDownloadUrl, setError } = useUpload()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const validateFile = (file) => {
    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a video file", {
        style: isDark
          ? { background: "#1e293b", color: "white", border: "1px solid #334155" }
          : { background: "white", color: "#1e293b", border: "1px solid #e2e8f0" },
        icon: <AlertCircle className={isDark ? "text-red-400" : "text-red-500"} />,
      })
      return false
    }
    // Check file size (limit to 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      toast.error("File size exceeds 100MB limit", {
        style: isDark
          ? { background: "#1e293b", color: "white", border: "1px solid #334155" }
          : { background: "white", color: "#1e293b", border: "1px solid #e2e8f0" },
        icon: <AlertCircle className={isDark ? "text-red-400" : "text-red-500"} />,
      })
      return false
    }

    toast.success("Video selected successfully", {
      style: isDark
        ? { background: "#1e293b", color: "white", border: "1px solid #334155" }
        : { background: "white", color: "#1e293b", border: "1px solid #e2e8f0" },
      icon: <CheckCircle className={isDark ? "text-emerald-400" : "text-emerald-500"} />,
    })
    return true
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a video file first", {
        style: isDark
          ? { background: "#1e293b", color: "white", border: "1px solid #334155" }
          : { background: "white", color: "#1e293b", border: "1px solid #e2e8f0" },
        icon: <AlertCircle className={isDark ? "text-red-400" : "text-red-500"} />,
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("video", file)

    try {
      const backendUrl = import.meta.env.VITE_PYTHON_BACKEND_URL

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 500)

      const response = await axios.post(`${backendUrl}/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted > 90 ? 90 : percentCompleted)
        },
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Small delay to show 100% completion before navigating
      setTimeout(() => {
        setJsonReport(response.data.json_report)
        setVideoDownloadUrl(response.data.video_download_url)
        setIsLoading(false)
        setIsUploading(false)
        navigate("/results")
      }, 500)
    } catch (error) {
      setIsLoading(false)
      setIsUploading(false)
      console.error("Upload failed:", error)
      let errorMessage = "An unexpected error occurred during upload"

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "Server error. Please try again later."
      }

      toast.error(errorMessage, {
        style: isDark
          ? { background: "#1e293b", color: "white", border: "1px solid #334155" }
          : { background: "white", color: "#1e293b", border: "1px solid #e2e8f0" },
        icon: <AlertCircle className={isDark ? "text-red-400" : "text-red-500"} />,
      })
      setError(errorMessage)
    }
  }

  return (
    <Card
      className={`w-full ${
        isDark
          ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-emerald-500/10"
          : "bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-emerald-500/20"
      } p-8 shadow-lg overflow-hidden relative`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="text-center mb-8 relative z-10">
        <h2
          className={`text-3xl font-bold ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
              : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
          }`}
        >
          Upload Video for Analysis
        </h2>
        <p className={`${isDark ? "text-slate-300" : "text-slate-600"} mt-3 max-w-lg mx-auto`}>
          Our AI will analyze your parking lot footage to detect available spots and provide detailed insights
        </p>
      </div>

      <AnimatePresence>
        {isUploading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${
              isDark ? "bg-slate-950 border border-slate-800" : "bg-white border border-slate-200 shadow-md"
            } rounded-xl p-8 mb-8 relative z-10`}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 relative">
                <svg className="w-20 h-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke={isDark ? "#1e293b" : "#f1f5f9"} strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#10b981" : "#059669"} />
                      <stop offset="100%" stopColor={isDark ? "#06b6d4" : "#0284c7"} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
              </div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"} mb-2`}>Uploading Video</h3>
              <p className={`${isDark ? "text-slate-400" : "text-slate-500"} text-center max-w-xs`}>
                Your video is being uploaded and prepared for AI analysis. This may take a few moments.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 relative z-10 ${
              isDragging
                ? isDark
                  ? "border-emerald-400 bg-emerald-500/10"
                  : "border-emerald-500 bg-emerald-500/5"
                : file
                  ? isDark
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-blue-500 bg-blue-500/5"
                  : isDark
                    ? "border-slate-700 hover:border-slate-500 bg-slate-950/50"
                    : "border-slate-300 hover:border-slate-400 bg-white/80"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />

            <div className="flex flex-col items-center justify-center">
              {file ? (
                <div className={`${isDark ? "bg-slate-800/80" : "bg-slate-100"} p-4 rounded-full mb-6`}>
                  <FileVideo className={`w-16 h-16 ${isDark ? "text-cyan-400" : "text-blue-500"}`} />
                </div>
              ) : (
                <div className={`${isDark ? "bg-slate-800/80" : "bg-slate-100"} p-4 rounded-full mb-6`}>
                  <Upload className={`w-16 h-16 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />
                </div>
              )}

              {file ? (
                <div>
                  <p className={`font-medium ${isDark ? "text-emerald-400" : "text-emerald-600"} text-lg mb-2`}>
                    Video Selected
                  </p>
                  <div
                    className={`${isDark ? "bg-slate-800/80" : "bg-slate-100"} px-4 py-2 rounded-lg inline-block mb-2`}
                  >
                    <p className={isDark ? "text-white" : "text-slate-900"}>{file.name}</p>
                  </div>
                  <div
                    className={`flex items-center justify-center gap-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {file.type.replace("video/", "")}
                    </span>
                    <span>•</span>
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-slate-900"} text-lg mb-2`}>
                    Drag and drop your video here
                  </p>
                  <p className={isDark ? "text-slate-400" : "text-slate-500"}>or click to browse files</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                    <span className={`px-2 py-1 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full`}>MP4</span>
                    <span className={`px-2 py-1 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full`}>MOV</span>
                    <span className={`px-2 py-1 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full`}>AVI</span>
                    <span className={`px-2 py-1 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full`}>
                      Max 100MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-center relative z-10">
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-8 py-6 text-lg flex items-center gap-3 ${
            isDark
              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              : "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
          } text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            !file ? "opacity-70" : ""
          }`}
        >
          <Car className="w-5 h-5" />
          Analyze Parking Spots
        </Button>
      </div>

      <div className={`mt-6 text-center ${isDark ? "text-slate-500" : "text-slate-400"} text-sm relative z-10`}>
        By uploading, you agree to our{" "}
        <a href="#" className={`${isDark ? "text-emerald-400 hover:underline" : "text-emerald-500 hover:underline"}`}>
          Terms of Service
        </a>
      </div>
    </Card>
  )
}

export default FileUploader
