import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const Historique = () => {
 const [historique, setHistorique] = useState([]);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Ajoutez cet état et sa fonction de mise à jour

 useEffect(() => {
  const fetchHistorique = async () => {
    // Récupérer l'ID de l'utilisateur connecté depuis localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Construire l'URL de la requête avec l'ID de l'utilisateur
      const response = await fetch(`http://192.168.214.2:3002/historique/${userId}`);
      const data = await response.json();
      setHistorique(data);
    } else {
      console.log('L\'utilisateur n\'est pas connecté.');
    }
  };

  fetchHistorique();
}, []);


 return (
  <div>
    <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> {/* Ajoutez les props ici */}
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> {/* Transmettez également les props ici */}
    <div className="container mx-auto px-4 ">
      <h2 className="text-center text-2xl font-bold mb-4 mt-[6rem]">Historique</h2>
      <ul>
        {historique.map((item, index) => (
          <li key={index} className="mb-2">
            {item.url} - {item.action} le {new Date(item.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  </div>
 );
};

export default Historique;
