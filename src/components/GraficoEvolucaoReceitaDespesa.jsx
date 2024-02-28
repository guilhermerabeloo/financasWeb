import './css/GraficoEvolucaoReceitaDespesa.css'
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

GraficoEvolucaoReceitaDespesa.propTypes = {
    receitas: PropTypes.array,
    despesas: PropTypes.array
}

export default function GraficoEvolucaoReceitaDespesa({ receitas, despesas }) {
    const chartData = {
        options: {
            chart: {
                type: 'line',
                toolbar: {
                  show: false
                }
            },
            xaxis: {
                categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']
            },
            colors: ['#34508C','#C33131'],
        },
        series: [
            {
                name: 'Receitas',
                data: receitas
            },
            {
                name: 'Despesas',
                data: despesas
            }
        ]
    };
    return (
        <>
            <div className="container-graficoEvolucaoReceitasDespesas">
                <h4>Evolução da receita e despesa</h4>
                <div className="area-graficoLinha">
                    <Chart 
                        options={chartData.options}
                        series={chartData.series}
                        type='line'
                        height="100%"
                    />
                </div>
            </div>
        </>
    )
}