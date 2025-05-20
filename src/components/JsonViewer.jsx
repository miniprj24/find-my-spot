"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, FileJson } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const JsonViewer = ({ data }) => {
  const [expanded, setExpanded] = useState({})
  const { theme } = useTheme()
  const isDark = theme === "dark"

  if (!data || typeof data !== "object") {
    return (
      <div
        className={`text-center ${
          isDark ? "text-slate-500" : "text-slate-400"
        } py-4 flex items-center justify-center gap-2`}
      >
        <FileJson className="h-5 w-5" />
        <span>No data available</span>
      </div>
    )
  }

  const formatKey = (key) => {
    if (!key) return ""
    const withSpaces = key.replace(/[_-]+/g, " ")
    const spaced = withSpaces.replace(/([a-z])([A-Z])/g, "$1 $2")
    return spaced
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Helper to check if a value is a "simple number" to style bigger
  const isSimpleNumber = (val) => typeof val === "number" || (typeof val === "string" && !isNaN(val))

  const formatValue = (value, parentKey) => {
    if (value === null) return <span className={isDark ? "text-red-400" : "text-red-500"}>null</span>
    if (Array.isArray(value)) {
      if (!value.length) return <span className={isDark ? "text-slate-400" : "text-slate-500"}>[]</span>
      return (
        <div
          className={`pl-4 border-l ${
            isDark ? "border-slate-700" : "border-slate-300"
          } ml-1 space-y-1 max-h-[180px] overflow-auto custom-scrollbar`}
        >
          {value.map((item, idx) => (
            <div key={idx} className={`${isDark ? "text-slate-300" : "text-slate-700"} text-sm`}>
              <span className={isDark ? "text-slate-500" : "text-slate-400"}>{idx}: </span>
              {typeof item === "object" ? (
                formatObject(item, `${parentKey}-${idx}`)
              ) : (
                <span>{JSON.stringify(item)}</span>
              )}
            </div>
          ))}
        </div>
      )
    }
    if (typeof value === "object") return formatObject(value, parentKey)

    if (typeof value === "string") {
      if (isSimpleNumber(value)) {
        return <span className={`text-3xl font-bold ${isDark ? "text-cyan-400" : "text-blue-500"}`}>{value}</span>
      }
      return <span className={isDark ? "text-emerald-400" : "text-emerald-500"}>{`"${value}"`}</span>
    }
    if (typeof value === "number")
      return <span className={`text-4xl font-extrabold ${isDark ? "text-cyan-400" : "text-blue-500"}`}>{value}</span>
    if (typeof value === "boolean")
      return <span className={isDark ? "text-purple-400" : "text-purple-500"}>{value.toString()}</span>
    return <span>{String(value)}</span>
  }

  const formatObject = (obj, parentKey = "") => {
    const keys = Object.keys(obj)
    if (!keys.length) return <span className={isDark ? "text-slate-400" : "text-slate-500"}>{"{}"}</span>

    return (
      <div
        className={`pl-4 border-l ${
          isDark ? "border-slate-700" : "border-slate-300"
        } space-y-1 mt-1 max-h-[180px] overflow-auto custom-scrollbar`}
      >
        {keys.map((key) => {
          const fullKey = `${parentKey}.${key}`
          const isObject = typeof obj[key] === "object" && obj[key] !== null
          const open = expanded[fullKey]

          return (
            <div key={fullKey} className="text-sm">
              <div
                className={`cursor-pointer ${
                  isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-500"
                } font-semibold flex items-start gap-1`}
                onClick={() => isObject && toggle(fullKey)}
              >
                {isObject && (
                  <span className="mt-1">
                    {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  </span>
                )}
                <span>"{formatKey(key)}":</span>
                {!isObject && <span className="ml-1">{formatValue(obj[key], fullKey)}</span>}
              </div>
              {isObject && open && <div className="ml-4">{formatValue(obj[key], fullKey)}</div>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {Object.entries(data).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`flex flex-col justify-center items-center p-6 shadow-lg ${
                isDark
                  ? "border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900"
                  : "border border-slate-200 bg-gradient-to-br from-white to-slate-50"
              } aspect-square min-h-[220px] max-h-[280px] relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -ml-16 -mb-16"></div>

              <h3
                className={`text-xl font-semibold ${
                  isDark
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
                } mb-4 text-center relative z-10`}
              >
                {formatKey(key)}
              </h3>
              <div
                className={`text-center ${
                  isDark ? "text-slate-300" : "text-slate-700"
                } font-mono w-full relative z-10 overflow-auto custom-scrollbar`}
              >
                {formatValue(value, key)}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default JsonViewer
