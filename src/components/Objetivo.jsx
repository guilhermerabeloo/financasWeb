import Cookies from 'js-cookie';
import ObjetivoEmpty from "./ObjetivoEmpty";
import ObjetivoMy from "./ObjetivoMy";
import { useEffect, useState } from "react";
import { api } from '../lib/api';
import { ToastContainer } from "react-toastify";

export default function Objetivo() {
    const [ objetivo, setObjetivo ] = useState([]);
    
    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getObjetivo() {
            try {
                const response = await api.get(`/buscaObjetivo/${email}`)
                const data = response.data.data;

                setObjetivo(data)
            } catch(error) {
                console.log(error)
            }
        }
        getObjetivo()
    }, [email])

    if(objetivo.length == 0) {
        return (
            <>
                <div className="container-objetivo">
                    <ObjetivoEmpty />
                </div>
                <ToastContainer pauseOnHover={false}/>
            </>
        )
    } else {
        return (
            <>
                <div className="container-objetivo">
                    <ObjetivoMy />
                </div>
                <ToastContainer pauseOnHover={false}/>
            </>
        )
    }
}