import './css/GraficoComposicaoDespesas.css'
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

GraficoComposicaoDespesas.propTypes = {
    label: PropTypes.array,
    valores: PropTypes.array
}

export default function GraficoComposicaoDespesas({ label, valores }) {
    console.log(label, valores)
    const chartDataBarra = {
        series: [
          {
            name: 'Valor',
            data: valores,
          }
        ],
        options: {
            chart: {
                type: 'bar',
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
                categories: label,
                labels: {
                    show: false, 
                },
            },
        },
    };

    return (
        <>
            <div className="container-graficoComposicaoDespesas">
                <h4>Composição das despesas</h4>
                <div className="area-graficoBarras">
                    <Chart 
                        options={chartDataBarra.options}
                        series={chartDataBarra.series}
                        type='bar'
                        height="100%"
                    />
                </div>
            </div>
        </>
    )
}