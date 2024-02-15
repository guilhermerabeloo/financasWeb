import './css/Checklist.css'
import Cookies from 'js-cookie';
import ModalTags from './ModalTags';
import { BsBackspace, BsClipboard2Check, BsClockHistory, BsBookmarkCheckFill, BsTag } from "react-icons/bs";
import { useEffect, useState } from "react";
import { api } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import { formatarMoeda } from '../assets/util';

export default function Checklist() {
    const [ itensChecklist, setItensChecklist ] = useState([]);
    const [ selecaoTagAtiva, setSelecaoTagAtiva ] = useState(false);
    const [ tagSelecionada, setTagSelecionada ] = useState(false);
    const [ atualizaTabela, setAtualizaTabela ] = useState(false);
    const [ novoItemChecklist, setNovoItemChecklist ] = useState({email: '', item: '', tag: '', valor: '' , dia_mes: ''});
    const [ totais, setTotais ] = useState({gasto: '0,00', pendente: '0,00'})
    const [ infoTagSelecionada, setInfoTagSelecionada ] = useState({
        id: 0,
        tag: '',
        corfundo: '',
        corletra: ''
    });

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getItensChecklist() {
            try {
                const response = await api.get(`/checklistUsuario/${email}`)
                const data = response.data.data;

                setItensChecklist(data)
            } catch(error) {
                console.log(error)
            }
        }
        getItensChecklist()

        async function getTotaisChecklist() {
            try {
                const response = await api.get(`/totaisDoChecklist/${email}`)
                const data = response.data.data;

                const { valortotal, valorgasto } = data[0];
                const valorPendente = valortotal - valorgasto;

                const totaisAntigos = { ...totais };
                totaisAntigos['gasto'] = Number(valorgasto).toFixed(2);
                totaisAntigos['pendente'] = Number(valorPendente).toFixed(2);

                setTotais(totaisAntigos)
            } catch(error) {
                console.log(error)
            }
        }
        getTotaisChecklist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, atualizaTabela])

    const handleChangeNovoItem = (event) => {
        const { name, value } = event.target
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        const item = {...novoItemChecklist};

        item['email'] = emailCookie;
        item[name] = value;

        setNovoItemChecklist(item)
    }

    const cadastraNovoItem = async (event) => {
        event.preventDefault();

        if(!novoItemChecklist.email || !novoItemChecklist.item || !novoItemChecklist.valor || !novoItemChecklist.dia_mes) {
            toast.warn('Há campos ainda não preenchidos.', {
                autoClose: 3000,
            });
            return
        }

        try {
            await api.post(
                    '/criaItemChecklist',
                    {
                        email: novoItemChecklist.email,
                        item: novoItemChecklist.item,
                        valor: novoItemChecklist.valor,
                        dia_mes: novoItemChecklist.dia_mes,
                        tag: novoItemChecklist.tag
                    }
                )
            
            toast.success('Cadastrado realizado com sucesso!', {
                autoClose: 3000,
            });

            setNovoItemChecklist()
        } catch(err) {
            console.log(err)
            toast.error('Erro ao cadastrar o item.', {
                autoClose: 3000,
            });
        }

        const antigoItem = {...novoItemChecklist};

        antigoItem['item'] = '';
        antigoItem['valor'] = '';
        antigoItem['dia_mes'] = '';
        antigoItem['tag'] = '';

        setNovoItemChecklist(antigoItem)
        setAtualizaTabela(!atualizaTabela)
        setTagSelecionada(false)
    }

    const marcaItemChecklist = async (event) => {
        const itemMarcado = itensChecklist.find(objeto => objeto.id == event.target.id);
        const { id, dia_mes, checked } = itemMarcado;

        const date = new Date();
        const ano = date.getFullYear();
        const mes = date.getMonth() + 1;
        const dataItemChecklist = `${ano}${mes < 10 ? '0'+mes : mes}${dia_mes < 10 ? '0'+dia_mes : dia_mes}`

        const emailCk = decodeURIComponent(Cookies.get('userEmail'));

        if(checked) {
            try {
                await api.post(
                    '/desmarcaItemChecklist',
                    {
                        checklistmensal_id: id,
                        email: emailCk
                    }
                )
                    
                toast.success('Checklist atualizado com sucesso!', {
                    autoClose: 1000,
                });
            } catch(err) {
                console.log(err)
                toast.error('Erro ao desmarcar o item.', {
                    autoClose: 3000,
                });
            }
        } else {
            try {
                await api.post(
                    '/marcaItemChecklist',
                    {
                        checklistmensal_id: id,
                        data: dataItemChecklist,
                        email: emailCk
                    }
                )
    
                toast.success('Checklist atualizado com sucesso!', {
                    autoClose: 1000,
                });
            } catch(err) {
                console.log(err)
                toast.error('Erro ao marcar o item.', {
                    autoClose: 3000,
                });
            }
        }

        setAtualizaTabela(!atualizaTabela)
    }

    const reiniciarChecklist = async () => {
        const emailCk = decodeURIComponent(Cookies.get('userEmail'));
        try {
            await api.post(
                '/renovaChecklist',
                {
                    email: emailCk
                }
            )
                
            toast.success('Checklist reiniciado com sucesso!', {
                autoClose: 1000,
            });
        } catch(err) {
            console.log(err)
            toast.error('Erro ao reiniciar o checklist.', {
                autoClose: 3000,
            });
        }

        setAtualizaTabela(!atualizaTabela)
    }

    return (
        <>
            <div className="container-checklist">
                <div className="area-tituloChecklist">
                    <h3 className="titulo-checklist">Checklist de gastos mensais</h3>
                </div>
                <div className="content-checklist">
                    <div className="area-checklist">
                        <div className="checklist">
                            <div className="area-tabelaChecklist">
                                <table className="itens-checklist">
                                    <thead>
                                        <tr>
                                            <th style={{width: "10%"}}></th>
                                            <th style={{width: "30%", textAlign: "start"}}>Item</th>
                                            <th style={{width: "10%", textAlign: "start"}}>TAG</th>
                                            <th style={{width: "15%"}}>Valor</th>
                                            <th style={{width: "15%"}}>Dia do mês</th>
                                            <th style={{width: "10%"}}></th>
                                        </tr>
                                    </thead>
                                    <tbody className="scrollable-tbody">
                                        {itensChecklist.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td><input type="checkbox" id={item.id} checked={item.checked} onChange={(event) => {marcaItemChecklist(event)}}/></td>
                                                    <td>{item.item}</td>
                                                    <td>
                                                        <div className="mdTags-tag">
                                                            <div className="mdTags-tag-item">
                                                                <span style={{backgroundColor: item.corfundo, color: item.corletra}}>{item.tag}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign: "center"}}>{formatarMoeda(item.valor)}</td>
                                                    <td style={{textAlign: "center"}}>{item.dia_mes}</td>
                                                    <td style={{textAlign: "center"}}><span className="icon-excluiItemChecklist"><BsBackspace /></span></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="area-reiniciarChecklist">
                                <button id="btn-reiniciarChecklist" onClick={() => reiniciarChecklist()}>
                                    Reiniciar checklist <span className="icon-reiniciarChecklist"><BsBookmarkCheckFill  /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="area-checklistInfo">
                        <div className="area-totalizadoresChecklist">
                            <div className="area-totalGastoChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    <BsClipboard2Check />
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    { formatarMoeda(totais.gasto) }
                                </div>
                            </div>
                            <div className="area-valorPendenteChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    <BsClockHistory />
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    { formatarMoeda(totais.pendente) }   
                                </div>
                            </div>
                        </div>
                        <div className="area-novoItemChecklist">
                            <div className="area-addItemChecklist">
                                <h4>Adicionar novo item</h4>
                                <form className="form-addItem">
                                    <div className="area-nomeTag">
                                        <div className="area-nome">
                                            <label htmlFor="nomeNovoItem">Item</label>
                                            <input onChange={handleChangeNovoItem} name="item" type="text" id="nomeNovoItem" placeholder="Ex: Conta de luz" value={novoItemChecklist.item}/>
                                        </div>
                                        <div className="mdMovimento-areaTag">
                                            <div className="mdMovimento-btnAdicionaTag" onClick={() => setSelecaoTagAtiva(!selecaoTagAtiva)}>
                                                <BsTag className='icon-tag'/>
                                                <div id='tag'>
                                                    {!tagSelecionada ? 'Adicione uma tag' : 
                                                        <div className="mdTags-tag">
                                                            <div className="mdTags-tag-item">
                                                                <span style={{backgroundColor: infoTagSelecionada.corfundo, color: infoTagSelecionada.corletra}}>{infoTagSelecionada.tag}</span>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <ModalTags 
                                                className="checklist"
                                                selecaoTagOn={selecaoTagAtiva}
                                                tagSelecionada={tagSelecionada}
                                                infoMovimento={novoItemChecklist}
                                                informaTagMovimento={setNovoItemChecklist}
                                                informaTagSelecionada={setInfoTagSelecionada}
                                                closeSelecao={() => setSelecaoTagAtiva(!selecaoTagAtiva)}
                                                selecionaTag={() => setTagSelecionada(!tagSelecionada)}
                                            />
                                        </div>
                                    </div>
                                    <div className="area-valorDia">
                                        <div className="area-valor">
                                            <label htmlFor="valorNovoItem">Valor</label>
                                            <input onChange={handleChangeNovoItem} name="valor" type="number" id="valorNovoItem" placeholder="R$ 0,00" value={novoItemChecklist.valor}/>
                                        </div>
                                        <div className="area-dia">
                                            <label htmlFor="diaNovoItem">Dia</label>
                                            <input onChange={handleChangeNovoItem} name="dia_mes" type="number" id="diaNovoItem" placeholder="Ex: 30" value={novoItemChecklist.dia_mes}/>
                                        </div>
                                    </div>
                                    <button id="btn-addNovoItemChecklist" onClick={(event) => cadastraNovoItem(event)}>Adicionar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer pauseOnHover={false}/>
            </div>
        </>
    )
}