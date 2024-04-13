import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const PlaylistPage = () => {
 const [newPlaylistName, setNewPlaylistName] = useState('');
 const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
 const [userPseudo, setUserPseudo] = useState(''); // État pour stocker le pseudo de l'utilisateur
 const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Ajoutez cet état et sa fonction de mise à jour

 useEffect(() => {
    // Récupérer le pseudo de l'utilisateur du localStorage
    const pseudo = localStorage.getItem('userPseudo');
    if (pseudo) {
      setUserPseudo(pseudo);
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
      // Réinitialisez les états ou faites toute autre action nécessaire
    } catch (error) {
      console.error('Erreur lors de la création de la playlist :', error);
      alert('Erreur lors de la création de la playlist');
    }
 };

 return (
  <div>
  <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> {/* Ajoutez les props ici */}
  <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> {/* Transmettez également les props ici */}
  <div className="flex justify-start items-start h-screen p-8 mt-[5rem]"> {/* Utilisation de p-8 pour ajouter un padding */}
    <div className="bg-gray-100 p-8 rounded-md shadow-lg w-full max-w-lg"> {/* Utilisation de w-full et max-w-lg pour limiter la largeur */}
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
  </div>
</div>
 );
};

export default PlaylistPage;
