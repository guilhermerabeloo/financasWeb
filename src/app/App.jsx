import './App.css';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';

function App() {
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

export default App
