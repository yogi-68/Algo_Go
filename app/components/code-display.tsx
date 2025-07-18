"use client"

import { useEffect, useState } from "react"

interface CodeDisplayProps {
  code: string
  language: string
  highlightedLine?: number
}

export default function CodeDisplay({ code, language, highlightedLine }: CodeDisplayProps) {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    setLines(code.split("\n"))
  }, [code])

  return (
    <div className="h-full bg-gray-900 text-gray-100 font-mono text-sm overflow-auto">
      <div className="p-4">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`flex items-center min-h-[1.5rem] ${
              highlightedLine === index + 1 ? "bg-yellow-500/20 border-l-4 border-yellow-500" : ""
            }`}
          >
            <span className="w-8 text-gray-500 text-right mr-4 select-none">{index + 1}</span>
            <span className="flex-1 whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
