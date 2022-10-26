import React from 'react'
import SearchBar from './SearchBar'

export default function Header({ name }) {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold uppercase text-white">{name}</h1>{' '}
        <SearchBar />
      </div>
      {/* <ThemeIcon /> */}
    </>
  )
}
