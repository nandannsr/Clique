import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const user = useSelector(state => state.user);
  console.log(user)
  return (
    <div className="bg-slate-800 min-h-screen">
      <header className="flex items-center justify-between p-4">
        <a href="#" className="text-pink-600 font-medium mr-4">CliQue</a>
        <div className="flex justify-center w-full">
          <input type="text" className="bg-white p-2 rounded-full w-64 text-black" placeholder="Search" />
        </div>
        <div className="flex items-center">
          <a href="#" className="text-white font-medium mr-4">Home</a>
          <button className="bg-pink-600 text-white py-1 px-2 rounded-full">Profile</button>
        </div>
      </header>
      <aside className="bg-slate-800 h-screen w-1/6">
        <div className="p-4">
          <a href="#" className="text-pink-600 font-medium block mb-2">Home</a>
          <a href="#" className="text-pink-600 font-medium block mb-2">Trending</a>
          <a href="#" className="text-pink-600 font-medium block mb-2">Subscriptions</a>
          <a href="#" className="text-pink-600 font-medium block">Library</a>
        </div>
      </aside>
      <main className="flex items-center justify-center p-20 w-5/6">
        <div className="text-center text-white text-3xl font-medium">
          Welcome to CliQue!
        </div>
      </main>
    </div>
  );
};

export default Home;
