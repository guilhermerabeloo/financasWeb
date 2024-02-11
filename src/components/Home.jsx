import './css/Home.css'
import Cookies from 'js-cookie';
import ChecklistAcessoRapido from './ChecklistAcessoRápido'
import MovimentacoesAcessoRapido from './MovimentacoesAcessoRapido'
import ObjetivoAcessoRapido from './ObjetivoAcessoRapido'
import { api } from '../lib/api'
import { useEffect, useState } from 'react'
import { formatarMoeda } from '../assets/util';

export default function Home() {
    const [ totaisCabecalho, setTotaisCabecalho ] = useState({
        receitas: 0,
        despesas: 0,
        saldo: 0,
    });
    const [ metaAtual, setMetaAtual ] = useState(0)
    const [ statusSaldo, setStatusSaldo ] = useState('');
    const [ statusMeta, setStatusMeta ] = useState('')

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function buscaTotais() {
            const response = await api.get(`/totaisMovimentosAtuais/${email}`)
            const data = response.data.data[0];
            const { receitas, despesa } = data;
            const saldo = Number(receitas) - Number(despesa);

            setTotaisCabecalho({
                receitas: receitas,
                despesas: despesa,
                saldo: saldo,
                distanciaMeta: 0
            });

            saldo > 0 ? setStatusSaldo('positivo') : setStatusSaldo('negativo');
        }

        async function buscaMeta() {
            const responseMeta = await api.get(`/buscaMetaAtual/${email}`);
            const dataMeta = responseMeta.data.data[0];
            const meta = Number(dataMeta.meta);
            setMetaAtual(meta);
        }
        buscaTotais();
        buscaMeta();
    }, [email]);

    useEffect(() => {
        totaisCabecalho.saldo > metaAtual ? setStatusMeta('positivo') : setStatusMeta('negativo')
        console.log('09')
    }, [metaAtual, totaisCabecalho])

    return (
        <>
            <div className="content container-home">
                <div className="area-resumoMes">
                    <div className="area-saldo">
                        <div className="area-receitaDespesa">
                            <div className="receita">
                                <h5>Receitas no mês</h5>
                                <p>{formatarMoeda(totaisCabecalho.receitas)}</p>
                            </div>
                            <div className="despesa">
                                <h5>Despesas no mês</h5>
                                <p>{formatarMoeda(totaisCabecalho.despesas)}</p>
                            </div>
                        </div>
                        <div className="area-saldoMeta">
                            <div className="saldo">
                                <h5>Saldo do mês</h5>
                                <p className={statusSaldo}>{formatarMoeda(totaisCabecalho.saldo)}</p>
                            </div>
                            <div className="meta">
                                <h5>Meta do mês</h5>
                                <p className={statusMeta}>{formatarMoeda(metaAtual)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="area-acessoRapido">
                    <div className="cabecalho-AcessoRapido">
                        <h3>Acesso Rápido</h3>
                    </div>
                    <div className="area-acessos">
                        <div className="container-lateral">
                            <ChecklistAcessoRapido />
                            <MovimentacoesAcessoRapido />
                            <ObjetivoAcessoRapido />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}