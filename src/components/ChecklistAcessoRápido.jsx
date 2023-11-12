import './css/ChecklistAcessoRapido.css'

export default function ChecklistAcessoRapido() {
    return (
        <>
            <div className="checklist container-acessoRapido">
                <div className="checklist-titulo">
                    <h4>Checklist</h4>
                </div>
                <div className="checklist-content">
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="energia"/><label htmlFor="energia"><span>10/10 - </span>Conta de Energia</label></div><p>R$ 100,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="faculdade"/><label htmlFor="faculdade"><span>10/10 - </span>Faculdade</label></div><p>R$ 709,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="parcela-moto"/><label htmlFor="parcela-moto"><span>10/10 - </span>Parcela da Moto</label></div><p>R$ 1.115,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="seguro"/><label htmlFor="seguro"><span>10/10 - </span>Seguro da moto</label></div><p>R$ 130,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="internet-celular"/><label htmlFor="internet-celular"><span>10/10 - </span>Internet do Celular</label></div><p>R$ 35,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="plano-saude"/><label htmlFor="plano-saude"><span>10/10 - </span>Plano de Saúde</label></div><p>R$ 200,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="cumbuca"/><label htmlFor="cumbuca"><span>10/10 - </span>Cumbuca da TIC</label></div><p>R$ 30,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                    <div className="item-checklist"><div className="item"><input type="checkbox" id="iptv"/><label htmlFor="iptv"><span>10/10 - </span>IPTV</label></div><p>R$ 25,00</p></div>
                </div>
                <div className="checklist-totais">
                    <div className="total-gasto"><p>Total gasto: R$ </p><p>1.000,00</p></div>
                    <div className="valor-restante"><p>Valor restante: R$ </p><p>2.338,00</p></div>
                </div>
            </div>
        </>
    )
}