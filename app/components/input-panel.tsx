"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface InputPanelProps {
  problem: any
  onInputChange: (input: any) => void
  currentInput: any
}

export default function InputPanel({ problem, onInputChange, currentInput }: InputPanelProps) {
  const [inputValues, setInputValues] = useState<any>({})
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (currentInput) {
      setInputValues(currentInput)
    }
  }, [currentInput])

  const validateInput = (values: any) => {
    // Basic validation based on problem constraints
    if (problem.id === "two-sum") {
      const nums = values.nums
      const target = values.target

      if (!nums || nums.length < 2 || nums.length > 10000) {
        return "Array must have 2-10000 elements"
      }

      if (target === undefined || target < -1000000000 || target > 1000000000) {
        return "Target must be between -10^9 and 10^9"
      }
    }

    if (problem.id === "binary-search") {
      const nums = values.nums
      const target = values.target

      if (!nums || nums.length === 0 || nums.length > 10000) {
        return "Array must have 1-10000 elements"
      }

      // Check if array is sorted
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
          return "Array must be sorted in ascending order"
        }
      }
    }

    if (problem.id === "bubble-sort") {
      const nums = values.nums

      if (!nums || nums.length === 0 || nums.length > 1000) {
        return "Array must have 1-1000 elements"
      }
    }

    return ""
  }

  const handleInputChange = (field: string, value: any) => {
    const newValues = { ...inputValues, [field]: value }
    setInputValues(newValues)

    const validationError = validateInput(newValues)
    setError(validationError)

    if (!validationError) {
      onInputChange(newValues)
    }
  }

  const parseArrayInput = (input: string) => {
    try {
      return JSON.parse(input)
    } catch {
      return input
        .split(",")
        .map((x) => Number.parseInt(x.trim()))
        .filter((x) => !isNaN(x))
    }
  }

  return (
    <div className="space-y-4">
      {problem.inputs?.map((input: any) => (
        <div key={input.name}>
          <Label htmlFor={input.name} className="text-sm font-medium">
            {input.label}
          </Label>
          {input.type === "array" ? (
            <Input
              id={input.name}
              placeholder={input.placeholder}
              value={
                Array.isArray(inputValues[input.name])
                  ? JSON.stringify(inputValues[input.name])
                  : inputValues[input.name] || ""
              }
              onChange={(e) => handleInputChange(input.name, parseArrayInput(e.target.value))}
              className="mt-1"
            />
          ) : (
            <Input
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={inputValues[input.name] || ""}
              onChange={(e) =>
                handleInputChange(
                  input.name,
                  input.type === "number" ? Number.parseInt(e.target.value) : e.target.value,
                )
              }
              className="mt-1"
            />
          )}
        </div>
      ))}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setInputValues(problem.defaultInput)
          onInputChange(problem.defaultInput)
          setError("")
        }}
      >
        Use Default Input
      </Button>
    </div>
  )
}
