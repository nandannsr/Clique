import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import instance from '../../utils/axiosInstance';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const user = useSelector(state => state.user);

  const handleUpload = async () => {
    const chunkSize = 1024 * 1024; // 1 MB
    const fileSize = video.size;
    const chunks = Math.ceil(fileSize / chunkSize);

    const url = '/api/upload/';
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = (i + 1) * chunkSize;
      const chunk = video.slice(start, end);
      const currentChunk = i + 1;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', chunk, video.name);
      formData.append('file_name', video.name);
      formData.append('chunk', currentChunk);
      formData.append('total_chunks', chunks);

      const config = {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((start + progressEvent.loaded) * 100 / fileSize);
          console.log(`Chunk ${currentChunk} - ${percentCompleted}% uploaded`);
        },
      };

      try {
        await instance.post(url, formData, config);
        console.log(`Chunk ${currentChunk} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading chunk ${currentChunk}`);
        console.error(error);
      }
    }

    alert('Video uploaded successfully');
    setTitle('');
    setDescription('');
    setVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !video) {
      alert('Please fill all fields');
      return;
    }

    handleUpload();
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold mb-8">Upload a Video</h1>
      <form className="bg-gray-900 p-8 rounded-md shadow-lg flex flex-col items-center">
        <div className="flex flex-col mb-4">
          <label className="text-white font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="bg-gray-800 text-white rounded-md py-2 px-3"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="bg-gray-800 text-white rounded-md py-2 px-3 h-32"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white font-bold mb-2" htmlFor="video">
            Video
          </label>
          <input
            className="bg-gray-800 text-white rounded-md py-2 px-3"
            type="file"
            id="video"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <button
          className="bg-pink-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-pink-700 mt-4"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
