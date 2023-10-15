import { useState } from 'react';
import { Login } from '../components/Login';
import { Signin } from '../components/Singin';
import { ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';
import "react-toastify/dist/ReactToastify.css";

export default function Entrar() {
    const [ telaLogin, setTelaLogin ] = useState(true);
    const cookie = Cookies.get('token');

    if(cookie) {
        window.location.href = '/';

        return null
    } else {
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

}