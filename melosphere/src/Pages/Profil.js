import React, { useState, useEffect} from 'react';
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
     <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> {/* Ajoutez les props ici */}
     <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> {/* Transmettez également les props ici */}
     <div className='mt-[5rem]'>
      <h1>Profil de {userData.pseudo}</h1>
      <p>Email : {userData.email}</p>
      {/* Autres informations de l'utilisateur à afficher */}
    </div>
    </div>
  );
};

export default Profil;
