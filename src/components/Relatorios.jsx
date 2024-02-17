import './css/relatorios.css';
import GraficoComposicaoDespesas from './GraficoComposicaoDespesas';
import GraficoReceitasDespesas from './GraficoReceitasDespesas';

import { BsCashCoin , BsCreditCard2Back } from 'react-icons/bs';

export default function Relatorios() {
    return (
        <>
            <div className="container-relatorios">
                <div className="area-tituloRelatorios">
                    <h3 className="titulo-relatorios">Relatórios</h3>
                </div>
                <div className="content-relatorios">
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

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}