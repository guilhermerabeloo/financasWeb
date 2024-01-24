import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { api } from '../lib/api';
import ObjetivoEmpty from "./ObjetivoEmpty";
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
                </div>
                <ToastContainer pauseOnHover={false}/>
            </>
        )
    }
}