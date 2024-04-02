import './css/relatorios.css';
import { useState } from 'react';
import { BiTable, BiSolidBarChartAlt2 } from "react-icons/bi";
import RelatoriosGraficos from './RelatoriosGraficos';
import RelatoriosTabelas from './RelatoriosTabelas';

export default function Relatorios() {
    const [ visualizacaoPrincipal, setVisualizacaoPrincipal ] = useState(false);

    return (
        <>
            <div className="container-relatorios">
                <div className="area-tituloRelatorios">
                    <h3 className="titulo-relatorios">Relatórios</h3>
                    <div className="area-tipoVisualizacao">
                        <button id="viewGrafico" className={visualizacaoPrincipal ? 'active' : ''} onClick={() => setVisualizacaoPrincipal(true)}><BiSolidBarChartAlt2  /></button>
                        <button id="viewTabela" className={!visualizacaoPrincipal ? 'active' : ''} onClick={() => setVisualizacaoPrincipal(false)}><BiTable /></button>
                    </div>
                </div>
                <div className="content-relatorios">
                    {visualizacaoPrincipal ? <RelatoriosGraficos /> : <RelatoriosTabelas />}
                </div>
            </div>
        </>
    )
}