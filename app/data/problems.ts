export const problemData: Record<string, any> = {
  "two-sum": {
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    example: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    inputs: [
      {
        name: "nums",
        label: "Array of integers",
        type: "array",
        placeholder: "[2, 7, 11, 15]",
      },
      {
        name: "target",
        label: "Target sum",
        type: "number",
        placeholder: "9",
      },
    ],
    defaultInput: {
      nums: [2, 7, 11, 15],
      target: 9,
    },
    approaches: {
      "brute-force": {
        name: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "Check every pair of numbers in the array to see if they sum to the target. Use nested loops to compare each element with every other element.",
        keyPoints: [
          "Simple nested loop approach",
          "Check all possible pairs",
          "No extra space needed",
          "Inefficient for large arrays",
        ],
        code: {
          javascript: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`,
          python: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        },
      },
      "hash-map": {
        name: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "Use a hash map to store numbers we've seen and their indices. For each number, check if its complement (target - current number) exists in the hash map.",
        keyPoints: [
          "Single pass through the array",
          "Use hash map for O(1) lookups",
          "Store complement values",
          "Trade space for time efficiency",
        ],
        code: {
          javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
          python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
        },
      },
    },
  },
  "binary-search": {
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    example: {
      input: "nums = [-1,0,3,5,9,12], target = 9",
      output: "4",
      explanation: "9 exists in nums and its index is 4",
    },
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "-10⁴ < nums[i], target < 10⁴",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    inputs: [
      {
        name: "nums",
        label: "Sorted array of integers",
        type: "array",
        placeholder: "[-1, 0, 3, 5, 9, 12]",
      },
      {
        name: "target",
        label: "Target value",
        type: "number",
        placeholder: "9",
      },
    ],
    defaultInput: {
      nums: [-1, 0, 3, 5, 9, 12],
      target: 9,
    },
    approaches: {
      "binary-search": {
        name: "Binary Search",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation:
          "Since the array is sorted, we can use binary search to efficiently find the target. Compare the target with the middle element and eliminate half of the search space in each iteration.",
        keyPoints: [
          "Divide and conquer approach",
          "Eliminate half the search space each time",
          "Works only on sorted arrays",
          "Logarithmic time complexity",
        ],
        code: {
          javascript: `function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
          python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
        },
      },
    },
  },
  "bubble-sort": {
    description: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

The algorithm gets its name from the way smaller or larger elements "bubble" to the top of the list.`,
    example: {
      input: "nums = [64, 34, 25, 12, 22, 11, 90]",
      output: "[11, 12, 22, 25, 34, 64, 90]",
      explanation: "The array is sorted in ascending order using bubble sort.",
    },
    constraints: ["1 ≤ nums.length ≤ 1000", "-1000 ≤ nums[i] ≤ 1000"],
    inputs: [
      {
        name: "nums",
        label: "Array of integers to sort",
        type: "array",
        placeholder: "[64, 34, 25, 12, 22, 11, 90]",
      },
    ],
    defaultInput: {
      nums: [64, 34, 25, 12, 22, 11, 90],
    },
    approaches: {
      "bubble-sort": {
        name: "Bubble Sort",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "Compare adjacent elements and swap them if they are in wrong order. Repeat this process for all elements. After each pass, the largest element bubbles up to its correct position.",
        keyPoints: [
          "Compare adjacent elements",
          "Swap if in wrong order",
          "Largest element bubbles up each pass",
          "Simple but inefficient algorithm",
        ],
        code: {
          javascript: `function bubbleSort(nums) {
    const n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                // Swap elements
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
    return nums;
}`,
          python: `def bubble_sort(nums):
    n = len(nums)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if nums[j] > nums[j + 1]:
                # Swap elements
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums`,
        },
      },
    },
  },
}
