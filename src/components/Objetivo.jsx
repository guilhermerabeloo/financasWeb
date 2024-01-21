import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { api } from '../lib/api';
import ObjetivoEmpty from "./ObjetivoEmpty";

export default function Objetivo() {
    const [ objetivo, setObjetivo ] = useState([]);
    
    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getMovimentos() {
            try {
                const response = await api.get(`/buscaObjetivo/${email}`)
                const data = response.data.data;

                setObjetivo(data)
            } catch(error) {
                console.log(error)
            }
        }
        getMovimentos()
    }, [email])

    if(objetivo.length == 0) {
        return (
            <>
                <div className="container-objetivo">
                    <ObjetivoEmpty />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="container-objetivo">
                </div>
            </>
        )
    }
}