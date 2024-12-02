import React from 'react'
import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <Loader2 className="w-16 h-16 text-purple-300 animate-spin" />
        <h2 className="mt-4 text-2xl font-bold text-white">Loading Study Spaces...</h2>
        <p className="mt-2 text-purple-200">Finding the perfect spot for you!</p>
      </div>
    </div>
  )
}

