import React from 'react'

const AdminSideBar = () => {
  return (
    <nav className="text-white pt-6 px-4 py-2 w-1/6">
    <div className='flex bg-gray-700 mt-2 p-6 rounded-3xl'>
    <ul>
      <li className="py-2 text-xl hover:text-pink-700">DashBoard</li>
      <li className="py-2 text-xl hover:text-pink-700">User List</li>
      <li className="py-2 text-xl hover:text-pink-700">Video List</li>
      <li className="py-2 text-xl hover:text-pink-700">Streams</li>
      <li className="py-2 text-xl hover:text-pink-700">Genres</li>

    </ul>
      
    </div>
  </nav>
  )
}

export default AdminSideBar