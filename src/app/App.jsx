import './App.css';
import { Login } from '../components/Login';
import { Signin } from '../components/Singin';
import { useState } from 'react';

function App() {
  const [ telaLogin, setTelaLogin ] = useState(false);
  return (
    <>
      <Login 
        mostrarTelaLogin={telaLogin}
        mudarTela={setTelaLogin}
      />
      <Signin 
        mostrarTelaLogin={telaLogin}
        mudarTela={setTelaLogin}
      />
    </>
  )
}

export default App
