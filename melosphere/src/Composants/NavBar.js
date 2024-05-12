import React, { useState, useEffect} from 'react';
import Sidebar from './SideBar'; // Assurez-vous d'importer le composant Sidebar
import { Link } from 'react-router-dom';
import logo from './logomelosphere.png';


const NavBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
 const [showSignUpModal, setShowSignUpModal] = useState(false);
 const [showLoginModal, setShowLoginModal] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userPseudo, setUserPseudo] = useState('');

 const [signUpUsername, setSignUpUsername] = useState('');
 const [signUpEmail, setSignUpEmail] = useState('');
 const [signUpPassword, setSignUpPassword] = useState('');
 const [loginEmail, setLoginEmail] = useState('');
 const [loginPassword, setLoginPassword] = useState('');
 const [isHovered, setIsHovered] = useState(false);

 useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userPseudo = localStorage.getItem('userPseudo');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserPseudo(userPseudo);
    }
 }, []);

 const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
 };

 const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
 };

 const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.214.2:3002/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo: signUpUsername, email: signUpEmail, mot_de_passe: signUpPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log('Inscription réussie :', data);
      setShowSignUpModal(false);
      alert('Inscription réussie');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Erreur lors de l\'inscription');
    }
 };

 const handleLoginSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('http://192.168.214.2:3002/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, mot_de_passe: loginPassword }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    console.log('Connexion réussie :', data);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userPseudo', data.pseudo);
    localStorage.setItem('userId', data.userId); // Stocker l'ID de l'utilisateur
    setIsLoggedIn(true);
    setUserPseudo(data.pseudo);
    setShowLoginModal(false);
    alert('Connexion réussie');
    window.location.reload();
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    alert('Erreur lors de la connexion');
  }
 };


 const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPseudo('');
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userPseudo', '');
    window.location.href = '/';
 };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
 };

 
 return (
  <div className="relative">
  <nav className="bg-black p-2 fixed top-0 w-full z-50 border-b border-white rounded-b">
  <div className="m-0 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 256 256" 
          fill="#bd6fbe" 
          className="text-white hover:text-purple-300 ml-[1.1rem]"
          onClick={toggleSidebar} 
        >
          <g fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
            <g transform="scale(5.12,5.12)">
              <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
            </g>
          </g>
        </svg>
        <div className="flex items-center space-x-4">
          {/* Ajout du bouton "Crée une playlist" qui redirige vers /playlists */}
          <Link 
  to="/playlists" 
  className="text-white px-3 py-2 rounded-md text-sm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110"
>
  Crée une playlist +
</Link>

<style jsx>{`
 .zoom-on-hover:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
`}</style>
          {/* Votre code existant ici... */}
        </div>
      </div>
      <div className="flex items-center justify-center flex-1"> 
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo Melosphere" className="h-8" />
          </Link>
        </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
        <button onClick={toggleSignUpModal} className="text-white px-3 py-2 rounded-md text-sm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
          S'inscrire
        </button>
        <button onClick={toggleLoginModal} className="text-white px-3 py-2 rounded-md text-sm font-medium transform transition-transform duration-200 ease-in-out hover:scale-110">
          Se connecter
        </button>
          </>
        ) : (
          <>
          <span
          className="text-white mr-[1.2rem] cursor-pointer relative hover:scale-110 transition-transform duration-200 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to="/Profil">{userPseudo}</Link>
          {isHovered && (
            <div className="relative w-full">
              <div className="h-0.5 bg-white w-full absolute bottom-0" style={{ bottom: '-0.2rem' }}></div>
            </div>
          )}
        </span>
          <button onClick={handleLogout} className="text-red-500 font-bold py-[0.3rem] px-[0.5rem] rounded transform transition-transform duration-200 ease-in-out hover:scale-110">
          | Déconnexion
        </button>
                {/* Ajout du bouton "Admin" */}
                {(userPseudo === "gregouzx" || userPseudo === "smaintos") && (
              <Link 
                to="/AdminPannel" 
                className="text-white px-3 py-2 rounded-md text-sm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110"
              >
                Admin
              </Link>
              )}
          </>
        )}
      </div>
    </div>

      {showSignUpModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="bg-black rounded-lg shadow-2xl shadow-white p-8 w-full lg:max-w-xl flex flex-col items-center transform transition-transform duration-200 ease-in-out hover:-translate-y-3 hover:shadow-purple-500 border-2 border-white hover:border-purple-700">
            <div className="text-purple-400 text-xl font-semibold mb-4">Inscription</div>
            <form onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">Pseudo</label>
                <input type="text" id="username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre pseudo" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">S'inscrire</button>
            </form>
            <div className="flex justify-end">
             <button onClick={toggleSignUpModal} className="mt-3 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="bg-black rounded-lg shadow-2xl shadow-white p-8 w-full lg:max-w-xl flex flex-col items-center transform transition-transform duration-200 ease-in-out hover:-translate-y-3 hover:shadow-purple-500 border-2 border-white hover:border-purple-700"> {/* Utilisation des mêmes styles que la carte de profil */}
           
            <div className="text-purple-300 text-xl font-semibold mb-4">Connexion</div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">Se connecter</button>
            </form>
            <div className="flex justify-end">
              <button onClick={toggleLoginModal} className="mt-3 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Fermer</button>
            </div>
          </div>
        </div>
        
      )}
    </nav>
  </div>
  
 );
};

export default NavBar;