import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import VideoSuggestions from './VideoSuggestions';
import logo from './logomelosphere.png';


const DownloadAudio = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestedVideos = useCallback(
    async (videoId) => {
      if (!videoId) return;

      try {
        const response = await axios.get(
          'https://youtube-v2.p.rapidapi.com/video/recommendations',
          {
            params: { video_id: videoId },
            headers: {
              'X-RapidAPI-Key': '826b7a442dmsh45dd713c2644983p18a867jsn9f03fcd887c4',
              'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com',
            },
          }
        );

        const reducedVideos = response.data.videos.slice(0, 4);
        setSuggestedVideos(reducedVideos);
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos recommandées:', error.message);
        setError(error.message); // Mettre à jour l'état d'erreur
      }
    },
    []
  );

  useEffect(() => {
    if (youtubeVideoId) {
      fetchSuggestedVideos(youtubeVideoId);
    }
  }, [youtubeVideoId, fetchSuggestedVideos]);

  const handleVideoClick = (videoId) => {
    setYoutubeVideoId(videoId);

    // Mettre à jour l'URL dans la barre de recherche
    setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
  };

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
      setError(error.message); // Mettre à jour l'état d'erreur
    }
 };

 const handleSearch = async () => {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    console.error('L\'URL de la vidéo n\'est pas valide ou ne contient pas d\'ID de vidéo.');
    setError('Uniquement une url youtube.'); // Mettre à jour l'état d'erreur

    return;
  }

  setYoutubeVideoId(videoId);

  // Ajout à l'historique
  try {
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
    console.error('Erreur lors de l\'ajout à l\'historique:', error);
    setError('Erreur lors de l\'ajout à l\'historique: ' + error.message); // Mettre à jour l'état d'erreur
  }
};

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-6 mt-3"> {/* Ajoutez la marge supérieure ici */}
      <button
      onClick={handleSearch}
      className="bg-black text-white font-bold h-[2.5rem] px-4 rounded-l-md border-2 shadow-md shadow-purple-500 border-purple-600 shadow-md shadow-purple-500 transform transition-transform duration-200 ease-in-out hover:scale-110"
    >
      <img
        src={logo}
        alt="Logomelosphere"
        className="h-6"
      />
      
    </button>
          <input
            type="text"
            placeholder="URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            title="Seulement les url de youtube sont acceptées."
            className="w-[34rem] h-[2.50rem] bg-black text-white border-2 border-purple-600 p-2 shadow-md shadow-purple-500 "
            style={{ zIndex: "1" }}
          />
          <button
            onClick={handleDownload}
            className="bg-black text-white font-bold h-[2.5rem] px-4 rounded-r-md border-2 shadow-md shadow-purple-500 border-purple-600 shadow-md shadow-purple-500 transform transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Télécharger
          </button>
      </div>

      {youtubeVideoId && (
        <div className="flex justify-center mb-4 border-4 border-purple-800 shadow-lg shadow-purple-500 hover:border-white transform transition-transform duration-200 ease-in-out hover:scale-110">
          <YouTube videoId={youtubeVideoId} />
        </div>
      )}

      {suggestedVideos && suggestedVideos.length > 0 && (
        <div className="flex flex-wrap justify-center"> {/* Correction de la classe de justification */}
          <VideoSuggestions
            suggestedVideos={suggestedVideos}
            onVideoClick={handleVideoClick}
          />
        </div>
      )}
      {error && (
      <div className="text-red-500 mb-4">{error}</div> // Affichage du message d'erreur en rouge
      )}
    </div>
  );
};


export default DownloadAudio;