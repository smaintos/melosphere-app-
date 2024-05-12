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
      <div className="flex flex-col mt-[2rem] items-center bg-zinc-950 text-white min-h-screen py-[3rem]"> 
        <h2 className="text-center text-2xl font-bold mb-12 mt-10">Historique</h2> 
        <div className="w-[50rem] border border-purple-800 rounded-md p-4 shadow-2xl shadow-purple-800 "> 
          <h3 className="text-xl font-bold mb-6 underline">Historique des actions :</h3> 
          {historique.map((item, index) => (
            <div key={index} className="mb-6 relative"> 
              <p className="mb-4">{item.url} - {item.action} le {new Date(item.date).toLocaleDateString()} - Heure {new Date(item.date).toLocaleTimeString()}</p> 
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700"></div> 
            </div>
          ))}
        </div>
      </div>
  </div>
 );
};

export default Historique;