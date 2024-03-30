import { useState } from 'react';
import { formatarMoeda } from '../assets/util';
import './css/relatoriosTabelas.css';

export default function RelatoriosTabelas() {
    const [ linhas, setLinhas ] = useState([
        {
            rotulo: 'Salário', 
            tipo: 'C',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
            valores: [6300, 6300, 6300]
        },
        {
            rotulo: 'Faculdade', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
            valores: [-709, -460, -460]
        },
        {
            rotulo: 'Parcela da moto', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
            valores: [-1115, -1115, -1115]
        }
    ]);

    const [ totais, setTotais ] = useState([4509, 4802, 4802]);

    return (
        <>
            <div className="content-relatoriosTabelas">
                <div className="area-cabecalho">
                    <div className="coluna1"></div>
                    <div className="coluna2">
                        Competências
                    </div>
                </div>
                <div className="area-content">
                    <div className="coluna1">
                        <div className="cabecalhoSecundario">
                            Nome
                        </div>
                        <div className="content">
                            {linhas.map((linha, i) => {
                                return (
                                    <div className="linhaTabela" key={i}>
                                        {linha.rotulo}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="liquido">
                            Líquido
                        </div>
                    </div>
                    <div className="coluna2">
                        {linhas.map((linha, i)=> {
                            return (
                                <div className="competenciaTabela" key={i}>
                                    <div className="cabecalhoSecundario">
                                        {linha.competencias[i]}
                                    </div>
                                    <div className="content">
                                        {linhas.map((valor, v) => {
                                            return (
                                                <div className="linhaTabela" key={v}>
                                                    {formatarMoeda(valor.valores[v])}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="liquido">
                                        {formatarMoeda(totais[i])}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

