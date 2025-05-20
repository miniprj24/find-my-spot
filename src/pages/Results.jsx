"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import JsonViewer from "../components/JsonViewer"
import { useUpload } from "@/context/UploadContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Download, FileJson, ArrowLeft, Car, MapPin, ParkingCircle } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const Results = () => {
  const { jsonReport, videoDownloadUrl } = useUpload()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Redirect to upload page if there's no data
    if (!jsonReport || !videoDownloadUrl) {
      toast.error("No analysis data found. Please upload a video first.")
      navigate("/")
    }
  }, [jsonReport, videoDownloadUrl, navigate])

  if (!jsonReport) {
    return null // Prevents flash of content before redirect
  }

  const downloadUrl = `${import.meta.env.VITE_PYTHON_BACKEND_URL}${videoDownloadUrl}`

  // Calculate some stats for the dashboard
  const totalSpots = jsonReport.total_spots || 0
  const availableSpots = jsonReport.available_spots || 0
  const occupiedSpots = totalSpots - availableSpots
  const occupancyRate = totalSpots > 0 ? Math.round((occupiedSpots / totalSpots) * 100) : 0

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900"
      } transition-colors duration-500`}
    >
      <header className="w-full py-8 px-4 relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
              : "bg-gradient-to-r from-emerald-500/10 to-blue-500/10"
          } z-0`}
        ></div>
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
              Analysis Results
            </h1>
          </div>
          <p className={`text-center ${isDark ? "text-slate-300" : "text-slate-600"} mt-3 max-w-2xl mx-auto text-lg`}>
            Your video has been processed with our AI parking detection technology
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto space-y-10"
        >           

          {/* Video Section */}
          <Card
            className={`${
              isDark
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            } p-8 shadow-lg ${isDark ? "shadow-emerald-500/5" : "shadow-emerald-500/10"} overflow-hidden relative`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
              } flex items-center gap-2`}
            >
              <Car className="h-6 w-6" /> Processed Video
            </h2>

            <div className="flex flex-col items-center">
              <div
                className={`w-full max-w-md ${
                  isDark
                    ? "bg-slate-950 rounded-lg p-6 mb-6 border border-slate-800"
                    : "bg-white rounded-lg p-6 mb-6 border border-slate-200 shadow-md"
                }`}
              >
                <p className={`${isDark ? "text-slate-300" : "text-slate-600"} mb-4 text-center`}>
                  Your video has been enhanced with AI detection markers highlighting available parking spots.
                </p>

                <a
                  href={downloadUrl}
                  download
                  className={`group w-full flex items-center justify-center gap-3 ${
                    isDark
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                      : "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  } text-white font-medium py-3 px-6 rounded-lg transition-all duration-300`}
                >
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  Download Processed Video
                </a>
              </div>
            </div>
          </Card>

          {/* Analysis Report Section */}
          <Card
            className={`${
              isDark
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            } p-8 shadow-lg ${isDark ? "shadow-cyan-500/5" : "shadow-blue-500/10"} overflow-hidden relative`}
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
              } flex items-center gap-2`}
            >
              <FileJson className="h-6 w-6" /> Analysis Report
            </h2>

            <p className={`${isDark ? "text-slate-300" : "text-slate-600"} mb-6`}>
              Below is a detailed report of the detected parking spots and analysis. You can scroll through and inspect
              the structured data.
            </p>

            <div
              className={`${
                isDark ? "bg-slate-950 border border-slate-800" : "bg-white border border-slate-200 shadow-inner"
              } rounded-lg p-6 max-h-[400px] overflow-auto custom-scrollbar`}
            >
              <JsonViewer data={jsonReport} />
            </div>
          </Card>

          <div className="flex justify-center mt-12">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className={`${
                isDark
                  ? "text-emerald-400 border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                  : "text-emerald-600 border-emerald-600/30 hover:bg-emerald-600/10 hover:text-emerald-700"
              } flex items-center gap-2 text-lg py-6 px-8`}
            >
              <ArrowLeft className="h-5 w-5" />
              Upload Another Video
            </Button>
          </div>
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

export default Results
