import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from '../Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

  const userData = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  return (
    <div className="bg-gray-800 min-h-screen">
  <Header />
  <div className="mx-auto w-3/4 max-w-xl p-20 bg-gray-900" style={{ minHeight: '50vh', marginTop: '10vh', borderRadius: '90px' }}>
    <div className="flex items-center mb-8">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <FontAwesomeIcon icon={faUser} className="text-gray-400 w-full h-full" />
      </div>
      <div className="ml-4">
        <h1 className="text-white text-3xl">{userData.username}</h1>
        <p className="text-gray-400">{userData.email}</p>
        <button onClick={() => navigate('/home')}>
        <FontAwesomeIcon icon={faEdit} className="text-pink-700" />
      </button>
      </div>
      
    </div>
    <div className="flex-1 flex-col text-center">
      <div className="flex  w-full ">
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-white text-lg mb-4 inline-block">Personal Information</h2>
          <p className="text-gray-400">
          {userData.firstname}<br />
          {userData.lastname}<br />
          {userData.phonenumber}<br />
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 mx-4">
          <h2 className="text-white text-lg mb-4 inline-block">Personal Information</h2>
          <p className="text-gray-400">
          {userData.firstname}<br />
          {userData.lastname}<br />
          {userData.phonenumber}<br />
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserProfile