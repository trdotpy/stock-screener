import React from 'react'

export default function ChartFilter({ text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border-1 m-2 flex h-8 w-12 cursor-pointer items-center justify-center rounded-md font-bold ${
        active
          ? 'border-indigo-700 bg-green text-white'
          : 'border-indigo-300 text-gray-light'
      } hover:border-indigo-700 hover:bg-indigo-600 hover:text-gray-100 transition duration-200`}
    >
      {text}
    </button>
  )
}
