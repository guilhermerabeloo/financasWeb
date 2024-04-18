import './css/GraficoObjetivo.css'
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

GraficoObjetivo.propTypes = {
    atingido: PropTypes.number
}

export default function GraficoObjetivo({ atingido }) {
    const chartData = {
        series: [atingido],
        options: {
          chart: {
            type: 'radialBar',
            toolbar: {
              show: false
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
                  fontSize: '15px'
                },
                value: {
                  formatter: function(val) {
                    return parseInt(val) + '%';
                  },
                  color: '#111',
                  fontSize: '30px',
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
            <div className="container-graficoObjetivo">
                <h4>Objetivo</h4>
                <div className="area-graficoRadial">
                    {atingido == 0 ? (
                      <p>Não há objetivo cadastrado</p>
                    )
                    : 
                    <Chart 
                        options={chartData.options}
                        series={chartData.series}
                        type='radialBar'
                        height="100%"
                    />
                    }
                </div>
            </div>
        </>
    )
}