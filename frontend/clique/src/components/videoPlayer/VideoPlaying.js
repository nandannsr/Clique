import React from 'react'
import VideoJS from './VideoJS';
import videojs from 'video.js';
import Header from '../Header';
import SideNavBar from '../SideNavBar';

const VideoPlaying = () => {

    const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: false,
    width: 640,
    height: 360,
    sources: [{
      src: 'https://cliquecontent.s3.amazonaws.com/media/videos/hello.mp4',
      type: 'video/mp4'
    }],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />

    <div className="flex flex-1">
      <SideNavBar />
      <main className="flex flex-col bg-gray-900 items-center justify-center p-20 w-5/6">

        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          
        
      </main>
    </div>
    </div>
      
  </>
  )
}

export default VideoPlaying