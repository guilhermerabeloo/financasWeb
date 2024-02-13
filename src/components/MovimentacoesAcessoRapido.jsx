import './css/MovimentacoesAcessoRapido.css'
import Cookies from 'js-cookie';
import { api } from '../lib/api';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function MovimentacoesAcessoRapido() {
    const [ movimentos, setMovimentos ] = useState([]);

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getMovimentos() {
            try {
                const response = await api.get(`/listaMovimentos/${email}`)
                const data = response.data.data;

                setMovimentos(data)
            } catch(error) {
                console.log(error)
            }
        }
        getMovimentos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email])

    return (
        <>
            <div className="movimentacoes container-acessoRapido">
                <div className="movimentacoes-titulo">
                    <h4>Últimas movimentações</h4>
                </div>
                <div className="movimentacoesAr-content">
                    {movimentos.length ?
                        movimentos.map((movimento, i) => {
                            return (
                                <div key={i} className="item-movimento">
                                    <div className="area-etapasExtrato"><div className="checkpoint"></div><div className="route"></div></div>
                                    <div className="area-descricaoMovimento">{movimento.descricao}<span className="acessoRapido-dataMovimento">{movimento.data}</span></div>
                                    <div className={`area-valorMovimento ${movimento.tipo == 'Receita' ? 'receita' : 'despesa'}`}>{movimento.valor}{`${movimento.tipo == 'Receita' ? ' C' : ' D'}`}</div>
                                </div>
                            )
                        }) :
                        <div className="movimentacoesAr-contentEmpity">
                            <span>Você ainda não possui movimentações cadastradas</span>
                        </div>
                    }
                </div>
                <div className="movimentacoes-seguirLink">
                    <Link to="/movimentacoes" className='link-movimentacoes'>
                        <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    )
}