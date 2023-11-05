import './App.css';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import Entrar from '../components/Entrar';
import Cookies from 'js-cookie';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const cookie = Cookies.get('token');
  const navigate = useNavigate();

  const [ expandirGrid, setExpandirGrid ] = useState(false);

  const toggleExpandirGrid = () => {
    setExpandirGrid(!expandirGrid);
  };

  if(!cookie) {
    navigate('/');
    return (
      <Entrar />
    )
  } else {
    return (
      <>
        <Header />
        <div
          className={`container ${expandirGrid ? "menu-expandido" : ""}`}
          id="template-areas"
        >
          <MenuLateral 
            propToggleExpandirGrid={toggleExpandirGrid}
            menuExpandido={expandirGrid}
          />
          <Outlet />
        </div>  
      </>
    )
  }

}

export default App
