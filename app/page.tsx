"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Play } from "lucide-react"
import ProblemSolver from "./components/problem-solver"

const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers in an array that add up to a target sum",
    tags: ["Array", "Hash Table"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    description: "Search for a target value in a sorted array",
    tags: ["Array", "Binary Search"],
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    difficulty: "Easy",
    description: "Sort an array using the bubble sort algorithm",
    tags: ["Array", "Sorting"],
    leetcodeUrl: "https://en.wikipedia.org/wiki/Bubble_sort",
  },
]

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)

  if (selectedProblem) {
    const problem = problems.find((p) => p.id === selectedProblem)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedProblem(null)} className="mb-2">
              ← Back to Problems
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{problem?.title}</h1>
            <div />
          </div>
        </div>
        <ProblemSolver problem={problem!} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Algorithm Learning Tool</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master algorithms through interactive visualizations. See how different approaches solve the same problem,
            from brute-force to optimal solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem) => (
            <Card key={problem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={problem.difficulty === "Easy" ? "secondary" : "destructive"} className="text-xs">
                    {problem.difficulty}
                  </Badge>
                  <div className="flex gap-1">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-xl">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="flex gap-2">
                  <Button onClick={() => setSelectedProblem(problem.id)} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button variant="outline" onClick={() => window.open(problem.leetcodeUrl, "_blank")}>
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Choose a Problem</h3>
              <p className="text-gray-600">Select from classic algorithmic problems</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Explore Approaches</h3>
              <p className="text-gray-600">Compare different algorithmic solutions</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Watch & Learn</h3>
              <p className="text-gray-600">See step-by-step visual animations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
