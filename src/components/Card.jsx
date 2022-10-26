import React from 'react'

export default function Card({ children }) {
  return (
    <div className="relative h-full w-full rounded-sm bg-black p-6 shadow-xl">
      {children}
    </div>
  )
}
