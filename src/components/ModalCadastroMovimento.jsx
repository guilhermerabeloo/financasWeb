import './css/ModalCadastroMovimento.css'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import ModalTags from './ModalTags';
import { BsTag, BsX } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

ModalMovimento.propTypes = {
    modalOn: PropTypes.bool,
    closeMovimento: PropTypes.func
}

export function ModalMovimento({ modalOn, closeMovimento }) {
    const [ selecaoTagAtiva, setSelecaoTagAtiva ] = useState(false)
    const [ mostraItensChecklist, setMostraItensChecklist ] = useState(false);
    const [ tagSelecionada, setTagSelecionada ] = useState(false);
    const [ mostraTag, setMostraTag ] = useState(false);
    const [ itensChecklist, setItensChecklist ] = useState([]);
    const [ tiposMovimento, setTiposMovimentos ] = useState([]);
    const [ infoTagSelecionada, setInfoTagSelecionada ] = useState({
        id: 0,
        tag: '',
        corfundo: '',
        corletra: ''
    });
    const [ novoMovimento, setNovoMovimento ] = useState({
        descricao: '',
        tipo: '0',
        tag: 0,
        data: '',
        valor: '',
        repetir: 1,
        isChecklist: '0',
        itemChecklist: null,
        competencia: ''
    });

    useEffect(() => {
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        async function getItensChecklist() {
            try {
                const response = await api.get(`/checklistUsuario/${emailCookie}`)
                const data = response.data.data;
                const dataDefault = [{id: null, item: 'Selecione', valor: null, dia_mes: 0, checked: 0}]
                dataDefault.push(...data)

                setItensChecklist(dataDefault)
            } catch(error) {
                console.log(error)
            }
        }
        getItensChecklist()

        async function getTiposMovimento() {
            try {
                const response = await api.get(`/buscaTipoMovimento`)
                const data = response.data.data;
                const dataDefault = [{id: 0, item: 'Selecione'}]
                dataDefault.push(...data)

                setTiposMovimentos(dataDefault)
            } catch(error) {
                console.log(error)
            }
        }
        getTiposMovimento()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChangeNovoMovimento = (event) => {
        const { name, value } = event.target;
        const movimento = {...novoMovimento};
        movimento[name] = value;
        console.log(name, value)
        setNovoMovimento(movimento);

        if(name == 'isChecklist'){
            value == 0 ? setMostraItensChecklist(false) : setMostraItensChecklist(true)
        } else if(name == 'tipo') {
            value == 1 ? setMostraTag(true) : setMostraTag(false)
        }
    }

    const cadastraNovoMovimento = async (event) => {
        event.preventDefault();
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        if(!novoMovimento.descricao || novoMovimento.tipo=="0" || !novoMovimento.data || !novoMovimento.valor || !novoMovimento.repetir) {
            toast.warn('Há campos ainda não preenchidos.', {
                autoClose: 2000,
            });
            return
        }
        if(novoMovimento.isChecklist == '1') {
            if(novoMovimento.itemChecklist == 'Selecione') {
                toast.warn('Há campos ainda não preenchidos.', {
                    autoClose: 2000,
                });
                return
            }
        }

        let dados = [];
        for(let i = 0; i<novoMovimento.repetir; i++) {
            const data = novoMovimento.data;
            const ano = Number(data.slice(0, 4));
            const mes = Number(data.slice(5, 7));
            const dia = Number(data.slice(8, 10));
            const parcela = new Date(ano, mes-1, dia);
            parcela.setMonth(parcela.getMonth() + i)

            const anoFormat = parcela.getFullYear();
            const mesFormat = parcela.getMonth() + 1 < 10 ? `0${parcela.getMonth() + 1}` : parcela.getMonth() + 1
            const diaFormat = parcela.getDate() < 10 ? `0${parcela.getDate()}` : parcela.getDate()

            const parcelaFormat = `${anoFormat}-${mesFormat}-${diaFormat}`

            const dateObj = new Date(parcelaFormat);
            const mesAtual = (dateObj.toLocaleString('pt-BR', { month: 'long' }))
            const competencia = `${mesAtual.toUpperCase().substring(0,3)} ${dateObj.getFullYear()}`
            dados.push({
                descricao: novoMovimento.descricao,
                data: parcelaFormat,
                valor: novoMovimento.valor,
                tipomovimento_id: novoMovimento.tipo,
                tag: novoMovimento.tipo == 1 ? novoMovimento.tag : null,
                checklistmensal_id: novoMovimento.itemChecklist == 'Selecione' ? null : novoMovimento.itemChecklist,
                competencia: competencia
            })
        }

        try {
            await api.post(
                `/criaMovimento`,
                {
                    email: emailCookie,
                    dados: dados
                }
            )

            closeMovimento(false);
            setMostraTag(false);
            setMostraItensChecklist(false);
            setTagSelecionada(false);
            setNovoMovimento({
                descricao: '',
                tipo: '0',
                tag: 0,
                data: '',
                valor: '',
                repetir: 1,
                isChecklist: '0',
                itemChecklist: 'Selecione',
                'competencia': ''
            });

            window.location.reload();
        } catch(err) {
            console.log(err)
            toast.error('Erro ao cadastrar o movimento.', {
                autoClose: 2000,
            });
        }
    }

    return (
        <>
            <div className="container-modalMovimento">
                <div className={`modal-movimento-fade  ${modalOn ? '' : 'hide'}`} onClick={closeMovimento}></div>
                <div className={`modal-movimento ${modalOn ? '' : 'hide'}`}>
                    <div className="mdMovimento-header">
                        <h3 className="mdMovimento-titulo">Cadastrar movimento</h3>
                        <BsX className='icon-fechar' onClick={() => closeMovimento(false)}/>
                    </div>
                    <div className="mdMovimento-content">
                        <div className="mdMovimento-areaInput">
                            <div className="mdMovimento-areaInputDescricao">
                                <label htmlFor="mdMovimento-descricao">Descrição</label>
                                <input type="text" id="mdMovimento-descricao" name="descricao" placeholder="Ex: Salário, Viagem de réveillon etc." value={novoMovimento.descricao} onChange={(event) => handleChangeNovoMovimento(event)}/>
                            </div>
                            <div className="mdMovimento-areaInputTipo">
                                <label htmlFor="mdMovimento-tipo">Tipo</label>
                                <select name="tipo" id="mdMovimento-tipo" value={novoMovimento.tipo} onChange={(event) => handleChangeNovoMovimento(event)}>
                                    {tiposMovimento.map(tipo => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mdMovimento-areaInput">
                            <div className="mdMovimento-areaInputData">
                                <label htmlFor="mdMovimento-data">Data</label>
                                <input type="date" id="mdMovimento-data" name="data" value={novoMovimento.data} onChange={(event) => handleChangeNovoMovimento(event)}/>
                            </div>
                            <div className="mdMovimento-areaInputValor">
                                <label htmlFor="mdMovimento-valor">Valor</label>
                                <input type="numeric" id="mdMovimento-valor" name="valor" placeholder="R$ 0,00" value={novoMovimento.valor} onChange={(event) => handleChangeNovoMovimento(event)}/>
                            </div>
                            <div className="mdMovimento-areaInputRepetir">
                                <label htmlFor="mdMovimento-repetir">Repetir por:</label>
                                <input type="text" id="mdMovimento-repetir" placeholder="1x" name="repetir" value={novoMovimento.repetir} onChange={(event) => handleChangeNovoMovimento(event)}/>
                            </div>
                        </div>
                        <div className="mdMovimento-areaInputRadio">
                            <div className="mdMovimento-areaInputIsChecklist">
                                <label htmlFor="mdMovimento-isChecklist">Compõe checklist</label>   
                                <div className="mdMovimento-areaRadio">
                                    <div className="mdMovimento-areaRadioNao">
                                        <input type="radio" id="mdMovimento-isChecklistNao" name="isChecklist" checked={novoMovimento.isChecklist == 0} value="0" onChange={(event) => handleChangeNovoMovimento(event)}/>
                                        <label htmlFor="mdMovimento-isChecklistNao">Não</label>
                                    </div>
                                    <div className="mdMovimento-areaRadioSim">
                                        <input type="radio" id="mdMovimento-isChecklistSim" name="isChecklist" checked={novoMovimento.isChecklist == 1} value="1" onChange={(event) => handleChangeNovoMovimento(event)}/>
                                        <label htmlFor="mdMovimento-isChecklistSim">Sim</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mdMovimento-areaInputItemChecklist" >
                                <label htmlFor="mdMovimento-itemChecklist" className={`${mostraItensChecklist ? '' : 'ocultaItemChecklist'}`}>Item checklist</label>
                                <select name="itemChecklist" className={`${mostraItensChecklist ? '' : 'ocultaItemChecklist'}`} id="mdMovimento-itemChecklist" value={novoMovimento.itemChecklist} onChange={(event) => handleChangeNovoMovimento(event)}>
                                    {itensChecklist.map(item => (
                                        <option key={item.id} value={item.id}>{item.item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={`mdMovimento-tag ${!mostraTag && 'hide'}`}>
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
                                    selecaoTagOn={selecaoTagAtiva}
                                    tagSelecionada={tagSelecionada}
                                    infoMovimento={novoMovimento}
                                    informaTagMovimento={setNovoMovimento}
                                    informaTagSelecionada={setInfoTagSelecionada}
                                    closeSelecao={() => setSelecaoTagAtiva(!selecaoTagAtiva)}
                                    selecionaTag={() => setTagSelecionada(!tagSelecionada)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mdMovimento-actions">
                        <button id="mdMovimento-btnCancelar" onClick={() => closeMovimento(false)}>Cancelar</button>
                        <button id="mdMovimento-btnAdicionar" onClick={(event) => cadastraNovoMovimento(event)}>Adicionar</button>
                    </div>
                </div>
            </div>
        </>
    )
}