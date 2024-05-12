import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import SearchBar from '../Composants/SearchBar';
import image from '../Composants/image01.png';
import image02 from '../Composants/image02.png';

function Accueil() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundOffsetX = (mousePos.x / window.innerWidth - 0.75) * 100;
  const backgroundOffsetY = (mousePos.y / window.innerHeight - 0.75) * 100;

  return (
    <div style={{ overflow: 'hidden' }}> {/* Ajout de la propriété overflow: 'hidden' ici */}
      <header>
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Conteneur général avec fond noir en bas */}
        <div className="relative">
          {/* La division noire sous le fond */}
          <div className="absolute inset-0 bg-black z-0"></div> {/* Couche noire sous l'image de fond */}
          
          {/* Conteneur de l'image de fond avec position relative pour permettre le mouvement */}
          <div
            className="relative bg-cover bg-center bg-no-repeat h-screen z-10" // L'image de fond est au-dessus de la division noire
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: `calc(50% + ${backgroundOffsetX}px) calc(50% + ${backgroundOffsetY}px)`,
              backgroundSize: '115rem 110rem', // Remplacez 800px par la largeur souhaitée et 600px par la hauteur souhaitée
              transition: 'background-position 0.1s',
            }}
          >
            <div className="flex flex-col justify-center items-center h-full relative ">
              <img
                src={image02}
                alt="titre"
                className={`relative top-0.5/3 w-2/4 transform -translate-x-0.5/2 left-0.5/2 z-10 ${searchActive ? '-top-8' : ''}`} // Centrage horizontal
              />
              <SearchBar onSearch={() => setSearchActive(true)} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Accueil;