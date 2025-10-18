import React from 'react'

const Search = () => {
  return (
    <div className="w-[80vw] mx-auto mt-1">
      <div className="flex items-center gap-4 p-4 rounded-lg">
        
        {/* Country Dropdown */}
        <select
          className="p-2 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="pakistan">Pakistan</option>
          <option value="india">India</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search item..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>
    </div>
  )
}

export default Search