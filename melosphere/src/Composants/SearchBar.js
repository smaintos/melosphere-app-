import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'; // Importer le composant YouTube

const DownloadAudio = () => {
 const [videoUrl, setVideoUrl] = useState('');
 const [youtubeVideoId, setYoutubeVideoId] = useState('');
 const [showPlaylistsButton, setShowPlaylistsButton] = useState(false); // État pour contrôler l'affichage du bouton "Playlists +"
 const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage de la fenêtre modale

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
      setShowPlaylistsButton(true); // Afficher le bouton "Playlists +" après la recherche

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

 const handleOpenModal = () => {
    setShowModal(true); // Ouvrir la fenêtre modale
 };

 const handleCloseModal = () => {
    setShowModal(false); // Fermer la fenêtre modale
 };

 return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        {showPlaylistsButton && (
          <button 
            onClick={handleOpenModal} // Modifier pour ouvrir la fenêtre modale
            className="bg-yellow-600 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-85 ml-2 mr-4"
          >
            Playlists +
          </button>
        )}
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

      {/* Fenêtre modale */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Playlist
                    </h3>
                    {/* Contenu de la fenêtre modale ici */}
                 </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>
                 Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
 );
};

export default DownloadAudio;
