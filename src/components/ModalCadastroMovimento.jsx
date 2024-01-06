import PropTypes from 'prop-types';
import './css/ModalCadastroMovimento.css'
import { BsTag, BsX } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

ModalMovimento.propTypes = {
    modalOn: PropTypes.bool,
    closeMovimento: PropTypes.func
}

export function ModalMovimento({ modalOn, closeMovimento }) {
    const [ itensChecklist, setItensChecklist ] = useState([]);
    const [ tiposMovimento, setTiposMovimentos ] = useState([]);
    const [ novoMovimento, setNovoMovimento ] = useState({
        descricao: '',
        tipo: '',
        data: '',
        valor: '',
        repetir: 1,
        isChecklist: false,
        itemChecklist: null
    });

    useEffect(() => {
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        async function getItensChecklist() {
            try {
                const response = await api.get(`/checklistUsuario/${emailCookie}`)
                const data = response.data.data;
                const dataDefault = [{id: 0, item: 'Selecione', valor: 0, dia_mes: 0, checked: 0}]
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
        const { name, value } = event.target

        const movimento = {...novoMovimento};
        movimento[name] = value;

        setNovoMovimento(movimento)
    }
    // console.log(novoMovimento)

    const cadastraNovoMovimento = async (event) => {
        event.preventDefault();
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        console.log(novoMovimento)

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
                                        <input type="radio" id="mdMovimento-isChecklistNao" name="isChecklist" value="0" onChange={(event) => handleChangeNovoMovimento(event)}/>
                                        <label htmlFor="mdMovimento-isChecklistNao">Não</label>
                                    </div>
                                    <div className="mdMovimento-areaRadioSim">
                                        <input type="radio" id="mdMovimento-isChecklistSim" name="isChecklist" value="1" onChange={(event) => handleChangeNovoMovimento(event)}/>
                                        <label htmlFor="mdMovimento-isChecklistSim">Sim</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mdMovimento-areaInputItemChecklist">
                                <label htmlFor="mdMovimento-itemChecklist">Item checklist</label>
                                <select name="itemChecklist" id="mdMovimento-itemChecklist" value={novoMovimento.itemChecklist} onChange={(event) => handleChangeNovoMovimento(event)}>
                                    {itensChecklist.map(item => (
                                        <option key={item.id} value={item.id}>{item.item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mdMovimento-tag">
                            <div className="mdMovimento-areaTag">
                                <BsTag className='icon-tag'/>
                                <div id='tag'>Adicione uma tag</div>
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