import React from 'react'
import AdminNavbar from './NavBar/AdminNavbar'
import AdminSideBar from './NavBar/AdminSideBar'
import AdminCard from './Cards/AdminCard'

const AdminHome = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-800'>
      <AdminNavbar />
      <div className='flex flex-1 bg-gray-800'>
        <AdminSideBar />
        <main className='flex flex-col bg-gray-900 items-center justify-center p-20  m-6 rounded-[50px] shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] '>
          <div className='flex flex-row'>
          <AdminCard />
          <div className='w-full max-w-md p-4 mx-5 bg-white border border-gray-200 rounded-3xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"'>

          </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminHome;
