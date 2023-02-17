import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {

  const navigate = useNavigate()

  return (
    <div className="bg-slate-800 min-h-screen">
      <header className="flex items-center justify-between p-4">
        <div className="text-white font-medium text-3xl">CliQue</div>
        <div className="flex items-center">
          <a href="#" className="text-white font-medium mr-4" onClick={() => navigate("/login")}>Login</a>
          <button className="bg-pink-600 text-white py-1 px-2 rounded-full" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>
      <div className="flex items-center justify-center" style={{ height: '80vh' }}>
        <div
          className="w-2/3 h-full bg-center bg-cover"
          style={{
            backgroundImage: 'url(https://via.placeholder.com/1920x1080)',
            backgroundSize: 'cover'
          }}
        >
          <div className="text-center text-white text-3xl font-medium" style={{ paddingTop: '20%' }}>
            Welcome to the World Of Gamerz
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome