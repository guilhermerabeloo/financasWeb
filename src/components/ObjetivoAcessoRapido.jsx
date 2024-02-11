import './css/ObjetivoAcessoRapido.css'
import Cookies from 'js-cookie';
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom";
import { api } from '../lib/api';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect, useState } from 'react'
import { formatarMoeda } from '../assets/util';

export default function ObjetivoAcessoRapido() {
    const [ totaisObjetivo, setTotaisObjetivos ] = useState({ planejado: 0, realizado: 0, atingido: 0 });

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getObjetivo() {
            try {
                const response = await api.get(`/buscaObjetivoCompleto/${email}`)
                const data = response.data.data;
                const etapas = data.metasObjetivo;
                let realizado = 0;
                etapas.map((e) => {
                  realizado += Number(e.realizado)
                })
                const planejado = Number(data.cabecalho[0].valorfinal)
                const atingido = realizado / planejado * 100;
                setTotaisObjetivos({
                  planejado: planejado,
                  realizado: realizado,
                  atingido: atingido
                })

            } catch(err) {  
                console.log(err)
            }
        }

        getObjetivo()
    }, [email]);

    const chartData = {
        series: [totaisObjetivo.atingido],
        options: {
            chart: {
                height: 100,
                type: 'radialBar',
                toolbar: {
                    show: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 0,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    track: {
                        background: '#fff',
                        strokeWidth: '67%',
                        margin: 0,
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.35
                        }
                    },
                    dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '12px'
                    },
                    value: {
                        formatter: function(val) {
                            return parseInt(val) + '%';
                        },
                        color: '#111',
                        fontSize: '28px',
                        show: true,
                    }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#14213D'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Atingido'],
        },
    };

    return (
        <>
            <div className="objetivo container-acessoRapido">
                <div className="objetivoAr-titulo">
                    <h4>Objetivo atual</h4>
                </div>
                <div className="objetivoAr-content">
                    <div className="area-conclusaoObjetivoAr">
                        <div className="objetivoAr-areaGrafico">
                            <Chart 
                                options={chartData.options}
                                series={chartData.series}
                                type='radialBar'
                            />
                        </div>
                        <div className="objetivoAr-areaLabelGrafico">
                            <div className="objetivoAr-objetivoTotal">
                                <span className="objetivoAr-labelObjetivoTotal">Objetivo:</span>
                                <span className="objetivoAr-valorObjetivoTotal">{formatarMoeda(totaisObjetivo.planejado)}</span>
                            </div>
                            <div className="objetivoAr-objetivoAtingido">
                                <span className="objetivoAr-labelObjetivoAtingido">Atingido:</span>
                                <span className="objetivoAr-valorObjetivoAtingido">{formatarMoeda(totaisObjetivo.realizado)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="objetivoAr-seguirLink">
                    <Link to="/objetivo/my" className='link-objetivoAr'>
                        <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    )
}