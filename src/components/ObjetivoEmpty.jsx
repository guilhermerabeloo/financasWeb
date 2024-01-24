import './css/ObjetivoEmpty.css'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Cookies from 'js-cookie';

export default function ObjetivoEmpty() {
    const [ objetivoTemp, setObjetivoTemp ] = useState({});
    const [ empty, setEmpty ] = useState(true);

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getObjetivoTemp() {
            const response = await api.get(`/buscaObjetivoTemp/${email}`)

            const dados = response.data.data[0];
            setObjetivoTemp(dados);

            if(dados) {
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        }

        getObjetivoTemp()
    }, [email])

    if(empty) {
        return (
            <>
                <div className="container-objetivoEmpty">
                    <p>Cadastre um objetivo e ele aparecerá aqui</p>
                    <Link to='/objetivo/criar'>
                        <button id="btn-cadastroObjetivo">Cadastrar objetivo</button>
                    </Link>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Navigate 
                    to='/objetivo/criar'
                    state={{ objetivoTemp }}
                />
            </>
        );
    }
}