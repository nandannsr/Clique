import { useState, useRef, useEffect } from "react";
import { storage } from "../../utils/firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instance from '../../utils/axiosInstance';
import fetchGenres from "../../utils/genresList.js";


const VideoUpload = () => {  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [task, setTask] = useState(false)
  const navigate = useNavigate()
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (event) => {
    const selectedGenreId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, selectedGenreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== selectedGenreId));
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    getGenres();
  }, []);

  const uploadTaskRef = useRef(null);
  const user = useSelector(state => state.user);

  const handleUpload = async (video) => {
    if (!video) return;

    const storageRef = ref(storage, `files/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);
    const url = '/api/upload/';
    const token = localStorage.getItem('access_token');
    const headers = {
    'Authorization': `Bearer ${token}`,
    };

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          if(downloadURL){
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            const genreArray = [];
            selectedGenres.forEach((genreId) => {
              formData.append('genres', genreId)
            });
            formData.append('file', downloadURL);
            try {
                instance.post('/api/upload/',formData, headers)
            } catch (error) {
              console.error(error);
            }
             alert('Video uploaded successfully');
             setTitle('');
             setDescription('');
             setVideo(null);
             setSelectedGenres([]);
          }
        });
      }
    );

    uploadTaskRef.current = uploadTask;
    setTask(true)
  }

  const handleCancel = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
      uploadTaskRef.current = null;
      setProgresspercent(0);
      setImgUrl(null);
      setTask(false)
      console.log("cancelled")
    }
  }

  const handlePauseResume = () => {
    if (!uploadTaskRef.current) return;

    const isPaused = task;
    if (!isPaused) {
      uploadTaskRef.current.resume();
      setTask(true)
      console.log("r")
    } else {
      uploadTaskRef.current.pause();
      console.log("p")
      setTask(false)
      console.log(isPaused)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !video) {
      alert('Please fill all fields');
      return;
    }
    if (video.size > 250 * 1024 * 1024) {
      alert("Maximum file size is 250 MB");
      return;
    }

    handleUpload(video);
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
         <div className="flex flex-col mb-4">
          <label className="text-white font-bold mb-2">Genres</label>
          {genres.map((genre) => (
          <div key={genre.id}>
          <input
            type="checkbox"
            id={genre.genre_name}
            name="genres"
            value={genre.id}
            checked={selectedGenres.includes(genre.id)}
            onChange={handleGenreChange}
          />
          <label className="text-white" htmlFor={genre.genre_name}>{genre.genre_name}</label>
        </div>
      ))}
        </div>
        <button
          className="bg-pink-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-pink-700 mt-4"
          onClick={handleSubmit}
        >
          Upload
        </button>
        {!imgUrl && (
        <div className="w-1/2 mt-4">
          <div className="bg-gray-200 rounded-full">
            <div className="bg-blue-500 rounded-full h-2" style={{ width: `${progresspercent}%` }}></div>
          </div>
          <div className="text-right text-xs mt-1">
            {progresspercent}%
          </div>
        </div>
      )}
      {uploadTaskRef.current && (
        <div className="mt-8">
          <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
            Cancel
          </button>
          <button onClick={handlePauseResume} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            {task ? "Pause" : "Resume"}
          </button>
        </div>
      )}
      </form>
      
    </div>
  );
};

export default VideoUpload;
