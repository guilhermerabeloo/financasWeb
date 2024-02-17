import './css/GraficoReceitasDespesas.css'
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

GraficoReceitasDespesas.propTypes = {
    despesa: PropTypes.number,
    receita: PropTypes.number
}

export default function GraficoReceitasDespesas({despesa, receita}) {
    const chartData = {
        series: [despesa, receita],
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

    return (
        <>
            <div className="container-graficoReceitasDespesas">
                <h4>Receitas vs Despesas</h4>
                <Chart 
                    options={chartData.options}
                    series={chartData.series}
                    type='donut'
                />
            </div>
        </>
    )
}