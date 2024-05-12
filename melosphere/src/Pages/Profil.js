import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; // Importez le composant Link

import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Ajoutez cet état et sa fonction de mise à jour

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userPseudo = localStorage.getItem('userPseudo');
    if (isLoggedIn === 'true') {
      // Récupérer les données de l'utilisateur connecté depuis l'API
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

  if (!userData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-col justify-center items-center bg-zinc-950 text-white min-h-screen py-[3rem]"> {/* Fond noir, texte blanc */}
      <div className="bg-black rounded-lg shadow-2xl shadow-purple-500 p-8 w-full lg:max-w-xl flex flex-col items-center transform transition-transform duration-200 ease-in-out hover:-translate-y-3 hover:shadow-white border-2 border-purple-700 hover:border-white"> {/* Structure de la carte de profil */}
        
        <h1 className="text-3xl font-semibold text-center mb-8">Profil de {userData.pseudo}</h1> {/* Pseudo en blanc, centré */}
        
        <div className="flex items-center justify-between w-full"> {/* Flex pour aligner l'email et le bouton "Modifier" */}
          <p className="text-lg">Email : {userData.email}</p> {/* Affichage de l'email */}
          
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-md border-2 border-purple-500 hover:border-white transition-transform duration-200 ease-in-out"
            /*onClick={handleEditProfile}*/
          > {/* Bouton "Modifier" sur la même ligne que l'email */}
            Modifier
          </button>
        </div>
        
        <div className="bg-gray-200 w-full h-px my-8"></div> {/* Séparateur */}
        
        <div className="flex justify-center"> {/* Conteneur pour le bouton "Voir l'historique" */}
          <Link to="/historique">
            <button className="text-purple-400 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-transform duration-200 ease-in-out"> {/* Bouton avec texte blanc sur survol */}
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