import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nouvel état pour le message de succès

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userPseudo = localStorage.getItem('userPseudo');
    if (isLoggedIn === 'true') {
      fetchUserData(userPseudo);
    }
  }, []);

  const fetchUserData = async (pseudo) => {
    try {
      const response = await fetch(`http://192.168.214.2:3002/utilisateur/${pseudo}`);
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    }
  };

  const handleEditEmail = () => {
    setIsEditing(true);
    setEditedEmail(userData.email);
  };

  const handleSaveEmail = async () => {
    try {
      const response = await fetch('http://192.168.214.2:3002/editmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo: userData.pseudo, email: editedEmail }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Erreur lors de la modification de l\'email :', data.message);
        return;
      }

      fetchUserData(userData.pseudo);
      setIsEditing(false);
      setSuccessMessage('Adresse e-mail modifiée avec succès'); // Mettre à jour le message de succès
    } catch (error) {
      console.error('Erreur lors de la modification de l\'email :', error);
    }
  };

  if (!userData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
  
      <div className="flex flex-col justify-center items-center bg-zinc-950 text-white min-h-screen py-[3rem]">
        <div className="bg-black rounded-lg shadow-2xl shadow-purple-500 p-8 w-full lg:max-w-xl flex flex-col items-center transform transition-transform duration-200 ease-in-out hover:-translate-y-3 hover:shadow-white border-2 border-purple-700">
          <h1 className="text-3xl font-semibold text-center mb-8">Profil de {userData.pseudo}</h1>
  
          {/* Conteneur pour l'email et les boutons de modification/enregistrement */}
          <div className="flex items-center justify-between w-full mb-4">
            {isEditing? (
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white"
                placeholder="Nouvelle adresse e-mail"
              />
            ) : (
              <p className="text-lg flex-grow">Email : {userData.email}</p>
            )}
  
            {isEditing? (
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded-md border-2 border-purple-500 hover:border-white transition-transform duration-200 ease-in-out"
                onClick={handleSaveEmail}
              >
                Enregistrer
              </button>
            ) : (
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded-md border-2 border-purple-500 hover:border-white transition-transform duration-200 ease-in-out"
                onClick={handleEditEmail}
              >
                Modifier
              </button>
            )}
          </div>
  
          {/* Afficher le message de succès */}
          {successMessage && (
            <div className="text-green-500 text-center mt-4">{successMessage}</div>
          )}
  
          <div className="bg-gray-200 w-full h-px my-8"></div>
  
          <div className="flex justify-center">
            <Link to="/historique">
              <button className="text-purple-400 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-transform duration-200 ease-in-out">
                Voir l'historique
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
