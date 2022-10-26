import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import SearchResults from './SearchResults'
import { searchSymbol } from '../api/stock-api'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const [bestMatches, setBestMatches] = useState([])

  const updateBestMatches = async () => {
    try {
      if (search) {
        const searchResults = await searchSymbol(search)
        const result = searchResults.result
        setBestMatches(result)
      }
    } catch (error) {
      setBestMatches([])
      console.log(error)
    }
  }

  return (
    //
    <div className="relative z-50 my-2 flex w-96 items-center">
      <input
        type="text"
        value={search}
        placeholder="Search ticker symbols"
        className="w-full bg-gray-light px-4 py-2 focus:outline-none"
        onChange={(event) => setSearch(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            updateBestMatches()
          }
        }}
      />

      <button
        className="m-1 flex h-10 w-10 items-center justify-center p-2 text-white"
        onClick={updateBestMatches}
      >
        <BiSearch />
      </button>
      {search && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  )
}
