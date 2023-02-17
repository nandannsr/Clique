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
    <div>
    
    </div>
  )
}

export default Header