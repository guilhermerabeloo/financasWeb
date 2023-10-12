import { useState } from 'react';
import { Login } from '../components/Login';
import { Signin } from '../components/Singin';

export default function Entrar() {
    const [ telaLogin, setTelaLogin ] = useState(true);
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