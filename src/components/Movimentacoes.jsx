import './css/movimentacoes.css'
import Cookies from 'js-cookie';
import Chart from 'react-apexcharts';
import { api } from '../lib/api';
import { ToastContainer } from 'react-toastify'
import { BsBackspace, BsPencilSquare  } from 'react-icons/bs'
import { useState, useEffect } from 'react';

export default function Movimentacoes() {
    const [ movimentos, setMovimentos ] = useState([]);
    const [ filtroSelecionado, setFiltroSelecionado ] = useState('Todos');
    const [ totaisMovimentos, setTotaisMovimentos ] = useState({receitas: 5500, despesa: 2390})
 
    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getMovimentos() {
            try {
                const response = await api.get(`/listaMovimentos/${email}`)
                const data = response.data.data;

                const movimentosFiltrados = data.filter((d) => {
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

        async function getTotais() {
            try {
                const response = await api.get(`/totaisMovimentos/${email}`)
                const data = response.data.data;
                const dataNumber = {
                    receitas: Number(data[0].receitas),
                    despesa: Number(data[0].despesa)
                }
                
                // console.log(dataNumber)
                setTotaisMovimentos(dataNumber)
            } catch(error) {
                console.log(error)
            }
        }
        getTotais()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, filtroSelecionado])

    const chartData = {
        series: [totaisMovimentos.despesa, totaisMovimentos.receitas],
        options: {
            chart: {
                type: 'donut'
            },
            colors: ['#C33131', '#34508C'],
            labels: ['Despesas', 'Receitas'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '80%'
                    }
                }
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: 'right'
            }
        },
    };

    const chartDataBarra = {
        series: [
          {
            name: 'Valor',
            data: [64, 55, 44, 43],
          }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: false
            },
            colors: ['#34508C'],
            plotOptions: {
                bar: {
                    horizontal: true,
            },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['Mensalidades', 'Lazer', 'Cartões', 'Farmácia'],
                labels: {
                    show: false, 
                },
            },
        },
      };

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
                           </div>
                           <div className="area-botoesFiltrosData">
                                <input id="inp-filtroDataInicio" type="Date" />
                                <p> a </p>
                                <input type="Date" />
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
                                                    <td>TAG</td>
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
                                <Chart 
                                    options={chartData.options}
                                    series={chartData.series}
                                    type='donut'
                                />
                            </div>
                        </div>
                        <div className="area-graficoTags">
                            <div className="area-tituloGrafico">
                                <h5>Tags</h5>
                            </div>
                            <div className="area-grafico">
                                <Chart 
                                    options={chartDataBarra.options}
                                    series={chartDataBarra.series}
                                    type='bar'
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