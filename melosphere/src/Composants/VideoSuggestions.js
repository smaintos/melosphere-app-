import React from 'react';

const VideoSuggestions = ({ suggestedVideos,onVideoClick }) => {
  // Dans VideoSuggestions.js, avant de rendre les images
  console.log(suggestedVideos); // Vérifiez que les données sont correctes
  return (
     <div className="flex flex-wrap justify-center">
       {suggestedVideos.slice(0, 4).map((video, index) => (
         <div key={index} className="m-2" style={{ flex: '0 0 calc(20% - 16px)' }}>
           <img
            src={video.thumbnails[0].url}
            alt={video.title}
            onClick={() => onVideoClick(video.video_id)} // Assurez-vous que video_id est correct
            className="cursor-pointer"
          />
           <p>{video.title}</p>
         </div>
       ))}
     </div>
  );
 };

export default VideoSuggestions;