import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 w-1/6">
    <ul>
      <li className="py-2 hover:text-gray-300">Home</li>
      <li className="py-2 hover:text-gray-300">Trending</li>
      <li className="py-2 hover:text-gray-300">Subscriptions</li>
    </ul>
  </nav>
  );
};

export default SideNavBar;