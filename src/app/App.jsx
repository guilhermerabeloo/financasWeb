import './App.css';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import Entrar from '../components/Entrar';
import Cookies from 'js-cookie';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function App() {
  const cookie = Cookies.get('token');
  const navigate = useNavigate();

  if(!cookie) {
    navigate('/');
    return (
      <Entrar />
    )
  } else {
    return (
      <>
        <Header />
        <div className='app-container'>
          <MenuLateral />
          <Outlet />
        </div>
      </>
    )
  }

}

export default App
