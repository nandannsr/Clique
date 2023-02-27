import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import SideNavBar from '../SideNavBar';
import instance from '../../utils/axiosInstance';

const Home = () => {

  const [list, setList] = useState([]);
  useEffect(() => {
    instance.get('/api/videos')
    .then(response => {
      setList(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);
  console.log(list)
  const videos = [
    {
      id: 1,
      title: 'Video Title 1',
      description: 'This is the description for Video 1.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'Video Title 2',
      description: 'This is the description for Video 2.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 5,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 6,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 7,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 8,
      title: 'Video Title 3',
      description: 'This is the description for Video 3.',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
    },
    
  ];
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
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600">{video.description}</p>
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
