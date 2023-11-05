import './css/Home.css'

export default function Home() {
    return (
        <>
            <div className="content container-home">
                <div className="area-resumoMes">
                    <div className="area-saldo">
                        <div className="area-saldoMeta">
                            <div className="saldo">
                                <h5>Saldo do mês</h5>
                                <p>R$ 409,00</p>
                            </div>
                            <div className="meta">
                                <h5>Distância até a meta</h5>
                                <p>13,00%</p>
                            </div>
                        </div>
                        <div className="area-receitaDespesa">
                            <div className="receita">
                                <h5>Receitas no mês</h5>
                                <p>R$ 5.000,00</p>
                            </div>
                            <div className="despesa">
                                <h5>Despesas no mês</h5>
                                <p>R$ 3.409,00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="area-acessoRapido">
                    <div className="cabecalho-AcessoRapido">
                        <h3>Acesso Rápido</h3>
                    </div>
                    <div className="area-acessos">
                        <div className="container-lateral">
                            <div className="checklist container-acessoRapido">
                                <h4>Checklist</h4>
                                <div className="content">
                                    
                                </div>
                            </div>
                            <div className="movimentacoes container-acessoRapido">
                                <h4>Últimas movimentações</h4>
                                <div className="content">
                                    
                                </div>
                            </div>
                            <div className="objetivos container-acessoRapido">
                                <h4>Objetivo atual</h4>
                                <div className="content">
                                    
                                </div>
                            </div>
                            <div className="objetivos container-acessoRapido">
                                <h4>Objetivo atual</h4>
                                <div className="content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}