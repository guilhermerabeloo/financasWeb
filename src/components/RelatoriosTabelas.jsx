import { useState } from 'react';
import { formatarMoeda } from '../assets/util';
import './css/relatoriosTabelas.css';

export default function RelatoriosTabelas() {
    const [ linhas, setLinhas ] = useState([
        {
            rotulo: 'Salário', 
            tipo: 'C',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024', 'ABR 2024', 'MAI 2024', 'JUN 2024', 'JUL 2024', 'AGO 2024', 'SET 2024', 'OUT 2024', 'NOV 2024', 'DEZ 2024', 'JAN 2025', 'FEV 2025', 'MAR 2025', 'ABR 2025', 'MAI 2025', 'JUN 2025', 'JUL 2025', 'AGO 2025', 'SET 2025', 'OUT 2025', 'NOV 2025', 'DEZ 2025'],
            valores: [6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300]
        },
        {
            rotulo: 'Faculdade', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024', 'ABR 2024', 'MAI 2024', 'JUN 2024', 'JUL 2024', 'AGO 2024', 'SET 2024', 'OUT 2024', 'NOV 2024', 'DEZ 2024', 'JAN 2025', 'FEV 2025', 'MAR 2025', 'ABR 2025', 'MAI 2025', 'JUN 2025', 'JUL 2025', 'AGO 2025', 'SET 2025', 'OUT 2025', 'NOV 2025', 'DEZ 2025'],
            valores: [-709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460]
        },
        {
            rotulo: 'Parcela da moto', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024', 'ABR 2024', 'MAI 2024', 'JUN 2024', 'JUL 2024', 'AGO 2024', 'SET 2024', 'OUT 2024', 'NOV 2024', 'DEZ 2024', 'JAN 2025', 'FEV 2025', 'MAR 2025', 'ABR 2025', 'MAI 2025', 'JUN 2025', 'JUL 2025', 'AGO 2025', 'SET 2025', 'OUT 2025', 'NOV 2025', 'DEZ 2025'],
            valores: [-1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115, -1115]
        },
        {
            rotulo: 'Salário', 
            tipo: 'C',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024', 'ABR 2024', 'MAI 2024', 'JUN 2024', 'JUL 2024', 'AGO 2024', 'SET 2024', 'OUT 2024', 'NOV 2024', 'DEZ 2024', 'JAN 2025', 'FEV 2025', 'MAR 2025', 'ABR 2025', 'MAI 2025', 'JUN 2025', 'JUL 2025', 'AGO 2025', 'SET 2025', 'OUT 2025', 'NOV 2025', 'DEZ 2025'],
            valores: [6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300, 6300]
        },
        {
            rotulo: 'Faculdade', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024', 'ABR 2024', 'MAI 2024', 'JUN 2024', 'JUL 2024', 'AGO 2024', 'SET 2024', 'OUT 2024', 'NOV 2024', 'DEZ 2024', 'JAN 2025', 'FEV 2025', 'MAR 2025', 'ABR 2025', 'MAI 2025', 'JUN 2025', 'JUL 2025', 'AGO 2025', 'SET 2025', 'OUT 2025', 'NOV 2025', 'DEZ 2025'],
            valores: [-709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460, -709, -460, -460]
        },
        {
            rotulo: 'Parcela da moto', 
            tipo: 'D',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
            valores: [-1115, -1115, -1115]
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
        },
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
        },
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
        },
        {
            rotulo: 'Salário', 
            tipo: 'C',
            competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
            valores: [6300, 6300, 6300]
        }
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Salário', 
        //     tipo: 'C',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [6300, 6300, 6300]
        // },
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Salário', 
        //     tipo: 'C',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [6300, 6300, 6300]
        // },
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Salário', 
        //     tipo: 'C',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [6300, 6300, 6300]
        // },
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // },
        // {
        //     rotulo: 'Salário', 
        //     tipo: 'C',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [6300, 6300, 6300]
        // },
        // {
        //     rotulo: 'Faculdade', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-709, -460, -460]
        // },
        // {
        //     rotulo: 'Parcela da moto', 
        //     tipo: 'D',
        //     competencias: ['JAN 2024', 'FEV 2024', 'MAR 2024'],
        //     valores: [-1115, -1115, -1115]
        // }
    ]);

    const [ totais, setTotais ] = useState([4509, 4802, 4802, 509, 4802, 4802, 509, 4802, 4802, 509, 4802, 4802, 4509, 4802, 4802, 509, 4802, 4802, 509, 4802, 4802, 509, 4802, 4802]);

    return (
        <>
            <div className="content-relatoriosTabelas">
                <table id="tabelaRelatorio">
                    <thead className='area-cabecalho'>
                        <tr>
                            <th className='coluna1' style={{'borderRadius': '20px 0 0 0'}}></th>
                            <th className='coluna2' colSpan={totais.length}>Competências</th>
                        </tr>
                        <tr>
                            <th className='coluna1'><span>Rótulo</span></th>
                            {linhas[0].competencias.map((comp, c) => {
                                return (
                                    <th key={c} className='coluna2'><span>{comp}</span></th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className='area-conteudo'>
                        {linhas.map((linha, l) => {
                            return (
                                <tr key={l} id={l}>
                                    <td className='rotulo'>{linha.rotulo}</td>
                                    {linha.valores.map((valor, v) => {
                                        return (
                                            <td key={v} className={`dado ${valor > 0 ? 'credito': 'debito'}`}>
                                                {formatarMoeda(valor)}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot className='area-totais'>
                        <tr className='linha-total'>
                            <td className='rotulo'>Líquido</td>
                            {totais.map((total, t) => {
                                return (
                                    <td key={t} className='dado'>{formatarMoeda(total)}</td>
                                )
                            })}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

