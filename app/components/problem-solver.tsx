"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"
import CodeDisplay from "./code-display"
import Visualizer from "./visualizer"
import ControlPanel from "./control-panel"
import InputPanel from "./input-panel"
import { problemData } from "../data/problems"

interface Problem {
  id: string
  title: string
  difficulty: string
  description: string
  tags: string[]
  leetcodeUrl: string
}

interface ProblemSolverProps {
  problem: Problem
}

export default function ProblemSolver({ problem }: ProblemSolverProps) {
  const [selectedApproach, setSelectedApproach] = useState("brute-force")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)
  const [userInput, setUserInput] = useState<any>(null)
  const [visualizationData, setVisualizationData] = useState<any>(null)

  const currentProblem = problemData[problem.id]
  const currentApproach = currentProblem?.approaches[selectedApproach]
  const currentCode = currentApproach?.code[selectedLanguage]

  useEffect(() => {
    if (currentProblem?.defaultInput) {
      setUserInput(currentProblem.defaultInput)
    }
  }, [problem.id, currentProblem])

  useEffect(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [selectedApproach, userInput])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const handleStepForward = () => {
    if (visualizationData && currentStep < visualizationData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!currentProblem) {
    return <div>Problem not found</div>
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Problem Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{problem.difficulty}</Badge>
            {problem.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" onClick={() => window.open(problem.leetcodeUrl, "_blank")}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Problem Statement
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Problem Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{currentProblem.description}</p>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Example:</h4>
            <div className="bg-white rounded border p-3 font-mono text-sm">
              <div>
                <strong>Input:</strong> {currentProblem.example.input}
              </div>
              <div>
                <strong>Output:</strong> {currentProblem.example.output}
              </div>
              <div>
                <strong>Explanation:</strong> {currentProblem.example.explanation}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Constraints:</h4>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {currentProblem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Approach Selection & Explanation */}
        <div className="w-1/3 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-4">Algorithmic Approaches</h3>
            <Tabs value={selectedApproach} onValueChange={setSelectedApproach}>
              <TabsList className="grid w-full grid-cols-1 gap-2 h-auto">
                {Object.entries(currentProblem.approaches).map(([key, approach]) => (
                  <TabsTrigger key={key} value={key} className="justify-start text-left p-3 h-auto">
                    <div>
                      <div className="font-medium">{approach.name}</div>
                      <div className="text-xs text-gray-500">
                        Time: {approach.timeComplexity} | Space: {approach.spaceComplexity}
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Algorithm Logic</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{currentApproach?.explanation}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Time Complexity</h4>
                  <Badge variant="outline" className="font-mono">
                    {currentApproach?.timeComplexity}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Space Complexity</h4>
                  <Badge variant="outline" className="font-mono">
                    {currentApproach?.spaceComplexity}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Points</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {currentApproach?.keyPoints?.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Code Display */}
        <div className="w-1/3 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Source Code</h3>
              <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <TabsList>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex-1">
            <CodeDisplay
              code={currentCode || ""}
              language={selectedLanguage}
              highlightedLine={visualizationData?.steps[currentStep]?.highlightedLine}
            />
          </div>
        </div>

        {/* Right Panel - Visualizer */}
        <div className="w-1/3 bg-gray-50 flex flex-col">
          <div className="p-4 border-b bg-white">
            <h3 className="text-lg font-semibold mb-4">Interactive Visualization</h3>
            <InputPanel problem={currentProblem} onInputChange={setUserInput} currentInput={userInput} />
          </div>

          <div className="flex-1 p-4">
            <Visualizer
              problemId={problem.id}
              approach={selectedApproach}
              input={userInput}
              currentStep={currentStep}
              onVisualizationDataChange={setVisualizationData}
            />
          </div>

          <div className="p-4 bg-white border-t">
            <ControlPanel
              isPlaying={isPlaying}
              currentStep={currentStep}
              totalSteps={visualizationData?.steps?.length || 0}
              speed={speed}
              onPlay={handlePlay}
              onReset={handleReset}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              onSpeedChange={setSpeed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
