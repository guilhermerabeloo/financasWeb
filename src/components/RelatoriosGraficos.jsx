import './css/relatoriosGraficos.css';
import GraficoComposicaoDespesas from './GraficoComposicaoDespesas';
import GraficoEvolucaoReceitaDespesa from './GraficoEvolucaoReceitaDespesa';
import GraficoObjetivo from './GraficoObjetivo';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';
import { BsCashCoin , BsCreditCard2Back } from 'react-icons/bs';

export default function RelatoriosGraficos() {
    return (
        <>
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
                                <span>R$ 6.300,00</span>
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
                                <span>R$ 4.130,00</span>
                            </div>
                        </div>
                    </div>
                    <div className="area-graficoEvolucao">
                        <GraficoEvolucaoReceitaDespesa 
                            receitas={[5500, 5500, 6300, 6300, 6300, 6300]}
                            despesas={[3409, 3190, 3897, 4000, 4060, 3980]}
                        />
                    </div>
                </div>
                <div className="area-relatorios2">
                    <div className="area-graficoComposicaoDespesa">
                        <GraficoComposicaoDespesas 
                            label={['Mensalidades', 'Lazer', 'Cartões', 'Farmácia']}
                            valores={[64, 55, 44, 43]}
                        />
                    </div>
                    <div className="area-graficoReceitaDespesa">
                        <GraficoReceitasDespesas 
                            despesa={6300}
                            receita={4309.29}
                        />
                    </div>
                    <div className="area-graficoObjetivo">
                        <GraficoObjetivo 
                            atingido={50}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}