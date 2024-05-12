import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const Historique = () => {
 const [historique, setHistorique] = useState([]);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 useEffect(() => {
  const fetchHistorique = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
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
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col justify-center items-center bg-zinc-950 text-white min-h-screen py-[3rem]"> {/* Fond noir, texte blanc */}
        <h2 className="text-center text-2xl font-bold mb-12 mt-10">Historique</h2> {/* Titre centré */}
        <div className="w-full max-w-xl border border-white rounded-md p-4"> {/* Div avec des bords blancs */}
          <h3 className="text-xl font-bold mb-6">Historique des actions :</h3> {/* Sous-titre */}
          {historique.map((item, index) => (
            <div key={index} className="mb-6 relative"> {/* Div pour chaque élément de l'historique */}
              <p className="mb-4">{item.url} - {item.action} le {new Date(item.date).toLocaleDateString()} - Heure {new Date(item.date).toLocaleTimeString()}</p> {/* Affichage des informations */}
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700"></div> {/* Div en forme de trait violet */}
            </div>
          ))}
        </div>
      </div>
  </div>
 );
};

export default Historique;