import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const PlaylistPage = () => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [userPseudo, setUserPseudo] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [newLink, setNewLink] = useState({});

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
      setPlaylists([...playlists, { name: newPlaylistName, description: newPlaylistDescription }]);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
    } catch (error) {
      console.error('Erreur lors de la création de la playlist :', error);
    }
  };

  const handleAddLink = (playlistId) => {
    const link = newLink[playlistId];

    const requestBody = {
      userPseudo: userPseudo,
      playlistName: playlists.find(playlist => playlist.id === playlistId).name,
      link: link,
    };

    fetch('http://192.168.214.2:3002/playlists/addlink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Lien ajouté avec succès') {
          console.log('Lien ajouté avec succès');
          // Effacer éventuellement le champ d'entrée ou mettre à jour l'interface utilisateur pour refléter le changement
        } else {
          console.error('Erreur lors de l\'ajout du lien');
        }
      })
      .catch(error => console.error('Erreur lors de l\'ajout du lien:', error));
  };

  const handleDownload = async (playlistId) => {
    const playlist = playlists.find(playlist => playlist.id === playlistId); // Trouver la playlist par son ID
    if (!playlist) {
        console.error('Playlist not found');
        return;
    }

    const links = playlist.link.split(','); // Récupérer les liens de la playlist

    try {
        const response = await fetch('http://192.168.214.2:3002/downloadPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ links }), // Envoyer les liens dans le corps de la requête
        });

        if (!response.ok) {
            throw new Error('Erreur lors du téléchargement');
        }

        // Extraire le nom du fichier du contenu-disposition de l'en-tête de réponse
        const disposition = response.headers.get('content-disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        let filename = 'playlist.zip';
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }

        // Convertir la réponse en blob et créer un lien pour le téléchargement
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Erreur lors du téléchargement de la playlist :', error);
        // Vous pouvez ajouter ici un traitement supplémentaire si nécessaire
    }
};

  return (
    <div className="flex h-screen bg-zinc-950">
       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
       <div className="flex flex-col flex-grow w-full">
         <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
         <div className="p-[3em] flex-grow overflow-auto">
           <div className="flex flex-col md:flex-row justify-between p-8 relative">
             <div className="group bg-black p-8 rounded-md shadow-2xl shadow-purple-500 w-full max-w-md flex-shrink-0 md:mr-4 mb-4 md:mb-0 h-[fit-content] md:h-full my-[6rem] sticky top-0 transform hover:-translate-y-3 transition-transform duration-200 ease-in-out hover:shadow-white border-2 border-purple-500">
               <h1 className="text-xl font-semibold mb-4 text-white">Créer une nouvelle playlist</h1>
               <form onSubmit={handlePlaylistSubmit} className="space-y-4">
                 <input
                   type="text"
                   placeholder="Nom de la playlist"
                   value={newPlaylistName}
                   onChange={(e) => setNewPlaylistName(e.target.value)}
                   className="block w-full border-2 border-purple-500 shadow-md shadow-purple-500 group-hover:shadow-white bg-black text-white focus:outline-none focus:border-white group-hover:border-white rounded-md px-4 py-2"
                 />
                 <input
                   type="text"
                   placeholder="Description de la playlist"
                   value={newPlaylistDescription}
                   onChange={(e) => setNewPlaylistDescription(e.target.value)}
                   className="block w-full border-2 border-purple-500 shadow-md shadow-purple-500 group-hover:shadow-white bg-black text-white focus:outline-none focus:border-white group-hover:border-white rounded-md px-4 py-2"
                 />
                 <button type="submit" className="block w-full bg-black text-white font-bold py-2 px-4 rounded-md border border-transparent hover:border-white">
                   Créer une nouvelle playlist
                 </button>
               </form>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-[5rem] ml-[15rem] transform translate-y-[2rem]">
            {playlists.map((playlist, index) => (
          <div key={index} className="bg-black p-8 rounded-md shadow-2xl shadow-purple-500 border-purple-500 w-[454px] h-[630px] overflow-auto transform hover:-translate-y-7 transition-transform duration-200 ease-in-out border-2 text-white">
            {/* Enveloppez le titre et le bouton dans un div pour les aligner */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[1.7rem] font-semibold">{playlist.name}</h1>
              {/* Ajout du bouton Télécharger à droite du titre */}
              <button
                onClick={() => handleDownload(playlist.id)}
                className="bg-transparent border-2 border-purple-500 font-bold py-2 px-4 rounded text-2xl hover:bg-transparent hover:bg-purple-600 "
              >
                ☂️
              </button>
            </div>
            <p className="py-[1.5rem]">Description : {playlist.description}</p>
            <div>
              {playlist.link? playlist.link.replace(/,/g, ' ').split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word}
                  <br />
                </React.Fragment>
              )) : null}
            </div>
            <div className="flex flex-col items-center mt-[15rem]">
              <input
                type="text"
                placeholder="Lien à ajouter"
                value={newLink[playlist.id] || ''}
                onChange={(e) => setNewLink({...newLink, [playlist.id]: e.target.value })}
                pattern="https?://.+"
                title="Please enter a valid URL"
                className="block w-full border-2 border-purple-500 shadow-md shadow-purple-500 group-hover:shadow-white bg-black text-white focus:outline-none focus:border-white group-hover:border-white rounded-md px-4 py-2"
              />
              <button
                onClick={() => handleAddLink(playlist.id)}
                className="block w-full bg-black text-white font-bold py-[0.7rem] px-4 rounded-md border border-transparent hover:border-white mt-[1rem]"
              >
                Ajouter
              </button>
            </div>
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
