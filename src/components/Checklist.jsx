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
                            2
                        </div>
                        <div className="area-addItemChecklist">
                            3
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}