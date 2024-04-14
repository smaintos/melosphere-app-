import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const PlaylistPage = () => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [userPseudo, setUserPseudo] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const pseudo = localStorage.getItem('userPseudo');
    if (pseudo) {
      setUserPseudo(pseudo);
      fetch(`http://192.168.214.2:3002/playlists/${pseudo}`)
        .then(response => response.json())
        .then(data => setPlaylists(data))
        .catch(error => console.error('Erreur lors de la récupération des playlists:', error));
    }
  }, []);

  const handlePlaylistSubmit = async (event) => {
    event.preventDefault();
    if (!userPseudo) {
      console.error('Le pseudo de l\'utilisateur n\'est pas défini');
      return;
    }
    try {
      const response = await fetch('http://192.168.214.2:3002/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPseudo, name: newPlaylistName, description: newPlaylistDescription }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log('Playlist créée avec succès :', data);
      alert('Playlist créée avec succès');
      setPlaylists([...playlists, { name: newPlaylistName, description: newPlaylistDescription }]);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
    } catch (error) {
      console.error('Erreur lors de la création de la playlist :', error);
      alert('Erreur lors de la création de la playlist');
    }
  };


  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col flex-grow w-full">
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-[2em] flex-grow overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between p-8">
            <div className="bg-gray-100 p-8 rounded-md shadow-lg w-full max-w-md flex-shrink-0 md:mr-4 mb-4 md:mb-0 h-[fit-content] md:h-full">
              <h1 className="text-xl font-semibold mb-4">Créer une nouvelle playlist</h1>
              <form onSubmit={handlePlaylistSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom de la playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Description de la playlist"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="block w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
                  Créer une nouvelle playlist
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
              {playlists.map((playlist, index) => (
                <div key={index} className="bg-gray-200 p-8 rounded-md shadow-lg w-[300px] h-[200px] overflow-auto">
                  <h1 className="text-xl font-semibold mb-2">{playlist.name}</h1>
                  <p>{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
   
   
export default PlaylistPage;
