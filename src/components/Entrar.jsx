import { useState } from 'react';
import { Login } from '../components/Login';
import { Signin } from '../components/Singin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Entrar() {
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
            <ToastContainer pauseOnHover={false} />
        </>
    )
}