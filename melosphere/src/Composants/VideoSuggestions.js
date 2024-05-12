import React from 'react';

const VideoSuggestions = ({ suggestedVideos, onVideoClick }) => {
  return (
    <div className="flex flex-wrap justify-center"> 
      {suggestedVideos.map((video, index) => (
        <div
          key={index}
          className="m-2 p-4 bg-black  flex flex-col items-center border-2 border-purple-800 transform transition-transform duration-200 ease-in-out hover:scale-110 shadow-lg shadow-purple-500 hover:border-white hover:shadow-white" // Remplir avec bg-purple-700 et centrer
          style={{ flex: '0 0 calc(20% - 16px)' }} // 20% de largeur moins 16px de marge
        >
          <img
            src={video.thumbnails[0].url}
            alt={video.title}
            onClick={() => onVideoClick(video.video_id)}
            className="cursor-pointer rounded-md" // Coins arrondis
            style={{ maxWidth: '100%', maxHeight: '200px' }} // Conserver l'image à une taille raisonnable
          />
          <p className="mt-2 text-center text-white font-semibold">{video.title}</p> 
        </div>
      ))}
    </div>
  );
};

export default VideoSuggestions;