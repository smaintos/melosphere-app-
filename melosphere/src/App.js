import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import Accueil from './Pages/accueil';
import NavBar from './Composants/NavBar';


function App() {
  return (
    <div>
      <header>
        <Routes>
          <Route path="/" element={<Accueil />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
