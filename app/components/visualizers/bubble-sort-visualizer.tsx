"use client"

import { useEffect, useState } from "react"

interface BubbleSortVisualizerProps {
  approach: string
  input: any
  currentStep: number
  onVisualizationDataChange: (data: any) => void
}

export default function BubbleSortVisualizer({
  approach,
  input,
  currentStep,
  onVisualizationDataChange,
}: BubbleSortVisualizerProps) {
  const [steps, setSteps] = useState<any[]>([])

  useEffect(() => {
    if (!input?.nums) return

    const nums = [...input.nums]
    const generatedSteps = generateBubbleSortSteps(nums)

    setSteps(generatedSteps)
    onVisualizationDataChange({ steps: generatedSteps })
  }, [approach, input, onVisualizationDataChange])

  const generateBubbleSortSteps = (nums: number[]) => {
    const steps = []
    const arr = [...nums]
    const n = arr.length

    steps.push({
      type: "init",
      nums: [...arr],
      i: -1,
      j: -1,
      message: "Initialize: Start bubble sort algorithm",
      highlightedLine: 1,
    })

    for (let i = 0; i < n - 1; i++) {
      steps.push({
        type: "outer-loop",
        nums: [...arr],
        i,
        j: -1,
        message: `Pass ${i + 1}: Bubble largest element to position ${n - 1 - i}`,
        highlightedLine: 2,
      })

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          type: "compare",
          nums: [...arr],
          i,
          j,
          comparing: [j, j + 1],
          message: `Compare arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`,
          highlightedLine: 4,
        })

        if (arr[j] > arr[j + 1]) {
          // Swap
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          steps.push({
            type: "swap",
            nums: [...arr],
            i,
            j,
            swapped: [j, j + 1],
            message: `Swap! arr[${j}] and arr[${j + 1}] swapped`,
            highlightedLine: 5,
          })
        } else {
          steps.push({
            type: "no-swap",
            nums: [...arr],
            i,
            j,
            comparing: [j, j + 1],
            message: `No swap needed: ${arr[j]} ≤ ${arr[j + 1]}`,
            highlightedLine: 4,
          })
        }
      }

      steps.push({
        type: "pass-complete",
        nums: [...arr],
        i,
        j: -1,
        sortedPosition: n - 1 - i,
        message: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is in correct position`,
        highlightedLine: 2,
      })
    }

    steps.push({
      type: "complete",
      nums: [...arr],
      i: -1,
      j: -1,
      message: "Sorting complete! Array is now sorted",
      highlightedLine: 8,
    })

    return steps
  }

  const currentStepData = steps[currentStep] || steps[0]

  if (!currentStepData) {
    return <div>No visualization data available</div>
  }

  const getSortedPositions = () => {
    const positions = []
    if (currentStepData.i >= 0) {
      const n = currentStepData.nums.length
      for (let k = n - 1; k >= n - 1 - currentStepData.i; k--) {
        positions.push(k)
      }
    }
    return positions
  }

  const sortedPositions = getSortedPositions()

  return (
    <div className="space-y-6">
      {/* Array Visualization */}
      <div>
        <h4 className="font-medium mb-2">Array</h4>
        <div className="flex gap-2 flex-wrap">
          {currentStepData.nums?.map((num: number, index: number) => (
            <div
              key={index}
              className={`
                w-12 h-12 border-2 rounded flex items-center justify-center font-mono text-sm
                ${sortedPositions.includes(index) ? "bg-green-100 border-green-500" : "bg-white border-gray-400"}
                ${currentStepData.comparing?.includes(index) ? "bg-blue-200 border-blue-500" : ""}
                ${currentStepData.swapped?.includes(index) ? "bg-red-200 border-red-500" : ""}
                ${currentStepData.type === "complete" ? "bg-green-200 border-green-500" : ""}
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

      {/* Legend */}
      <div className="flex gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-500"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 border border-red-500"></div>
          <span>Swapped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-500"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Current Pass Info */}
      {currentStepData.i >= 0 && (
        <div className="bg-gray-50 rounded p-3">
          <h4 className="font-medium mb-1">Current Pass</h4>
          <p className="text-sm">
            Pass {currentStepData.i + 1} of {currentStepData.nums.length - 1}
          </p>
          <p className="text-sm text-gray-600">Bubbling the largest unsorted element to its correct position</p>
        </div>
      )}

      {/* Current Operation */}
      <div className="bg-blue-50 rounded p-3">
        <h4 className="font-medium mb-1">Current Step</h4>
        <p className="text-sm">{currentStepData.message}</p>
      </div>

      {/* Completion Status */}
      {currentStepData.type === "complete" && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <h4 className="font-medium text-green-800 mb-1">Sorting Complete!</h4>
          <p className="text-sm text-green-700">The array has been successfully sorted using bubble sort.</p>
          <p className="text-sm text-green-600 mt-1">Final sorted array: [{currentStepData.nums.join(", ")}]</p>
        </div>
      )}
    </div>
  )
}
