"use client"
import TwoSumVisualizer from "./visualizers/two-sum-visualizer"
import BinarySearchVisualizer from "./visualizers/binary-search-visualizer"
import BubbleSortVisualizer from "./visualizers/bubble-sort-visualizer"

interface VisualizerProps {
  problemId: string
  approach: string
  input: any
  currentStep: number
  onVisualizationDataChange: (data: any) => void
}

export default function Visualizer({
  problemId,
  approach,
  input,
  currentStep,
  onVisualizationDataChange,
}: VisualizerProps) {
  const renderVisualizer = () => {
    switch (problemId) {
      case "two-sum":
        return (
          <TwoSumVisualizer
            approach={approach}
            input={input}
            currentStep={currentStep}
            onVisualizationDataChange={onVisualizationDataChange}
          />
        )
      case "binary-search":
        return (
          <BinarySearchVisualizer
            approach={approach}
            input={input}
            currentStep={currentStep}
            onVisualizationDataChange={onVisualizationDataChange}
          />
        )
      case "bubble-sort":
        return (
          <BubbleSortVisualizer
            approach={approach}
            input={input}
            currentStep={currentStep}
            onVisualizationDataChange={onVisualizationDataChange}
          />
        )
      default:
        return <div>Visualizer not implemented for this problem</div>
    }
  }

  return <div className="h-full bg-white rounded-lg border p-4">{renderVisualizer()}</div>
}
