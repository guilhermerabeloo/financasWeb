import './css/relatoriosGraficos.css';
import { useEffect, useState } from 'react';
import GraficoComposicaoDespesas from './GraficoComposicaoDespesas';
import GraficoEvolucaoReceitaDespesa from './GraficoEvolucaoReceitaDespesa';
import GraficoObjetivo from './GraficoObjetivo';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';
import Cookies from 'js-cookie';
import { BsCashCoin , BsCreditCard2Back } from 'react-icons/bs';
import { formatarMoeda } from '../assets/util';
import { api } from '../lib/api';


// CONFERIR GRAFICO DE EVOLUCAO E OBJETIVO



export default function RelatoriosGraficos() {
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
    const [filtrosData, setFiltrosData] = useState({
        dataInicio: new Date().toISOString().slice(0, 10),
        dataFinal: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10) 
    });
    const email = decodeURIComponent(Cookies.get('userEmail'));

    useEffect(() => {
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
    }, [email, filtrosData])

    function handleChangeFiltroData(event) {
        const inputAlterado = event.target.name;
        const valorAlterado = event.target.value;
        const novoFiltro = {...filtrosData};

        novoFiltro[inputAlterado] = valorAlterado;
        setFiltrosData(novoFiltro)
    } 

    return (
        <>
            <div className="area-filtrosRelGrafico">
                <div className="area-filtrosDataGrafico">
                    <input id="inp-dataInicioGrafico" type="Date" name="dataInicio" value={filtrosData.dataInicio} onChange={(event) => handleChangeFiltroData(event)}/>
                    <p> a </p>
                    <input id="inp-dataInicioGrafico" type="Date" name="dataFinal" value={filtrosData.dataFinal} onChange={(event) => handleChangeFiltroData(event)}/>
                </div>
            </div>
            <div className="content-relatoriosGraficos">
                <div className="area-relatorios1">
                    <div className="area-cartoes">
                        <div className="area-cartaoReceita">
                            <div className="area-iconCartao">
                                <div className="iconReceita">
                                    <BsCashCoin  />
                                </div>
                            </div>
                            <div className="area-indicadorCartao">
                                <h4>Receitas</h4>
                                <span>{formatarMoeda(dadosRelatorios.totaisreceitas)}</span>
                            </div>
                        </div>
                        <div className="area-cartaoDespesa">
                            <div className="area-iconCartao">
                                <div className="iconDespesa">
                                    <BsCreditCard2Back />
                                </div>
                            </div>
                            <div className="area-indicadorCartao">
                                <h4>Despesas</h4>
                                <span>{formatarMoeda(dadosRelatorios.totaisdespesas)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="area-graficoEvolucao">
                        <GraficoEvolucaoReceitaDespesa 
                            competencias={dadosRelatorios.competencias}
                            receitas={dadosRelatorios.receitas}
                            despesas={dadosRelatorios.despesas}
                        />
                    </div>
                </div>
                <div className="area-relatorios2">
                    <div className="area-graficoComposicaoDespesa">
                        <GraficoComposicaoDespesas 
                            label={dadosRelatorios.labeltags}
                            valores={dadosRelatorios.valortags}
                        />
                    </div>
                    <div className="area-graficoReceitaDespesa">
                        <GraficoReceitasDespesas 
                            despesa={dadosRelatorios.totaisdespesas}
                            receita={dadosRelatorios.totaisreceitas}
                        />
                    </div>
                    <div className="area-graficoObjetivo">
                        <GraficoObjetivo 
                            atingido={dadosRelatorios.objetivo}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}