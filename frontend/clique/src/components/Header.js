import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
        setIsAuthenticated(true)
    }
}, [])
  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">CliQue</h1>
      <div className="flex items-center justify-center rounded-full bg-gray-800 px-2 py-1 mx-4">
        <input type="text" placeholder="Search" className="bg-white text-black rounded-full outline-none w-full py-2 px-4"/>
      </div>
      <button className="bg-pink-700 text-white px-4 py-2 rounded-full">Profile</button>
    </header>
  )
}

export default Header