import { BsPencilSquare, BsBackspace } from "react-icons/bs";
import './css/Checklist.css'

export default function Checklist() {
    return (
        <>
            <div className="container-checklist">
                <div className="area-tituloChecklist">
                    <h3 className="titulo-checklist">Checklist de gastos mensais</h3>
                </div>
                <div className="content-checklist">
                    <div className="area-checklist">
                        <div className="checklist">
                            <table className="itens-checklist">
                                <thead>
                                    <th style={{width: "10%"}}></th>
                                    <th style={{width: "40%", textAlign: "start"}}>Item</th>
                                    <th style={{width: "20%"}}>Valor</th>
                                    <th style={{width: "20%"}}>Dia do mês</th>
                                    <th style={{width: "10%"}}></th>
                                </thead>
                                <tbody>
                                    <td><input type="checkbox" id="energia"/></td>
                                    <td>IPTV</td>
                                    <td style={{textAlign: "center"}}>R$ 35,00</td>
                                    <td style={{textAlign: "center"}}>07</td>
                                    <td style={{textAlign: "center"}}><BsPencilSquare /><BsBackspace /></td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="area-checklistInfo">
                        <div className="area-totalizadoresChecklist">
                            <div className="area-totalGastoChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    1
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    2
                                </div>
                            </div>
                            <div className="area-valorPendenteChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    3
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    4   
                                </div>
                            </div>
                        </div>
                        <div className="area-novoItemChecklist">
                            <div className="area-addItemChecklist">
                                <h4>Adicionar novo item</h4>
                                <form action="submit" className="form-addItem">
                                    <div className="area-nomeNovoItem">
                                        <label htmlFor="nomeNovoItem">Item</label>
                                        <input type="text" id="nomeNovoItem" placeholder="Ex: Conta de luz"/>
                                    </div>
                                    <div className="area-valorDia">
                                        <div className="area-valor">
                                            <label htmlFor="valorNovoItem">Valor</label>
                                            <input type="number" id="valorNovoItem" placeholder="R$ 0,00"/>
                                        </div>
                                        <div className="area-dia">
                                            <label htmlFor="diaNovoItem">Dia</label>
                                            <input type="number" id="diaNovoItem" placeholder="Ex: 30"/>
                                        </div>
                                    </div>
                                    <button id="btn-addNovoItemChecklist">Adicionar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}