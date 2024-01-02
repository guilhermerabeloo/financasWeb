import PropTypes from 'prop-types';
import './css/ModalCadastroMovimento.css'
import { BsTag, BsX } from 'react-icons/bs';

ModalMovimento.prototype = {
    modalOn: PropTypes.bool,
    closeMovimento: PropTypes.func
}

export function ModalMovimento({ modalOn, closeMovimento }) {
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
                                <input type="text" id="mdMovimento-descricao" name="descricao" placeholder="Ex: Salário jan/2024, Viagem de réveillon"/>
                            </div>
                            <div className="mdMovimento-areaInputTipo">
                                <label htmlFor="mdMovimento-tipo">Tipo</label>
                                <select name="tipo" id="mdMovimento-tipo">
                                    <option value="selecione">Selecione</option>
                                </select>
                            </div>
                        </div>
                        <div className="mdMovimento-areaInput">
                            <div className="mdMovimento-areaInputData">
                                <label htmlFor="mdMovimento-data">Data</label>
                                <input type="date" id="mdMovimento-data" name="data"/>
                            </div>
                            <div className="mdMovimento-areaInputValor">
                                <label htmlFor="mdMovimento-valor">Valor</label>
                                <input type="numeric" id="mdMovimento-valor"/>
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
                        <button id="mdMovimento-btnAdicionar">Adicionar</button>
                    </div>
                </div>
            </div>
        </>
    )
}