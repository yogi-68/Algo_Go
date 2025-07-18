"use client"

import { useEffect, useState } from "react"

interface BinarySearchVisualizerProps {
  approach: string
  input: any
  currentStep: number
  onVisualizationDataChange: (data: any) => void
}

export default function BinarySearchVisualizer({
  approach,
  input,
  currentStep,
  onVisualizationDataChange,
}: BinarySearchVisualizerProps) {
  const [steps, setSteps] = useState<any[]>([])

  useEffect(() => {
    if (!input?.nums || input?.target === undefined) return

    const nums = input.nums
    const target = input.target
    const generatedSteps = generateBinarySearchSteps(nums, target)

    setSteps(generatedSteps)
    onVisualizationDataChange({ steps: generatedSteps })
  }, [approach, input, onVisualizationDataChange])

  const generateBinarySearchSteps = (nums: number[], target: number) => {
    const steps = []
    let left = 0
    let right = nums.length - 1

    steps.push({
      type: "init",
      nums: [...nums],
      target,
      left,
      right,
      mid: -1,
      message: `Initialize: left = ${left}, right = ${right}`,
      highlightedLine: 1,
    })

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        type: "calculate-mid",
        nums: [...nums],
        target,
        left,
        right,
        mid,
        message: `Calculate mid = (${left} + ${right}) / 2 = ${mid}`,
        highlightedLine: 3,
      })

      steps.push({
        type: "compare",
        nums: [...nums],
        target,
        left,
        right,
        mid,
        midValue: nums[mid],
        message: `Compare nums[${mid}] = ${nums[mid]} with target ${target}`,
        highlightedLine: 4,
      })

      if (nums[mid] === target) {
        steps.push({
          type: "found",
          nums: [...nums],
          target,
          left,
          right,
          mid,
          result: mid,
          message: `Found! Target ${target} at index ${mid}`,
          highlightedLine: 5,
        })
        return steps
      } else if (nums[mid] < target) {
        left = mid + 1
        steps.push({
          type: "move-left",
          nums: [...nums],
          target,
          left,
          right,
          mid,
          message: `nums[${mid}] < ${target}, search right half. Set left = ${left}`,
          highlightedLine: 7,
        })
      } else {
        right = mid - 1
        steps.push({
          type: "move-right",
          nums: [...nums],
          target,
          left,
          right,
          mid,
          message: `nums[${mid}] > ${target}, search left half. Set right = ${right}`,
          highlightedLine: 9,
        })
      }
    }

    steps.push({
      type: "not-found",
      nums: [...nums],
      target,
      left,
      right,
      mid: -1,
      result: -1,
      message: `Target ${target} not found in array`,
      highlightedLine: 11,
    })

    return steps
  }

  const currentStepData = steps[currentStep] || steps[0]

  if (!currentStepData) {
    return <div>No visualization data available</div>
  }

  return (
    <div className="space-y-6">
      {/* Array Visualization */}
      <div>
        <h4 className="font-medium mb-2">Sorted Array (Target: {currentStepData.target})</h4>
        <div className="flex gap-1 flex-wrap">
          {currentStepData.nums?.map((num: number, index: number) => (
            <div
              key={index}
              className={`
                w-12 h-12 border-2 rounded flex items-center justify-center font-mono text-sm
                ${
                  index < currentStepData.left || index > currentStepData.right
                    ? "bg-gray-100 border-gray-300 text-gray-400"
                    : "bg-white border-gray-400"
                }
                ${index === currentStepData.mid ? "bg-blue-200 border-blue-500" : ""}
                ${index === currentStepData.left ? "border-l-4 border-l-green-500" : ""}
                ${index === currentStepData.right ? "border-r-4 border-r-red-500" : ""}
                ${
                  currentStepData.type === "found" && index === currentStepData.mid
                    ? "bg-yellow-200 border-yellow-500"
                    : ""
                }
              `}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {currentStepData.nums?.map((_: number, index: number) => (
            <div key={index} className="w-12 text-center text-xs text-gray-500">
              {index}
            </div>
          ))}
        </div>
      </div>

      {/* Pointers Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-l-4 border-l-green-500"></div>
          <span>Left: {currentStepData.left}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-500"></div>
          <span>Mid: {currentStepData.mid >= 0 ? currentStepData.mid : "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-r-4 border-r-red-500"></div>
          <span>Right: {currentStepData.right}</span>
        </div>
      </div>

      {/* Search Space */}
      <div>
        <h4 className="font-medium mb-2">Search Space</h4>
        <div className="bg-gray-50 rounded p-3">
          <p className="text-sm">
            Searching in range [{currentStepData.left}, {currentStepData.right}]
          </p>
          {currentStepData.mid >= 0 && (
            <p className="text-sm mt-1">
              Middle element: nums[{currentStepData.mid}] = {currentStepData.nums[currentStepData.mid]}
            </p>
          )}
        </div>
      </div>

      {/* Current Operation */}
      <div className="bg-blue-50 rounded p-3">
        <h4 className="font-medium mb-1">Current Step</h4>
        <p className="text-sm">{currentStepData.message}</p>
      </div>

      {/* Result */}
      {currentStepData.result !== undefined && (
        <div
          className={`${currentStepData.result >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border rounded p-3`}
        >
          <h4 className={`font-medium mb-1 ${currentStepData.result >= 0 ? "text-green-800" : "text-red-800"}`}>
            {currentStepData.result >= 0 ? "Target Found!" : "Target Not Found"}
          </h4>
          <p className={`text-sm ${currentStepData.result >= 0 ? "text-green-700" : "text-red-700"}`}>
            {currentStepData.result >= 0
              ? `Target ${currentStepData.target} found at index ${currentStepData.result}`
              : `Target ${currentStepData.target} is not in the array`}
          </p>
        </div>
      )}
    </div>
  )
}
