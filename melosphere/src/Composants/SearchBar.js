import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'; // Importer le composant YouTube

const DownloadAudio = () => {
 const [videoUrl, setVideoUrl] = useState('');
 const [youtubeVideoId, setYoutubeVideoId] = useState('');


 const handleDownload = async () => {
    try {
      const response = await axios.get(`http://192.168.214.2:3002/downloadMp3?videoUrl=${encodeURIComponent(videoUrl)}`, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'unknown.mp3';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 0);

      const userId = localStorage.getItem('userId');
      if (userId) {
        await axios.post('http://192.168.214.2:3002/historique', {
          userId: userId,
          url: videoUrl,
          action: 'download',
        });
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
      }
    } catch (error) {
      console.error('Error downloading MP3:', error);
    }
 };

 const handleSearch = async () => {
    try {
      const id = extractVideoId(videoUrl);
      setYoutubeVideoId(id);

      const userId = localStorage.getItem('userId');
      if (userId) {
        await axios.post('http://192.168.214.2:3002/historique', {
          userId: userId,
          url: videoUrl,
          action: 'search',
        });
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
      }
    } catch (error) {
      console.error('Error searching video:', error);
    }
 };

 const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match[1];
 };

 return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <button 
          onClick={handleSearch} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Rechercher
        </button>
        <input 
          type="text" 
          placeholder="URL" 
          value={videoUrl} 
          onChange={(e) => setVideoUrl(e.target.value)} 
          className="w-[34rem] border-b border-l border-t border-purple-300 p-2 focus:outline-none" 
        />
        <button 
          onClick={handleDownload} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Télécharger
        </button>
      </div>
      {youtubeVideoId && <YouTube videoId={youtubeVideoId} />}

    </div>
 );
};

export default DownloadAudio;
