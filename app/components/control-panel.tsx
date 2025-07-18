"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react"

interface ControlPanelProps {
  isPlaying: boolean
  currentStep: number
  totalSteps: number
  speed: number
  onPlay: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onSpeedChange: (speed: number) => void
}

export default function ControlPanel({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" onClick={onStepBackward} disabled={currentStep === 0}>
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button onClick={onPlay} disabled={totalSteps === 0} className="px-6">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <Button variant="outline" size="sm" onClick={onStepForward} disabled={currentStep >= totalSteps - 1}>
          <SkipForward className="w-4 h-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600">
        Step {currentStep + 1} of {totalSteps}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Speed</span>
          <span>{speed}ms</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={100}
          max={2000}
          step={100}
          className="w-full"
        />
      </div>
    </div>
  )
}
