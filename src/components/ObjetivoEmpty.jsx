import { Link } from 'react-router-dom'
import './css/ObjetivoEmpty.css'

export default function ObjetivoEmpty() {


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
}