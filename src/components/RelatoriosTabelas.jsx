import './css/relatoriosTabelas.css';
import { useEffect, useState } from 'react';
import { formatarMoeda } from '../assets/util';
import { api } from '../lib/api';
import Cookies from 'js-cookie';

export default function RelatoriosTabelas() {
    const [ linhas, setLinhas ] = useState([]);
    const [ totais, setTotais ] = useState([]);
    const [filtrosData, setFiltrosData] = useState({
        dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10),
        dataFinal: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10) 
    });
    const email = decodeURIComponent(Cookies.get('userEmail'));
    
    useEffect(() => {
        async function getDadosTabela() {
            try {
                const response = await api.post(`/lancamentosUsuario`,
                    {
                        email: email,
                        dtInicio: filtrosData.dataInicio,
                        dtFinal: filtrosData.dataFinal
                    }
                )
                const data = response.data.data;
                setLinhas(data);

                let somaTotais = [];
                for(let i = 0; i < data[0].competencias.length; i++) {
                    let liquido = 0;
                    data.forEach((d) => {
                        liquido += Number(d.valores[i])
                    })
                    somaTotais.push(liquido)
                }
                setTotais(somaTotais)
            } catch(err) {
                console.log('ERRO',err)
            }
        }    
        getDadosTabela()
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
            <div className="area-filtrosRelTabela">
                <div className="area-filtrosDataTabela">
                    <input id="inp-dataInicioTabela" type="Date" name="dataInicio" value={filtrosData.dataInicio} onChange={(event) => handleChangeFiltroData(event)}/>
                    <p> a </p>
                    <input id="inp-dataInicioTabela" type="Date" name="dataFinal" value={filtrosData.dataFinal} onChange={(event) => handleChangeFiltroData(event)}/>
                </div>
            </div>
            <div className="content-relatoriosTabelas">
                <table id="tabelaRelatorio">
                    <thead className='area-cabecalho'>
                        <tr>
                            <th className='coluna1' style={{'borderRadius': '20px 0 0 0'}}></th>
                            <th className='coluna2' colSpan={totais.length}>Competências</th>
                        </tr>
                        <tr>
                            <th className='coluna1'><span>Rótulo</span></th>
                            {linhas[0] && linhas[0].competencias.map((comp, c) => {
                                return (
                                    <th key={c} className='coluna2'><span>{comp}</span></th>
                                )       
                            })}
                        </tr>   
                    </thead>
                    <tbody className='area-conteudo'>
                        {linhas[0] && linhas.map((linha, l) => {
                            return (
                                <tr key={l} id={l}>
                                    <td className='rotulo'>{linha.rotulo}</td>
                                    {linha.valores.map((valor, v) => {
                                        return (
                                            <td key={v} className={`dado ${valor >= 0 ? 'credito': 'debito'}`}>
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

