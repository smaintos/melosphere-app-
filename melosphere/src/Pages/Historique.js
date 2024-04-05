import React, { useState, useEffect } from 'react';

const Historique = () => {
 const [historique, setHistorique] = useState([]);

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
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold mb-4">Historique</h2>
      <ul>
        {historique.map((item, index) => (
          <li key={index} className="mb-2">
            {item.url} - {item.action} le {new Date(item.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default Historique;
