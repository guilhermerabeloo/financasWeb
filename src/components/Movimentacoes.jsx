import './css/movimentacoes.css'
import Cookies from 'js-cookie';
import { api } from '../lib/api';
import { ToastContainer } from 'react-toastify'
import { BsBackspace, BsPencilSquare  } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import GraficoComposicaoDespesas from './GraficoComposicaoDespesas';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';

export default function Movimentacoes() {
    const [ lancamentosFuturos, setLancamentosFuturos ] = useState(false);
    const [ movimentos, setMovimentos ] = useState([]);
    const [ filtroSelecionado, setFiltroSelecionado ] = useState('Todos');
    const [ filtrosData, setFiltrosData ] = useState({
        dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10),
        dataFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10) 
    });
    const [ dadosRelatorios, setDadosRelatorios ] = useState({
        competencias: [],
        receitas: [],
        despesas: [],
        totaisreceitas: 0,
        totaisdespesas: 0,
        labeltags: [],
        valortags: [],
        objetivo: 0
    })
 
    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getMovimentos() {
            try {
                const response = await api.get(`/listaMovimentos/${email}`)
                const data = response.data.data;
                let movimentosSelecionados;
                if(!lancamentosFuturos) {
                    movimentosSelecionados = data.filter((d) => {
                        const dataMovimento = new Date(d.dataoriginal);
                        const dataAtual = new Date();
                        return dataMovimento <= dataAtual
                    })
                } else {
                    movimentosSelecionados = data;
                }

                const movimentosFiltrados = movimentosSelecionados.filter((d) => {
                    if(filtroSelecionado == 'Todos') {
                        return d
                    }

                    return d.tipo == filtroSelecionado
                })
                setMovimentos(movimentosFiltrados)
            } catch(error) {
                console.log(error)
            }
        }
        getMovimentos()

        async function getDadosGraficos() {
            try {
                const response = await api.post(`/relatorioGraficos`,
                    {
                        email: email,
                        dtInicio: filtrosData.dataInicio,
                        dtFinal: filtrosData.dataFinal
                    }
                )
                const data = response.data.data;

                const dadosUpdate = {
                    competencias: data.competencias,
                    receitas: data.receitas,
                    despesas: data.despesas,
                    totaisreceitas: data.totaisreceitas,
                    totaisdespesas: data.totaisdespesas,
                    labeltags: data.labeltags,
                    valortags: data.valortags,
                    objetivo: data.objetivo
                }
                setDadosRelatorios(dadosUpdate)
            } catch(err) {
                console.log('ERRO',err)
            }
        }    
        getDadosGraficos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, filtroSelecionado, lancamentosFuturos, filtrosData])

    function handleChangeFiltroData(event) {
        const inputAlterado = event.target.name;
        const valorAlterado = event.target.value;
        const novoFiltro = {...filtrosData};

        novoFiltro[inputAlterado] = valorAlterado;
        setFiltrosData(novoFiltro)
    } 

    return (
        <>
            <div className="container-movimentacoes">
                <div className="area-tituloMovimentacoes">
                    <h3 className="titulo-movimentacoes">Movimentações</h3>
                </div>
                <div className="content-movimentacoes">
                    <div className="area-movimentos">
                        <div className="area-filtrosMovimentos">
                           <div className="area-botoesFiltrosMovimentos">
                                <button id="btn-filtroTodos" className={`${filtroSelecionado == 'Todos' ? 'active' : ''}`} onClick={() => setFiltroSelecionado('Todos')}>Todos</button>
                                <button id="btn-filtroDespesas" className={`${filtroSelecionado == 'Despesa' ? 'active' : ''}`} onClick={() => setFiltroSelecionado('Despesa')}>Despesas</button>
                                <button id="btn-filtroReceitas" className={`${filtroSelecionado == 'Receita' ? 'active' : ''}`} onClick={() => setFiltroSelecionado('Receita')}>Receitas</button>
                                <button id="btn-filtroLancFuturos" className={`${lancamentosFuturos ? 'active' : ''}`} onClick={() => setLancamentosFuturos(!lancamentosFuturos)}>Lançamentos futuros</button>
                           </div>
                           <div className="area-botoesFiltrosData">
                                <input id="inp-filtroDataInicio" type="Date" name="dataInicio" value={filtrosData.dataInicio} onChange={(event) => handleChangeFiltroData(event)}/>
                                <p> a </p>
                                <input id="inp-filtroDataFinal" type="Date" name="dataFinal" value={filtrosData.dataFinal} onChange={(event) => handleChangeFiltroData(event)}/>
                           </div>
                        </div>
                        <div className="movimentos">
                            <div className="area-tabelaMovimentos">
                                <table className="itensMovimento">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Descrição</th>
                                            <th>Data</th>
                                            <th>TAG</th>
                                            <th>Valor</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="scrollable-tbody">
                                        {movimentos.map((movimento, i) => {
                                            return (
                                                <tr key={i} className='area-tabelaMovimento'>
                                                    <td className="area-etapasExtrato"><div className="checkpoint"></div><div className="route"></div></td>
                                                    <td>{movimento.descricao}</td>
                                                    <td>{movimento.data}</td>
                                                    <td>
                                                        <div className="mdTags-tag">
                                                            <div className="mdTags-tag-item">
                                                                <span style={{backgroundColor: movimento.corfundo, color: movimento.corletra}}>{movimento.tag}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`area-valor ${movimento.tipo == 'Receita' ? 'receita' : 'despesa'}`}>{movimento.valor}{`${movimento.tipo == 'Receita' ? ' C' : ' D'}`}</td>
                                                    <td className='area-action'>
                                                        <BsPencilSquare id='action-edit'/>
                                                        <BsBackspace id='action-delete'/>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="area-movimentosRelatorios">
                        <div className="area-graficoReceitasDespesas">
                            <div className="area-tituloGrafico">
                                <h5>Despesas vs receitas</h5>
                            </div>
                            <div className="area-grafico">
                                <GraficoReceitasDespesas 
                                    despesa={dadosRelatorios.totaisdespesas}
                                    receita={dadosRelatorios.totaisreceitas}
                                />
                            </div>
                        </div>
                        <div className="area-graficoTags">
                            <div className="area-tituloGrafico">
                                <h5>Tags</h5>
                            </div>
                            <div className="area-grafico">
                                <GraficoComposicaoDespesas 
                                    label={dadosRelatorios.labeltags}
                                    valores={dadosRelatorios.valortags}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer pauseOnHover={false}/>
            </div>
        </>
    )
}