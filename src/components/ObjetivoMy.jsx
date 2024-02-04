import './css/ObjetivoMy.css'
import Chart from 'react-apexcharts';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { BsExclamationCircleFill, BsPatchCheckFill, BsDash } from "react-icons/bs";

export default function ObjetivoMy() {
    const [ infoObjetivo, setInfoObjetivo ] = useState({
        nome: '',
        datainicio: '', 
        datafinal: '',
        valorinicial: '',
        valorfinal:''
    });
    const [ etapasObjetivo, setEtapasObjetivo ] = useState([]);
    const [ totaisObjetivo, setTotaisObjetivos ] = useState({ planejado: 20000, realizado: 2390.60, atingido: 12 });

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

                setEtapasObjetivo(data.metasObjetivo)
                setInfoObjetivo(data.cabecalho[0])
            } catch(err) {  
                console.log(err)
            }
        }

        getObjetivo()
    }, [email])

    const chartData = {
        series: [totaisObjetivo.atingido],
        options: {
          chart: {
            height: 350,
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
                  top: 3,
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
                  fontSize: '17px'
                },
                value: {
                  formatter: function(val) {
                    return parseInt(val) + '%';
                  },
                  color: '#111',
                  fontSize: '36px',
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
            <div className="container-objetivoMy">
                <div className="area-tituloObjetivoMy">
                    <h3 className="titulo-objetivoMy">Objetivo</h3>
                </div>
                <div className="content-objetivoMy">
                    <div className="area-objetivoMy">
                        <div className="area-objetivoMyInfo">
                            <div className="area-cabecalhoObjetivoMy">
                                <input type="text" id='objetivoMy-inpnomeobjetivomy' name='nomeObjetivoMy' value={infoObjetivo.nome} disabled={true}/>
                                <div className="objetivoMy-areaCabecalho">
                                    <div className="objetivomy-areaInput">
                                        <label htmlFor="objetivoMy-inpdatainicio">Data inicial:</label>
                                        <input type="date" id='objetivoMy-inpdatainicio' name='dtInicioObjetivoMy' value={infoObjetivo.datainicio} disabled={true}/>
                                    </div>
                                    <div className="objetivomy-areaInput">
                                        <label htmlFor="objetivoMy-inpdatafinal">Data final:</label>
                                        <input type="date" id='objetivoMy-inpdatafinal' name='dtFinalObjetivoMy' value={infoObjetivo.datafinal} disabled={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="area-etapasObjetivoMy">
                                <div className="objetivoMy-areaCaminhoObjetivo">
                                    <div className="objetivoMy-caminho">
                                        <div className="objetivoMy-cabecalhoCaminho">
                                            <div className="objetivoMy-cabecalhoEtapaCaminho"></div>
                                            <p className="objetivoMy-cabecalhoMeta">Meta</p>
                                            <p className="objetivoMy-cabecalhoAcumulado">Realizado</p>
                                            <p className="objetivoMy-cabecalhoPerformance"></p>
                                        </div>
                                        {etapasObjetivo.map((etapa, i) => {
                                            return (
                                                <div className="objetivoMy-etapaCaminho" id={etapa.id} key={i}>
                                                    <p className="objetivoMy-competencia">{etapa.competencia}</p>
                                                    <div className="objetivoMy-elementsCaminho">
                                                        <div className="objetivoMy-left"></div>
                                                        <div className="objetivoMy-circule"></div>
                                                        <div className="objetivoMy-right"></div>
                                                    </div>
                                                    <p className="objetivoMy-meta">{etapa.meta}</p>
                                                    <p className="objetivoMy-realizado">{etapa.realizado}</p>
                                                    <p className={`objetivoMy-performance ${etapa.atingido == '1' ? 'atingido' : etapa.atingido == '0' ? 'naoAtingido' : ''}`}>{Number(etapa.percatingido).toFixed(2)}%</p>
                                                    <div className="objetivoMy-iconAtingido">
                                                        {etapa.atingido == '0' ? <BsExclamationCircleFill className='naoAtingido'/> : etapa.atingido == '1' ? <BsPatchCheckFill className='atingido'/> : <BsDash />}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>                      
                        <div className="area-conclusaoObjetivoMy">
                            <Chart 
                                options={chartData.options}
                                series={chartData.series}
                                type='radialBar'
                            />
                            <div className="objetivoMy-areaLabelGrafico">
                                <div className="objetivoMy-objetivoTotal">
                                    <span className="objetivoMy-labelObjetivoTotal">Objetivo:</span>
                                    <span className="objetivoMy-valorObjetivoTotal">{totaisObjetivo.planejado}</span>
                                </div>
                                <div className="objetivoMy-objetivoAtingido">
                                    <span className="objetivoMy-labelObjetivoAtingido">Atingido:</span>
                                    <span className="objetivoMy-valorObjetivoAtingido">{totaisObjetivo.realizado}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}