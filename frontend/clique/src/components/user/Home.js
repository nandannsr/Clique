import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import SideNavBar from '../SideNavBar';
import instance from '../../utils/axiosInstance';
import { Link } from 'react-router-dom';

const Home = () => {

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log(videos)
  const user = useSelector(state => state.user);
  return (
    <div className="flex flex-col h-screen">
      <Header />

    <div className="flex flex-1">
      <SideNavBar />
      <main className="flex flex-col bg-gray-900 items-center justify-center p-20 w-5/6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://via.placeholder.com/300x200"
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {video.title}
                </h3>
                <Link to={`/playing/${encodeURIComponent(video.file)}`}><p className="text-gray-600">{video.description}</p> </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
    
  )
}

export default Home;
