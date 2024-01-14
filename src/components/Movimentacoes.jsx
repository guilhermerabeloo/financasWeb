import './css/movimentacoes.css'
import Cookies from 'js-cookie';
import Chart from 'react-apexcharts';
import { api } from '../lib/api';
import { ToastContainer } from 'react-toastify'
import { BsBackspace } from 'react-icons/bs'
import { useState, useEffect } from 'react';

export default function Movimentacoes() {
    const [ movimentos, setMovimentos ] = useState([])

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

    const chartData = {
        series: [40, 60],
        options: {
            chart: {
                type: 'donut'
            },
            colors: ['#C33131', '#1758e2'],
            labels: ['Despesas', 'Receitas'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '80%'
                    }
                }
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
            data: [64, 55, 44, 43, 41, 22, 21],
          }
        ],
        options: {
          chart: {
            type: 'bar',
            height: 350,
          },
          colors: ['#1758e2'],
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
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
                                <button id="btn-filtroTodos">Todos</button>
                                <button id="btn-filtroDespesas">Despesas</button>
                                <button id="btn-filtroReceitas">Receitas</button>
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
                                                <tr key={i}>
                                                    <td>*</td>
                                                    <td>{movimento.descricao}</td>
                                                    <td>{movimento.data}</td>
                                                    <td>TAG</td>
                                                    <td>{movimento.valor}</td>
                                                    <td><BsBackspace /></td>
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