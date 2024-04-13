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
      <div className='mt-[3rem]'>
        <h1>Playlist</h1>
        <form onSubmit={handlePlaylistSubmit}>
          <input
            type="text"
            placeholder="Nom de la playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description de la playlist"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
          />
          <button type="submit">Créer une nouvelle playlist</button>
        </form>
      </div>
    </div>
 );
};

export default PlaylistPage;
