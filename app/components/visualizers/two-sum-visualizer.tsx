"use client"

import { useEffect, useState } from "react"

interface TwoSumVisualizerProps {
  approach: string
  input: any
  currentStep: number
  onVisualizationDataChange: (data: any) => void
}

export default function TwoSumVisualizer({
  approach,
  input,
  currentStep,
  onVisualizationDataChange,
}: TwoSumVisualizerProps) {
  const [steps, setSteps] = useState<any[]>([])

  useEffect(() => {
    if (!input?.nums || !input?.target) return

    const nums = input.nums
    const target = input.target
    let generatedSteps: any[] = []

    if (approach === "brute-force") {
      generatedSteps = generateBruteForceSteps(nums, target)
    } else if (approach === "hash-map") {
      generatedSteps = generateHashMapSteps(nums, target)
    }

    setSteps(generatedSteps)
    onVisualizationDataChange({ steps: generatedSteps })
  }, [approach, input, onVisualizationDataChange])

  const generateBruteForceSteps = (nums: number[], target: number) => {
    const steps = []

    steps.push({
      type: "init",
      nums: [...nums],
      target,
      i: -1,
      j: -1,
      message: "Initialize: Check all pairs of numbers",
      highlightedLine: 1,
    })

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        steps.push({
          type: "check",
          nums: [...nums],
          target,
          i,
          j,
          sum: nums[i] + nums[j],
          message: `Checking nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${nums[i] + nums[j]}`,
          highlightedLine: 3,
        })

        if (nums[i] + nums[j] === target) {
          steps.push({
            type: "found",
            nums: [...nums],
            target,
            i,
            j,
            result: [i, j],
            message: `Found! nums[${i}] + nums[${j}] = ${target}`,
            highlightedLine: 4,
          })
          return steps
        }
      }
    }

    return steps
  }

  const generateHashMapSteps = (nums: number[], target: number) => {
    const steps = []
    const map = new Map()

    steps.push({
      type: "init",
      nums: [...nums],
      target,
      map: new Map(),
      i: -1,
      message: "Initialize: Create empty hash map",
      highlightedLine: 1,
    })

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i]

      steps.push({
        type: "check",
        nums: [...nums],
        target,
        map: new Map(map),
        i,
        complement,
        message: `Check if complement ${complement} exists in map`,
        highlightedLine: 3,
      })

      if (map.has(complement)) {
        steps.push({
          type: "found",
          nums: [...nums],
          target,
          map: new Map(map),
          i,
          j: map.get(complement),
          result: [map.get(complement), i],
          message: `Found! nums[${map.get(complement)}] + nums[${i}] = ${target}`,
          highlightedLine: 4,
        })
        return steps
      }

      map.set(nums[i], i)
      steps.push({
        type: "add",
        nums: [...nums],
        target,
        map: new Map(map),
        i,
        message: `Add nums[${i}] = ${nums[i]} to map`,
        highlightedLine: 6,
      })
    }

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
        <h4 className="font-medium mb-2">Array (Target: {currentStepData.target})</h4>
        <div className="flex gap-2 flex-wrap">
          {currentStepData.nums?.map((num: number, index: number) => (
            <div
              key={index}
              className={`
                w-12 h-12 border-2 rounded flex items-center justify-center font-mono text-sm
                ${index === currentStepData.i ? "bg-blue-200 border-blue-500" : ""}
                ${index === currentStepData.j ? "bg-green-200 border-green-500" : ""}
                ${
                  currentStepData.type === "found" && (index === currentStepData.i || index === currentStepData.j)
                    ? "bg-yellow-200 border-yellow-500"
                    : ""
                }
              `}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-1">
          {currentStepData.nums?.map((_: number, index: number) => (
            <div key={index} className="w-12 text-center text-xs text-gray-500">
              {index}
            </div>
          ))}
        </div>
      </div>

      {/* Hash Map Visualization (for hash-map approach) */}
      {approach === "hash-map" && currentStepData.map && (
        <div>
          <h4 className="font-medium mb-2">Hash Map</h4>
          <div className="border rounded p-3 bg-gray-50 min-h-[100px]">
            {currentStepData.map.size === 0 ? (
              <div className="text-gray-500 text-sm">Empty</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {Array.from(currentStepData.map.entries()).map(([value, index]) => (
                  <div key={value} className="flex items-center gap-2 text-sm">
                    <span className="font-mono bg-white px-2 py-1 rounded border">{value}</span>
                    <span>→</span>
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">{index}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current Operation */}
      <div className="bg-blue-50 rounded p-3">
        <h4 className="font-medium mb-1">Current Step</h4>
        <p className="text-sm">{currentStepData.message}</p>
        {currentStepData.sum && (
          <p className="text-sm mt-1">
            Sum: {currentStepData.sum}
            {currentStepData.sum === currentStepData.target ? " ✓" : " ✗"}
          </p>
        )}
      </div>

      {/* Result */}
      {currentStepData.result && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <h4 className="font-medium text-green-800 mb-1">Result Found!</h4>
          <p className="text-sm text-green-700">Indices: [{currentStepData.result.join(", ")}]</p>
        </div>
      )}
    </div>
  )
}
