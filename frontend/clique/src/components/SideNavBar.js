import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = () => {
  return (
    <nav className="text-white pt-6 px-4 py-2 w-1/6">
    <div className='flex bg-gray-700 mt-6 p-6 rounded-3xl'>
    <ul>
      <li className="py-2 hover:text-gray-300">Home</li>
      <li className="py-2 hover:text-gray-300">Trending</li>
      <li className="py-2 hover:text-gray-300">Subscriptions</li>
      <li className="py-2 hover:text-gray-300">Home</li>
      <li className="py-2 hover:text-gray-300">Trending</li>
      <li className="py-2 hover:text-gray-300">Subscriptions</li>
      <li className="py-2 hover:text-gray-300">Home</li>
      <li className="py-2 hover:text-gray-300">Trending</li>
      <li className="py-2 hover:text-gray-300">Subscriptions</li>
    </ul>
    </div>
  </nav>
  );
};

export default SideNavBar;