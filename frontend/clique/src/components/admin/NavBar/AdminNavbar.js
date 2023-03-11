import React from 'react'

const AdminNavbar = () => {
  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
    <h1 className="text-2xl font-bold">CliQue</h1>
   <div className="flex items-center">
     <span className=' text-white px-4 py-2'>DashBoard</span>
    <button className="bg-pink-700 text-white px-4 py-2 rounded-full">Profile</button>
    
  </div>
  </header>
  )
}

export default AdminNavbar